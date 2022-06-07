<script lang="ts">
	import { settings$ } from '$lib/components/settings/store';
	import '../app.css';

	$: darkTheme =
		$settings$.theme == 'dark' ||
		($settings$.theme == 'auto' && globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches);

	$: globalThis.document?.documentElement.classList.toggle('dark', darkTheme);
</script>

<slot />
