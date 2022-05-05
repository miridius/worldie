<script context="module">
	let nextId = 0; // for generating unique element IDs to render the map to
</script>

<script lang="ts">
	import type { Country, Guess } from '$lib/types';
	import { onMount } from 'svelte';
	import Map from './map';

	export let answer: Country;
	export let guesses: Guess[];
	export let selected: number;
	export let won: boolean;
	export let gameOver: boolean;

	const id = `map-${nextId++}`;

	let map = new Map(answer, selected);
	let loading = true;

	onMount(async () => {
		await map.init(id);
		loading = false;
	});

	$: if (!loading) map.setGuesses(guesses);
	$: if (!loading) map.setSelected(selected);
	$: if (!loading && won) map.won();
	$: if (!loading && gameOver) map.gameOver();
</script>

<div class="h-full w-full flex justify-center items-center bg-transparent" {id}>
	{#if loading}<p class="text-xl">Loading map...</p>{/if}
</div>

<style lang="postcss">
	/* Override zoom control styles */
	:global(.leaflet-control-zoom) {
		@apply flex flex-row-reverse border-0 rounded shadow-md m-4 mt-[4.75rem] !important;
	}

	/* Override zoom control button styles -  */
	:global(.leaflet-control-zoom a) {
		/* note that first and last are swapped because of flex-row-reverse on the parent */
		@apply rounded-none last:rounded-l first:rounded-r
		border-0 first:border-l first:pr-0.5 first:w-8 border-gray-300
		bg-white shadow-[inset_0_-2px_2px_rgb(0,0,0,0.06)] 
		font-thin text-gray-700 !important;
	}
</style>
