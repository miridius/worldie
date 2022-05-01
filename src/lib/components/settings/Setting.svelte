<script lang="ts">
	import { derived } from 'svelte/store';
	import NumberSetting from './NumberSetting.svelte';
	import { settings$, type Settings } from './store';
	import SwitchSetting from './SwitchSetting.svelte';

	export let label: string;
	export let key: keyof Settings;
	export let type: 'number' | 'switch' | 'select';

	const value$ = derived(settings$, (s) => s[key] as any);
	const set = (value: any) => settings$.update((s) => ({ ...s, [key]: value }));
</script>

{#if type === 'switch'}
	<SwitchSetting {label} value={$value$} {set} />
{:else if type === 'number'}
	<NumberSetting {label} {key} value={$value$} {set} />
{/if}
