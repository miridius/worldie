<script lang="ts">
	import Map from '$lib/map/Map.svelte';
	import Typeahead from 'svelte-typeahead';

	type Country = { name: string; code: string };

	export let countries: Country[];
	export let ctryCode: string;

	const extract = (ctry: Country) => ctry.name;

	let guess: Country;
</script>

<svelte:head>
	<title>Worldie</title>
</svelte:head>

<Map {ctryCode} bind:guess />

<div class="p-2.5">
	<Typeahead
		data={countries}
		{extract}
		limit={10}
		placeholder="Guess the country..."
		on:select={({ detail }) => (guess = detail.original)}
		inputAfterSelect="clear"
	/>
</div>

<style>
	/* move the results list above the input + make sure it appears in front of the map */
	:global([data-svelte-typeahead] ul) {
		@apply top-auto bottom-full z-[9999];
	}

	/* hide the typeahead label */
	:global([data-svelte-search] label) {
		@apply hidden;
	}
</style>
