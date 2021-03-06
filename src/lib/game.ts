import {
	get,
	type Readable,
	type Subscriber,
	type Unsubscriber,
	type Writable,
} from 'svelte/store';
import { settings$ } from './components/settings/store';
import { addGameToStats } from './components/stats/store';
import { createLocalStorageStore } from './storage';
import type { Challenge, Country, Game } from './types';

export const MAX_GUESSES = 6;

export class Game$ implements Readable<Game> {
	private store$: Writable<Game>;
	private timeout?: NodeJS.Timeout;

	constructor(isoDate: string, countryList: Country[], challenge: Challenge) {
		const { borders, ...answer } = challenge;
		this.store$ = createLocalStorageStore<Game>(`${isoDate}-game`, () => ({
			isoDate,
			countryList,
			answer,
			borders,
			guesses: [],
			current: 0,
			selected: 0,
			won: false,
			gameOver: false,
		}));
		this.goToLatest();
	}

	subscribe(run: Subscriber<Game>, invalidate?: (value?: Game) => void): Unsubscriber {
		return this.store$.subscribe(run, invalidate);
	}

	makeGuess(country?: Country) {
		if (!country) return;
		this.store$.update((game) => {
			const correct = country.code === game.answer.code;
			const close = game.borders.includes(country.code);
			const guesses = [...game.guesses, { ...country, correct, close }];
			game = {
				...game,
				guesses,
				selected: guesses.length - 1,
				won: correct,
				gameOver: correct || guesses.length >= MAX_GUESSES,
				countryList: game.countryList.filter((c) => c.code !== country?.code),
			};
			if (game.gameOver) addGameToStats(game);
			return game;
		});
		this.waitForFlight();
	}

	select(index: number) {
		if (this.timeout) clearTimeout(this.timeout);
		this.store$.update((game) => ({ ...game, selected: index }));
	}

	private waitForFlight() {
		const { flyTimeMs, pauseTimeMs } = get(settings$);
		if (this.timeout) clearTimeout(this.timeout);
		this.timeout = setTimeout(() => this.goToLatest(), flyTimeMs + pauseTimeMs);
	}

	private goToLatest() {
		this.store$.update((game) => ({
			...game,
			selected: game.guesses.length + (game.won ? -1 : 0),
			current: game.guesses.length + (game.won ? -1 : 0),
		}));
	}
}
