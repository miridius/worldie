<script lang="ts">
	import CountrySearch from '$lib/components/CountrySearch.svelte';
	import Guesses from '$lib/components/Guesses.svelte';
	import Map from '$lib/components/map/Map.svelte';
	import { settings$ } from '$lib/components/settings/store';
	import type { Country, Guess } from '$lib/types';
	import { get } from 'svelte/store';
	import Header from '../lib/components/Header.svelte';

	export let countryList: Country[];
	export let answer: Country;
	export let borders: string[];

	const maxGuesses = 6;

	// @hmr:keep-all
	let guesses: Guess[] = [];
	let current = 0;
	let selected = 0;
	let won = false;
	$: gameOver = won || current >= maxGuesses;

	$: console.debug('selected:', selected);

	let timeout: NodeJS.Timeout;
	const guess = (country?: Country) => {
		if (!country) return;
		const correct = country.code === answer.code;
		const close = borders.includes(country.code);
		selected = guesses.length;
		guesses = [...guesses, { ...country, correct, close }];
		if (correct) {
			won = true;
		} else {
			// wait for the map to start returning to the target country then move the guess indicator
			const { flyTimeMs, pauseTimeMs } = get(settings$);
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(
				() => !gameOver && (selected = current = guesses.length),
				flyTimeMs + pauseTimeMs,
			);
			// remove already guessed countries from the search list
			countryList = countryList.filter((c) => c.code !== country?.code);
		}
	};

	let keyboardOpen = false;
	globalThis.visualViewport.addEventListener('resize', () => {
		keyboardOpen = globalThis.visualViewport.height < globalThis.screen.height * 0.8;
	});
</script>

<svelte:head>
	<title>Worldie</title>
</svelte:head>

<main class="bg-blue-100 inset-0 fixed flex flex-col items-center">
	<header class="fixed top-0 w-full z-[999] bg-white">
		<Header />
	</header>

	<pre class="fixed bottom-36 right-4 text-sm">height: {globalThis.screen.height}
availHeight: {globalThis.screen.availHeight}
visualViewport: {globalThis.visualViewport.height}</pre>

	<Map {answer} {guesses} {selected} {won} {gameOver} />

	<footer class="fixed bottom-0 w-full z-[999] flex justify-center items-center portrait:flex-col">
		<CountrySearch {countryList} {guess} {gameOver} {won} {answer} />
		{#if !keyboardOpen}
			<Guesses {guesses} {maxGuesses} {current} bind:selected />
		{/if}
	</footer>
</main>
