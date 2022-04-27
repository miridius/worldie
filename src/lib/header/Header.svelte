<script lang="ts">
	import Help from './components/Help.svelte';
	import HelpIcon from '../icons/HelpIcon.svelte';
	import Settings from './components/Settings.svelte';
	import SettingsIcon from '../icons/SettingsIcon.svelte';

	let helpOpen = false;
	let settingsOpen = false;
</script>

<nav class="w-full flex justify-between items-center p-3">
	<button on:click={() => (helpOpen = true)}><HelpIcon /></button>

	<h1 class="text-3xl font-bold uppercase">Worldie</h1>

	<button on:click={() => (settingsOpen = true)}><SettingsIcon /></button>
</nav>

<Help bind:open={helpOpen} />
<Settings bind:open={settingsOpen} />
