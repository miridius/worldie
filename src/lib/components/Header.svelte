<script lang="ts">
	import Help from '$lib/components/Help.svelte';
	import HelpIcon from '$lib/components/icons/HelpIcon.svelte';
	import SettingsIcon from '$lib/components/icons/SettingsIcon.svelte';
	import Settings from '$lib/components/settings/Settings.svelte';
	import MenuIcon from './icons/MenuIcon.svelte';
	import StatsIcon from './icons/StatsIcon.svelte';

	// @hmr:keep-all
	let menuOpen = false;
	let helpOpen = false;
	let statsOpen = false;
	let settingsOpen = false;
</script>

<nav class="max-w-3xl mx-auto flex justify-between items-center gap-1.5 p-3 py-2">
	<button class="w-5 h-5" on:click={() => (menuOpen = true)}><MenuIcon /></button>
	<button class="w-5 h-5" on:click={() => (helpOpen = true)}><HelpIcon /></button>

	<h1 class="text-3xl font-display tracking-wide uppercase grow text-center">Worldie</h1>

	<button class="w-5 h-5" on:click={() => (statsOpen = true)}><StatsIcon /></button>
	<button class="w-5 h-5" on:click={() => (settingsOpen = true)}><SettingsIcon /></button>
</nav>

<Help bind:open={helpOpen} />
<Settings bind:open={settingsOpen} />
