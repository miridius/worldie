<script context="module">
	let nextId = 0; // for generating unique element IDs to render the map to
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import Map from './map';

	export let ctryCode: string;
	export let guess: { name: string; code: string } | undefined;

	const id = `map-${nextId++}`;

	let map: Map;
	let loading = true;

	onMount(async () => {
		map = await new Map().init(id, ctryCode);
		loading = false;
	});

	$: if (guess) {
		if (guess.code === ctryCode) {
			map.showWin(guess.name);
		} else {
			map.showWrongGuess(guess.code, guess.name);
		}
		guess = undefined;
	}
</script>

<div class="h-full w-full flex justify-center items-center p-2 bg-transparent" {id}>
	{#if loading}<p class="text-xl">Loading map...</p>{/if}
</div>
