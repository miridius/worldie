<script lang="ts">
	import { derived } from 'svelte/store';
	import NumberSetting from './NumberSetting.svelte';
	import SelectSetting from './SelectSetting.svelte';
	import { settings$, type Settings } from './store';
	import SwitchSetting from './SwitchSetting.svelte';
	import ToggleSetting from './ToggleSetting.svelte';

	export let label: string;
	export let key: keyof Settings;
	export let type: 'number' | 'switch' | 'select' | 'toggle';
	export let options: string[] | undefined;

	const value$ = derived(settings$, (s) => s[key] as any);
	const set = (value: any) => settings$.update((s) => ({ ...s, [key]: value }));
</script>

{#if type === 'switch'}
	<SwitchSetting {label} value={$value$} {set} />
{:else if type === 'number'}
	<NumberSetting {label} {key} value={$value$} {set} />
{:else if type === 'select'}
	<SelectSetting {label} {key} value={$value$} {set} {options} />
{:else if type === 'toggle'}
	<ToggleSetting {label} {key} value={$value$} {set} {options} />
{/if}
