<script lang="ts">
	import { browser } from '$app/env';
	import FullscreenDialog from '$lib/components/FullscreenDialog.svelte';
	import Setting from './Setting.svelte';
	import type { Settings } from './store';

	export let open: boolean;

	const settings: { label: string; key: keyof Settings; type: 'number' | 'switch' | 'select' }[] = [
		{ label: 'Country outline width (px)', key: 'style.weight', type: 'number' },
		{ label: 'Fill country interiors?', key: 'style.fill', type: 'switch' },
		{ label: 'Fly to guess time (ms)', key: 'flyTimeMs', type: 'number' },
		{ label: 'Pause on guess time (ms)', key: 'pauseTimeMs', type: 'number' },
	];
</script>

<FullscreenDialog bind:open title="Settings">
	{#if browser}
		{#each settings as setting}
			<Setting {...setting} />
		{/each}
	{:else}
		<p class="p-4 mx-auto text-lg">Loading...</p>
	{/if}
</FullscreenDialog>
