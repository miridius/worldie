<script lang="ts">
	export let key: string;
	export let label: string;
	export let value: number;
	export let set: (v: number) => void;
</script>

<div class="flex w-full justify-between items-center p-3 px-4 border-b border-gray-500">
	<label class="text-lg" for={key}>{label}</label>
	<input
		class="w-20 px-1 rounded bg-gray-300 dark:bg-gray-700"
		type="number"
		id={key}
		bind:value
		on:input={() => set(value)}
	/>
</div>
