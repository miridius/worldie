<script lang="ts">
	import DownIcon from '$lib/components/icons/DownIcon.svelte';
	import UpIcon from '$lib/components/icons/UpIcon.svelte';
	import type { Guess } from '$lib/types';
	import { fly } from 'svelte/transition';

	export let guesses: Guess[];
	export let maxGuesses: number;
	export let current: number;
	export let selected: number;

	$: guessSlots = [...guesses, ...Array(maxGuesses - guesses.length).fill(undefined)];

	const getButtonBg = (guess: Guess | undefined) => {
		if (!guess) return 'bg-white';
		if (guess.correct) return 'bg-green-500';
		if (guess.close) return 'bg-yellow-500';
		return 'bg-red-600';
	};

	let open = false; // @hmr:keep
</script>

<section class="w-full max-w-xs flex justify-center gap-3">
	{#each guessSlots as guess, i}
		<button
			class={`h-8 w-8 rounded-lg border-gray-800 ${getButtonBg(guess)} shadow-lg`}
			class:bg-blue-600={!guess && i === current}
			class:animate-pulse={!guess && i === current}
			on:click={() => (selected = i)}
			disabled={!guess && i !== current}
		/>
	{/each}
</section>

<button class="h-10 w-10 shrink-0 text-gray-700" on:click={() => (open = true)}>
	<UpIcon />
</button>

{#if open}
	<section
		class="fixed bottom-0 w-full z-[1000]
		flex flex-col items-center
		p-2 px-8
		shadow-2xl bg-white"
		transition:fly={{ y: 200, duration: 250 }}
	>
		<button class="w-10 text-gray-700" on:click={() => (open = false)}>
			<DownIcon />
		</button>
		<ol class="pb-4 w-full max-w-xs border-b border-gray-400">
			{#each guesses.filter((g) => g) as guess, i}
				<li class="font-medium flex items-center gap-2.5 my-2">
					<button
						class={`h-6 w-6 rounded-md
						${getButtonBg(guess)} shadow-md shadow-black/20
						text-white text-sm`}
						on:click={() => (selected = i)}>{i + 1}</button
					>
					{guess?.name}
				</li>
			{/each}
		</ol>

		<p class="py-4 mb-2 font-light w-full max-w-xs">Click to zoom to a country on the map</p>
	</section>
{/if}
