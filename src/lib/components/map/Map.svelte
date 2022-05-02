<script context="module">
	let nextId = 0; // for generating unique element IDs to render the map to
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import Map from './map';

	export let ctryCode: string;
	export let guess: { name: string; code: string } | undefined;
	export let current: number;
	export let selected: number;
	export let won: boolean;
	export let gameOver: boolean;

	const id = `map-${nextId++}`;

	let map: Map;
	let loading = true;

	onMount(async () => {
		map = await new Map().init(id, ctryCode);
		loading = false;
	});

	$: if (guess) {
		if (guess.code !== ctryCode) {
			map.addWrongGuess(guess.code, guess.name).then(() => {
				if (gameOver) {
					map.gameOver();
				} else {
					selected = current;
				}
			});
		}
	}

	$: map?.showGuess(selected);

	$: if (won) map.showWin();
</script>

<div class="h-full w-full flex justify-center items-center p-2 bg-transparent" {id}>
	{#if loading}<p class="text-xl">Loading map...</p>{/if}
</div>

<style lang="postcss">
	:global(.leaflet-control-zoom) {
		@apply flex flex-row-reverse border-0 rounded-lg shadow-lg m-4 !important;
	}

	:global(.leaflet-control-zoom a) {
		@apply rounded-none last:rounded-l-lg first:rounded-r-lg
		border-0 first:border-l first:pr-0.5 first:w-8 border-gray-300
		bg-white shadow-[inset_0_-2px_2px_rgb(0,0,0,0.06)] 
		font-thin text-gray-700 !important;
	}
</style>
