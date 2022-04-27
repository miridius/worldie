<script lang="ts">
	import { Dialog, DialogTitle } from '@rgossiaux/svelte-headlessui';
	import { fly } from 'svelte/transition';

	export let open: boolean;
	export let title: string;
</script>

<Dialog {open} on:close={() => (open = false)}>
	<div transition:fly={{ y: 200, duration: 250 }} class="fixed inset-0 bg-blue-200 text-black">
		<div class="w-full max-w-xl mx-auto flex flex-col relative">
			<DialogTitle class="text-inherit uppercase font-bold self-center p-2 text-3xl"
				>{title}</DialogTitle
			>
			<button
				class="
					absolute top-2 right-4 text-3xl
					focus:outline-none
					focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
				"
				on:click={() => (open = false)}>✕</button
			>
			<slot />
		</div>
	</div>
</Dialog>
