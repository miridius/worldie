<script lang="ts">
	import Map from '$lib/map/Map.svelte';
	import CountrySearch from '$lib/CountrySearch.svelte';
	import type { Country, Guess } from '$lib/types';
	import Guesses from '$lib/Guesses.svelte';

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

<Map {ctryCode} bind:guess />

<CountrySearch {countries} bind:guess />

<Guesses {guesses} {current} {selected} />
