<script lang="ts">
	import { fly } from 'svelte/transition';
	import DownIcon from './icons/DownIcon.svelte';

	import UpIcon from './icons/UpIcon.svelte';

	import type { Guess } from './types';

	export let guesses: (Guess | undefined)[];
	export let current: number;
	export let selected: number;

	const getButtonBg = (g?: Guess) => {
		if (!g) return 'bg-white';
		if (g.correct) return 'bg-green-500';
		if (g.close) return 'bg-yellow-500';
		return 'bg-red-500';
	};

	let open = false;
</script>

<section class="px-6 py-3 w-full max-w-sm flex justify-around gap-2">
	{#each guesses as guess, i}
		<button
			class={`h-8 aspect-square rounded-md border-gray-800 ${getButtonBg(guess)}`}
			class:border-4={i === selected}
			class:bg-blue-500={i === current}
		>
			{guess?.name.charAt(0) || ' '}
		</button>
	{/each}
</section>

<button class="w-12 text-gray-700 transition-all" on:click={() => (open = !open)}>
	{#if open}<DownIcon />{:else}<UpIcon />{/if}
</button>

{#if open}
	<ol class="list-decimal pb-3" transition:fly={{ y: 200, duration: 200 }}>
		{#each guesses as guess}
			<li>{guess?.name || '...'}</li>
		{/each}
	</ol>
{/if}
