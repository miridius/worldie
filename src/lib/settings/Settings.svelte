<script lang="ts">
	import { Dialog, DialogTitle } from '@rgossiaux/svelte-headlessui';
	import { fly } from 'svelte/transition';
	import Setting from './Setting.svelte';

	export let open: boolean;

	const settings = [
		{ label: 'Show guesses on map', enabled: true },
		{ label: 'Dark theme', enabled: true },
	];
</script>

<Dialog {open} on:close={() => (open = false)}>
	<div transition:fly={{ y: 200, duration: 250 }} class="fixed inset-0 bg-slate-900 text-slate-100">
		<div class="w-full max-w-xl mx-auto flex flex-col relative">
			<DialogTitle class="text-inherit uppercase font-bold self-center p-2">Settings</DialogTitle>

			<button
				class="
					absolute top-2 right-4
					focus:outline-none
					focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
				"
				on:click={() => (open = false)}>✕</button
			>

			{#each settings as setting}
				<Setting {...setting} />
			{/each}
			<p class="p-3 px-4 italic">
				These setttings don't do anything yo I was just having fun making switches
			</p>
		</div>
	</div>
</Dialog>
