<script context="module">
	let nextId = 0; // for generating unique element IDs to render the map to
</script>

<script lang="ts">
	import type { Game$ } from '$lib/game';
	import { onMount } from 'svelte';
	import Map from './map';

	export let game$: Game$;

	const id = `map-${nextId++}`;

	let map = new Map($game$.answer, $game$.selected);
	let loading = true;

	onMount(async () => {
		await map.init(id);
		loading = false;
	});

	$: if (!loading) map.setGuesses($game$.guesses);
	$: if (!loading) map.setSelected($game$.selected);
	$: if (!loading && $game$.won) map.won();
	$: if (!loading && $game$.gameOver) map.gameOver();
</script>

<div class="h-full w-full flex justify-center items-center bg-transparent" {id}>
	{#if loading}<p class="text-xl">Loading map...</p>{/if}
</div>

<style lang="postcss">
	/* Override zoom control styles */
	:global(.leaflet-control-zoom) {
		@apply flex flex-row-reverse border-0 rounded shadow-md m-5 mt-[4.5rem] !important;
	}

	/* Override zoom control button styles -  */
	:global(.leaflet-control-zoom a) {
		/* note that first and last are swapped because of flex-row-reverse on the parent */
		@apply rounded-none last:rounded-l first:rounded-r
		border-0 first:border-l first:pr-0.5 first:w-8 border-gray-300 dark:border-gray-400
		bg-white dark:bg-gray-600 shadow-[inset_0_-2px_2px_rgb(0,0,0,0.06)] 
		font-thin text-gray-700
		dark:text-gray-100 dark:hover:text-gray-200 dark:focus:text-gray-300 dark:active:text-gray-400
		!important;
	}
</style>
