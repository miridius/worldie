<script lang="ts">
	import CountrySearch from '$lib/components/CountrySearch.svelte';
	import Guesses from '$lib/components/Guesses.svelte';
	import Header from '$lib/components/Header.svelte';
	import Map from '$lib/components/map/Map.svelte';
	import { Game$ } from '$lib/game';
	import type { Challenge, Country } from '$lib/types';
	import { toIsoDate } from '$lib/utils';

	//@hmr:keep-all
	export let countryList: Country[];
	export let challenges: Partial<Record<string, Challenge>>;

	const isoDate = toIsoDate(new Date());
	const challenge = challenges[isoDate];
	const game$ = challenge && new Game$(isoDate, countryList, challenge);

	let keyboardOpen = false;
	globalThis.visualViewport?.addEventListener('resize', () => {
		setTimeout(
			() => (keyboardOpen = globalThis.visualViewport.height < globalThis.screen.height * 0.7),
			50,
		);
	});
</script>

<svelte:head>
	<title>Worldie</title>
</svelte:head>

<main class="bg-blue-100 inset-0 fixed flex flex-col items-center justify-center">
	{#if game$}
		<header class="fixed top-0 w-full z-[999] bg-white">
			<Header {game$} />
		</header>

		<Map {game$} />

		<footer
			class="fixed bottom-0 w-full z-[999] flex justify-center items-center portrait:flex-col"
		>
			<CountrySearch {game$} />
			{#if !keyboardOpen}
				<Guesses {game$} />
			{/if}
		</footer>
	{:else}
		<p class="m-3 text-center">
			Mate, are you from the future or something? Your clock is set for a day I don't have a
			challenge for.
		</p>
		<p class="m-3 text-center">Please fix your clock and/or refresh the page.</p>
		<p class="m-3 text-center">
			If the issue persists please create an issue on GitHub:
			<a class="underline" href="https://github.com/miridius/worldie/issues"
				>https://github.com/miridius/worldie/issues</a
			>
		</p>
	{/if}
</main>
