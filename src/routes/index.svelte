<script lang="ts">
	import CountrySearch from '$lib/components/CountrySearch.svelte';
	import Guesses from '$lib/components/Guesses.svelte';
	import Map from '$lib/components/map/Map.svelte';
	import type { Country, Guess } from '$lib/types';
	import Header from '../lib/components/Header.svelte';

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
		guesses[current] = { ...guess, correct, close: false };
		if (correct) {
			won = true;
		} else {
			current++;
			// remove already guessed countries from the search list
			countries = countries.filter((c) => c.code !== guess?.code);
		}
	}
</script>

<svelte:head>
	<title>Worldie</title>
</svelte:head>

<main class="bg-white inset-0 fixed flex flex-col items-center">
	<Header />

	<Map {ctryCode} bind:guess {current} bind:selected {won} {gameOver} />

	<footer class="fixed bottom-0 w-full flex justify-center items-center portrait:flex-col z-[999]">
		<CountrySearch {countries} bind:guess {gameOver} {won} />
		<Guesses {guesses} {current} bind:selected />
	</footer>
</main>
