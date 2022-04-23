<script lang="ts">
	import Map from '$lib/Map.svelte';
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

<div class="z-50 py-2">
	<Typeahead
		data={countries}
		{extract}
		limit={10}
		label="Guess the country..."
		on:select={({ detail }) => (guess = detail.original)}
		inputAfterSelect="clear"
	/>
</div>

<Map {ctryCode} bind:guess />
