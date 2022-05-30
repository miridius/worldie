import { createLocalStorageStore } from '$lib/storage';
import type { Game, Statistics } from '$lib/types';
import { challengeStartdate, toIsoDate } from '$lib/utils';

const addGame = (game: Game, stats: Statistics) => {
	if (game.gameOver) {
		stats = { ...stats };
		stats.played++;
		if (game.won) {
			stats.won++;
			stats.streak++;
			stats.maxStreak = Math.max(stats.streak, stats.maxStreak);
		} else {
			stats.streak = 0;
		}
		stats.distribution[game.guesses.length - 1]++;
	}
	return stats;
};

export const stats$ = createLocalStorageStore('stats', () => {
	let stats: Statistics = {
		played: 0,
		won: 0,
		streak: 0,
		maxStreak: 0,
		distribution: Array(6).fill(0),
	};
	if (globalThis.localStorage) {
		const date = new Date(challengeStartdate);
		const now = new Date();
		while (date < now) {
			const key = `worldie.${toIsoDate(date)}-game`;
			const game: Game | null = JSON.parse(localStorage.getItem(key) || 'null');
			if (game) stats = addGame(game, stats);
			console.log(stats);
			date.setDate(date.getDate() + 1);
		}
	}
	return stats;
});

export const addGameToStats = (game: Game) => stats$.update((stats) => addGame(game, stats));
