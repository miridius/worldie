<script lang="ts">
	import { fly } from 'svelte/transition';
	import DownIcon from './icons/DownIcon.svelte';
	import UpIcon from './icons/UpIcon.svelte';
	import type { Guess } from './types';

	export let guesses: (Guess | undefined)[];
	export let current: number;
	export let selected: number;

	const getButtonBg = (g: Guess | undefined, index: number) => {
		if (!g) return index === current ? 'bg-blue-500' : 'bg-white';
		if (g.correct) return 'bg-green-500';
		if (g.close) return 'bg-yellow-500';
		return 'bg-red-500';
	};

	let open = false;
</script>

<section class="px-6 py-3 w-full max-w-sm flex justify-around gap-2">
	{#each guesses as guess, i}
		<button
			class={`h-8 w-8 rounded-md border-gray-800 ${getButtonBg(guess, i)}`}
			class:border-4={i === selected}
			on:click={() => (selected = i)}
			disabled={i > current}
		>
			{guess?.name.charAt(0) || ' '}
		</button>
	{/each}
</section>

<button class="w-10 text-gray-700" on:click={() => (open = true)}>
	<UpIcon />
</button>

{#if open}
	<section
		class="fixed bottom-0 w-full z-[1000] flex flex-col items-center
		shadow-xl shadow-black bg-blue-50"
		transition:fly={{ y: 200, duration: 250 }}
	>
		<button class="w-10 text-gray-700" on:click={() => (open = false)}>
			<DownIcon />
		</button>
		<ol class="list-decimal pb-3">
			{#each guesses.filter((g) => g) as guess}
				<li>{guess?.correct ? '✔' : '❌'} {guess?.name}</li>
			{/each}
		</ol>
	</section>
{/if}
