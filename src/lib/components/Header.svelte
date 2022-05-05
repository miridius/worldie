<script lang="ts">
	import HelpPage from './HelpPage.svelte';
	import HelpIcon from './icons/HelpIcon.svelte';
	import MenuIcon from './icons/MenuIcon.svelte';
	import SettingsIcon from './icons/SettingsIcon.svelte';
	import StatsIcon from './icons/StatsIcon.svelte';
	import MenuPage from './MenuPage.svelte';
	import SettingsPage from './settings/SettingsPage.svelte';
	import StatsPage from './StatsPage.svelte';

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

<MenuPage bind:open={menuOpen} />
<HelpPage bind:open={helpOpen} />
<StatsPage bind:open={statsOpen} />
<SettingsPage bind:open={settingsOpen} />
