<script lang="ts">
	import { Switch, SwitchGroup, SwitchLabel } from '@rgossiaux/svelte-headlessui';

	export let label: string;
	export let value: boolean;
	export let set: (v: boolean) => void;
</script>

<SwitchGroup class="flex justify-between items-center p-3 px-4 border-b border-gray-500">
	<SwitchLabel class="text-lg">{label}</SwitchLabel>
	<Switch
		checked={value}
		on:change={(e) => set((value = e.detail))}
		class={`
			${value ? 'bg-green-500' : 'bg-gray-500'} 
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
			class="inline-block h-4 w-4 bg-white rounded-full transition-transform shadow shadow-black"
			class:translate-x-4={value}
		/>
	</Switch>
</SwitchGroup>
