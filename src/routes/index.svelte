<script lang="ts">
	import CountrySearch from '$lib/components/CountrySearch.svelte';
	import Guesses from '$lib/components/Guesses.svelte';
	import Map from '$lib/components/map/Map.svelte';
	import { addGameToStats } from '$lib/components/stats/store';
	import { Game$ } from '$lib/game';
	import type { Country, Game } from '$lib/types';
	import Header from '../lib/components/Header.svelte';

	//@hmr:keep-all
	export let isoDate: string;
	export let countryList: Country[];
	export let answer: Country;
	export let borders: string[];

	const game$ = new Game$(isoDate, countryList, answer, borders);

	let keyboardOpen = false;
	globalThis.visualViewport?.addEventListener('resize', () => {
		keyboardOpen = globalThis.visualViewport.height < globalThis.screen.height * 0.7;
	});
</script>

<svelte:head>
	<title>Worldie</title>
</svelte:head>

<main class="bg-blue-100 inset-0 fixed flex flex-col items-center">
	<header class="fixed top-0 w-full z-[999] bg-white">
		<Header {game$} />
	</header>

	<Map {game$} />

	<footer class="fixed bottom-0 w-full z-[999] flex justify-center items-center portrait:flex-col">
		<CountrySearch {game$} />
		{#if !keyboardOpen}
			<Guesses {game$} />
		{/if}
	</footer>
</main>
