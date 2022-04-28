<script lang="ts">
	import CountrySearch from '$lib/CountrySearch.svelte';
	import Guesses from '$lib/Guesses.svelte';
	import Map from '$lib/map/Map.svelte';
	import type { Country, Guess } from '$lib/types';
	import Header from '../lib/header/Header.svelte';

	export let countries: Country[];
	export let ctryCode: string;

	let guess: Country | undefined;
	let guesses: (Guess | undefined)[] = Array(6).fill(undefined);
	let current = 0;
	$: selected = current;

	$: if (guess) {
		guesses[current++] = { ...guess, correct: guess.code === ctryCode, close: false };
	}
</script>

<svelte:head>
	<title>Worldie</title>
</svelte:head>

<main class="bg-blue-200 inset-0 fixed flex flex-col items-center">
	<Header />

	<Map {ctryCode} bind:guess />

	<CountrySearch {countries} bind:guess />

	<Guesses {guesses} {current} {selected} />
</main>
