<script lang="ts">
	import { Dialog, DialogTitle } from '@rgossiaux/svelte-headlessui';
	import { fly } from 'svelte/transition';
	import CloseIcon from './icons/CloseIcon.svelte';

	// @hmr:keep-all
	export let open: boolean;
	export let title: string;
</script>

<Dialog {open} on:close={() => (open = false)}>
	<div
		transition:fly={{ y: 200, duration: 250 }}
		class="fixed inset-0 top-[3.25rem] bg-white text-black border-t border-black"
	>
		<div class="w-full max-w-3xl mx-auto flex flex-col relative">
			<DialogTitle class="text-inherit uppercase font-medium self-center m-4 pt-0.5 text-lg">
				{title}
			</DialogTitle>
			<button
				class="
					absolute top-4 right-2 w-7 h-7
					focus:outline-none
					focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
				"
				on:click={() => (open = false)}><CloseIcon /></button
			>
			<slot />
		</div>
	</div>
</Dialog>
