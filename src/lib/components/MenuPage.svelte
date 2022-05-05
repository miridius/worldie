<script lang="ts">
	import FullscreenDialog from './FullscreenDialog.svelte';

	export let open: boolean;
</script>

<FullscreenDialog title="Main Menu" bind:open>
	<p class="p-4 italic text-center">This is just a placeholder page</p>
</FullscreenDialog>
