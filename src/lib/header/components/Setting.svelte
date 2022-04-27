<script lang="ts">
	import { Switch, SwitchGroup, SwitchLabel } from '@rgossiaux/svelte-headlessui';

	export let label: string;
	export let enabled: boolean;
</script>

<SwitchGroup class="flex justify-between items-center p-3 px-4 border-b border-gray-500">
	<SwitchLabel class="text-lg">{label}</SwitchLabel>
	<Switch
		checked={enabled}
		on:change={(e) => (enabled = e.detail)}
		class={`
			${enabled ? 'bg-green-400' : 'bg-gray-400'} 
			shadow-gray-600 shadow-inner
			relative inline-flex flex-shrink-0
			h-5 w-9 p-0.5
			rounded-full border-transparent
			cursor-pointer
			transition-colors ease-in-out duration-200
			focus:outline-none
			focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 \
		`}
	>
		<span class="sr-only">{label}</span>
		<span
			class="inline-block h-full aspect-square bg-white rounded-full transition-transform shadow-md shadow-gray-700"
			class:translate-x-4={enabled}
		/>
	</Switch>
</SwitchGroup>
