<script context="module">
	let nextId = 0; // for generating unique element IDs to render the map to
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import Map from './map';

	export let ctryCode: string;
	export let guess: { name: string; code: string };

	const id = `map-${nextId++}`;

	let map: Map;
	let loading = true;

	onMount(async () => {
		map = await new Map().init(id, ctryCode);
		loading = false;
	});

	$: if (guess) {
		if (guess.code === ctryCode) {
			alert(`omg yass bro it's ${guess.name}`);
			map.showWin(guess.name);
		} else {
			map.showWrongGuess(guess.code, guess.name);
		}
		guess = undefined;
	}
</script>

<div class="h-full w-full flex justify-center items-center p-2 bg-slate-900" {id}>
	{#if loading}<p class="text-slate-100">Loading map...</p>{/if}
</div>
