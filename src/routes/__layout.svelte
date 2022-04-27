<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<main class="bg-blue-200 inset-0 fixed flex flex-col items-center">
	<Header />
	<slot />
</main>
