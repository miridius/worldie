<script lang="ts">
	import type { Country } from '$lib/types';
	import Typeahead from 'svelte-typeahead';

	export let countries: Country[];
	export let guess: Country | undefined;
	export let disabled = false;

	const extract = (ctry: Country) => ctry.name;
</script>

<div class="p-3 w-full max-w-sm">
	<Typeahead
		data={countries}
		{extract}
		limit={10}
		label="Guess the country..."
		placeholder="Guess the country..."
		on:select={({ detail }) => (guess = detail.original)}
		inputAfterSelect="clear"
		{disabled}
	/>
</div>

<style lang="postcss">
	/* move the results list above the input + make sure it appears in front of the map */
	:global([data-svelte-typeahead] ul) {
		@apply top-auto bottom-full z-[9999];
	}

	/* hide the typeahead label */
	:global([data-svelte-search] label) {
		@apply hidden;
	}
</style>
