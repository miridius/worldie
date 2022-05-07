<script lang="ts">
	import DownIcon from '$lib/components/icons/DownIcon.svelte';
	import UpIcon from '$lib/components/icons/UpIcon.svelte';
	import { MAX_GUESSES, type Game$ } from '$lib/game';
	import type { Guess } from '$lib/types';
	import { fly } from 'svelte/transition';

	export let game$: Game$;

	$: lost = $game$.gameOver && !$game$.won;

	$: guessSlots = [
		...$game$.guesses,
		...Array(MAX_GUESSES + (lost ? 1 : 0) - $game$.guesses.length).fill(undefined),
	];

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
		{#if i < MAX_GUESSES}
			<button
				class={`h-8 w-8 rounded-lg border-gray-800 ${getButtonBg(guess)} shadow-lg`}
				class:bg-blue-600={!guess && i === $game$.current}
				class:animate-pulse={i === $game$.selected}
				on:click={() => game$.select(i)}
				disabled={!guess && i !== $game$.current}
			/>
		{/if}
	{/each}
</section>

<button class="h-10 w-10 shrink-0 text-gray-700" on:click={() => (open = true)}>
	<UpIcon />
</button>

{#if open}
	<section
		class="fixed bottom-0 w-full z-[1000]
		flex flex-col items-center
		px-6 p-1
		shadow-2xl bg-white"
		transition:fly={{ y: 200, duration: 250 }}
	>
		<button class="w-10 text-gray-700" on:click={() => (open = false)}>
			<DownIcon />
		</button>

		{#if $game$.guesses?.length}
			<ol class="pb-4 w-full max-w-sm border-b border-gray-400">
				{#each guessSlots.filter((g, i) => g || i === $game$.current) as guess, i}
					<li>
						<button
							class="font-medium flex items-center gap-2.5 my-2"
							on:click={() => game$.select(i)}
						>
							<div
								class={`h-6 w-6 rounded-md shrink-0
								${getButtonBg(guess)} shadow-md shadow-black/20
								text-white text-sm flex justify-center items-center`}
								class:bg-blue-600={!guess && i === $game$.current}
								class:animate-pulse={i === $game$.selected}
							>
								{i >= MAX_GUESSES ? 'X' : i + 1}
							</div>
							{guess?.name || ($game$.gameOver ? $game$.answer.name : '?')}
						</button>
					</li>
				{/each}
			</ol>

			<p class="py-4 font-light w-full max-w-sm">Tap to fly to a country on the map</p>
		{:else}
			<div class="mb-2 space-y-2">
				<p>You haven't guessed anything yet.</p>
				<p>After you've made some guesses, they'll show up here.</p>
			</div>
		{/if}
	</section>
{/if}
