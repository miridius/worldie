<script lang="ts">
	import CountrySearch from '$lib/CountrySearch.svelte';
	import Guesses from '$lib/Guesses.svelte';
	import Map from '$lib/map/Map.svelte';
	import type { Country, Guess } from '$lib/types';
	import Header from '../lib/header/Header.svelte';

	export let countries: Country[];
	export let ctryCode: string;

	const MAX_GUESSES = 6;

	let guess: Country | undefined;
	let guesses: (Guess | undefined)[] = Array(MAX_GUESSES).fill(undefined);
	let current = 0;
	let selected = 0;
	let won = false;
	$: gameOver = won || current >= MAX_GUESSES;

	$: if (guess) {
		const correct = guess.code === ctryCode;
		if (correct) won = true;
		guesses[current++] = { ...guess, correct, close: false };
	}
</script>

<svelte:head>
	<title>Worldie</title>
</svelte:head>

<main class="bg-blue-200 inset-0 fixed flex flex-col items-center">
	<Header />

	<Map {ctryCode} bind:guess {current} bind:selected {won} {gameOver} />

	<CountrySearch {countries} bind:guess disabled={gameOver} />

	<Guesses {guesses} {current} bind:selected />
</main>
