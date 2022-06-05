<script lang="ts">
	import DownIcon from '$lib/components/icons/DownIcon.svelte';
	import UpIcon from '$lib/components/icons/UpIcon.svelte';
	import { MAX_GUESSES, type Game$ } from '$lib/game';
	import type { Guess } from '$lib/types';
	import { fly } from 'svelte/transition';
	import Drawer from './Drawer.svelte';

	export let game$: Game$;

	$: lost = $game$.gameOver && !$game$.won;

	$: guessSlots = [
		...$game$.guesses,
		...Array(MAX_GUESSES + (lost ? 1 : 0) - $game$.guesses.length).fill(undefined),
	];

	const getButtonBg = (guess: Guess | undefined) => {
		if (!guess) return 'bg-white';
		if (guess.correct) return 'bg-green-500';
		if (guess.close) return 'bg-yellow-500';
		return 'bg-red-600';
	};

	let open = false; // @hmr:keep
</script>

<section class="w-full max-w-xs flex justify-center gap-3">
	{#each guessSlots as guess, i}
		{#if i < MAX_GUESSES}
			<button
				class={`h-8 w-8 rounded-lg border-gray-800 ${getButtonBg(guess)} shadow-lg`}
				class:bg-blue-600={!guess && i === $game$.current}
				class:animate-pulse={i === $game$.selected}
				on:click={() => game$.select(i)}
				disabled={!guess && i !== $game$.current}
			/>
		{/if}
	{/each}
</section>

<button class="h-10 w-10 shrink-0 text-gray-700 dark:text-gray-300" on:click={() => (open = true)}>
	<UpIcon />
</button>

<Drawer bind:open {game$} {guessSlots} {getButtonBg} />
