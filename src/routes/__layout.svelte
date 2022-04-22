<script lang="ts">
	import Header from '$lib/Header.svelte';
	import '../app.css';
</script>

<main class="bg-slate-900 inset-0 fixed flex flex-col items-center">
	<Header />
	<slot />
</main>
