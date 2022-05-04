<script lang="ts">
	import Help from '$lib/components/Help.svelte';
	import HelpIcon from '$lib/components/icons/HelpIcon.svelte';
	import SettingsIcon from '$lib/components/icons/SettingsIcon.svelte';
	import Settings from '$lib/components/settings/Settings.svelte';

	let helpOpen = false;
	let settingsOpen = false;
</script>

<header class="w-full bg-white fixed top-0 z-[999]">
	<nav class="max-w-3xl mx-auto flex justify-between items-center p-3">
		<button on:click={() => (helpOpen = true)}><HelpIcon /></button>

		<h1 class="text-3xl font-display tracking-wide uppercase">Worldie</h1>

		<button on:click={() => (settingsOpen = true)}><SettingsIcon /></button>
	</nav>
</header>

<Help bind:open={helpOpen} />
<Settings bind:open={settingsOpen} />
