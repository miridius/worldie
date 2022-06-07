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
	<div>
		{#each options as option}
			<label
				class={`${
					option === value
						? 'bg-green-400 dark:bg-green-600 shadow-inner'
						: 'bg-gray-300 dark:bg-gray-700'
				}
				shadow-black/20 dark:shadow-white/20
				first:rounded-l-md last:rounded-r-md px-2 cursor-pointer
				divide-x-2 border-r last:border-0 border-white dark:border-black`}
				><input class="hidden" type="radio" bind:group={value} value={option} />{option}</label
			>
		{/each}
	</div>
</div>
