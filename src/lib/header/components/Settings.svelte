<script lang="ts">
	import FullscreenDialog from './FullscreenDialog.svelte';
	import Setting from './Setting.svelte';

	export let open: boolean;

	const settings = [
		{ label: 'Show guesses on map', enabled: true },
		{ label: 'Dark theme', enabled: true },
	];
</script>

<FullscreenDialog bind:open title="Settings">
	{#each settings as setting}
		<Setting {...setting} />
	{/each}
	<p class="p-3 px-4 italic">These setttings don't do anything yet! It's just a placeholder</p>
</FullscreenDialog>
