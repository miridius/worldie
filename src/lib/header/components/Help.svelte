<script lang="ts">
	import FullscreenDialog from './FullscreenDialog.svelte';

	export let open: boolean;
</script>

<FullscreenDialog title="Help" bind:open>
	<article class="p-4 flex flex-col gap-4 text-lg">
		<p>You are shown a map with the outline of a mystery country.</p>
		<p>You have 6 chances to guess which country it is.</p>
		<p>Each time you guess it wrong, the country you guessed will be added to the map.</p>
	</article>
</FullscreenDialog>
