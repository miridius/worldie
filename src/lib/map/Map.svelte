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
			map.addWrongGuess(guess.code, guess.name).then(() => !gameOver && (selected = current));
		}
		guess = undefined;
	}

	$: map?.showGuess(selected);

	$: if (won) map.showWin();
	$: if (gameOver) map.gameOver();
</script>

<div class="h-full w-full flex justify-center items-center p-2 bg-transparent" {id}>
	{#if loading}<p class="text-xl">Loading map...</p>{/if}
</div>
