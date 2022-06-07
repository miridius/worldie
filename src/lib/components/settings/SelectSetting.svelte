<script lang="ts">
	export let key: string;
	export let label: string;
	export let options: string[] = [];
	export let value: string;
	export let set: (v: string) => void;

	$: set(value);
</script>

<div class="flex w-full justify-between items-center p-3 px-4 border-b border-gray-500">
	<label class="text-lg" for={key}>{label}</label>
	<select
		class="w-20 px-1 rounded bg-gray-300 dark:bg-gray-700"
		id={key}
		bind:value
		on:change={() => set(value)}
	>
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
</div>
