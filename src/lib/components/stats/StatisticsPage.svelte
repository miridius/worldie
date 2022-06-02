<script lang="ts">
	import { MAX_GUESSES, type Game$ } from '$lib/game';
	import { challengeNumber, isMobile } from '$lib/utils';
	import { Dialog, DialogTitle } from '@rgossiaux/svelte-headlessui';
	import { fly } from 'svelte/transition';
	import CloseIcon from '../icons/CloseIcon.svelte';
	import Badge from './Badge.svelte';
	import { stats$ } from './store';

	export let open: boolean;
	export let game$: Game$;

	$: winRate = Math.round((100 * $stats$.won) / $stats$.played) || 0;
	$: maxDist = Math.max(...$stats$.distribution);
	$: highlight = $game$.gameOver && ($game$.won ? $game$.guesses.length : 7);
	$: if ($game$.gameOver) open = true;

	const canShare = (data?: ShareData) =>
		isMobile() && navigator.canShare(data) && !navigator.userAgent.match(/android.*firefox/i);

	const share = async () => {
		const { isoDate, won, guesses } = $game$;
		const text = `#Worldie #${challengeNumber(isoDate)} (${isoDate}) ${won ? guesses.length : 'X'}/6
${guesses
	.map((g) => (g.correct ? '🟩' : g.close ? '🟨' : '🟥'))
	.concat(Array(MAX_GUESSES - guesses.length).fill('⬜️'))
	.join('')}
https://worldie.app`;
		const data = { title: 'Worldie challenge results', text };
		if (canShare(data)) {
			await navigator.share(data).catch(console.error);
		} else {
			navigator.clipboard.writeText(text);
			alert('results copied to clipboard');
		}
	};
</script>

<Dialog {open} on:close={() => (open = false)}>
	<div
		transition:fly={{ y: 200, duration: 250 }}
		class="fixed inset-0 landscape:bottom-[5rem]
		max-w-[min(25.5rem,100%-2.5rem)] m-auto max-h-96
		bg-white text-black rounded-md"
	>
		<div class="w-full max-w-3xl mx-auto flex flex-col items-center relative">
			<DialogTitle class="text-inherit uppercase font-medium self-center mt-4 pt-0.5 text-lg">
				Statistics
			</DialogTitle>
			<button
				class="absolute top-4 right-2 w-7 h-7
			focus:outline-none
			focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 "
				on:click={() => (open = false)}><CloseIcon /></button
			>

			<section class="mt-2 flex">
				<Badge value={$stats$.played} text="Played" />
				<Badge value={winRate} text="Win %" />
				<Badge value={$stats$.streak} text="Current Streak" />
				<Badge value={$stats$.maxStreak} text="Max Streak" />
			</section>

			<h2 class="mt-6 uppercase text-lg font-medium">Guess Distribution</h2>

			<ol class="mt-2 px-5 space-y-1.5 w-full max-w-xs">
				{#each Array(6) as _, i}
					{@const n = $stats$.distribution[i]}
					{@const fill = i + 1 === highlight ? 'bg-green-500' : 'bg-gray-300'}
					<li class="w-full flex text-sm">
						<div class="w-2 text-right mr-2">{i + 1}</div>
						<div class={`${fill} font-semibold w-4 text-center`}>{n}</div>
						<div class="grow mr-0.5">
							<div class={`${fill} h-full`} style:width={`${(n / maxDist) * 100}%`} />
						</div>
					</li>
				{/each}
			</ol>

			{#if $game$.gameOver}
				<button
					class="mt-5 bg-green-500 active:bg-green-600 transition px-5 p-0.5 rounded-md shadow-lg"
					on:click={share}
				>
					<span
						class="text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-white
				uppercase font-bold tracking-wider"
					>
						Share
					</span>
				</button>
			{/if}
		</div>
	</div>
</Dialog>
