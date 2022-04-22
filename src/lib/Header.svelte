<script lang="ts">
	import Settings from './settings/Settings.svelte';

	let settingsOpen = false;
</script>

<nav
	class="w-full flex justify-between items-center p-2
border-b border-slate-600 text-white text-2xl"
>
	<section class="flex space-x-2">
		<button>🍔</button>
		<button>❓</button>
	</section>

	<h1 class="text-white text-3xl font-serif font-semibold tracking-tight">Worldie</h1>

	<section class="flex space-x-2">
		<button>🏆</button>
		<button on:click={() => (settingsOpen = true)}>⚙</button>
	</section>
</nav>

<Settings bind:open={settingsOpen} />
