<script lang="ts">
	import Map from '$lib/Map.svelte';
	import Typeahead from 'svelte-typeahead';

	type Country = { name: string; code: string };

	export let countries: Country[];
	export let ctryCode: string;

	const extract = (ctry: Country) => ctry.name;

	let guess: Country;
	let giveUp = false;
	$: gameOver = giveUp || guess?.code === ctryCode;
</script>

<svelte:head>
	<title>Worldie</title>
</svelte:head>

<div class="p-2 flex gap-2 items-center">
	<div class="z-50">
		<Typeahead
			data={countries}
			{extract}
			limit={10}
			label="Guess the country..."
			on:select={({ detail }) => (guess = detail.original)}
			inputAfterSelect="clear"
			disabled={gameOver}
		/>
	</div>
	<button
		on:click={() => (giveUp = true)}
		disabled={gameOver}
		class="inline-block p-2 bg-blue-500 text-xs leading-tight uppercase rounded shadow-md
		hover:bg-blue-700 hover:shadow-lg focus-visible:ring-2 ring-white">Give up</button
	>
</div>

<Map {ctryCode} {guess} {giveUp} />
