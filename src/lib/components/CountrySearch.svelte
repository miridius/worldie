<script lang="ts">
	import type { Country } from '$lib/types';
	import Typeahead from 'svelte-typeahead';

	export let countries: Country[];
	export let guess: Country | undefined;
	export let gameOver: boolean;
	export let won: boolean;

	$: label = gameOver
		? won
			? `You guessed it, it's ${guess?.name.toUpperCase()}!`
			: `It's ${guess?.name.toUpperCase()}. Better luck next time!`
		: 'Guess the country';

	const extract = (ctry: Country) => ctry.name;
</script>

<div class="p-4 w-full max-w-sm">
	<Typeahead
		data={countries}
		{extract}
		limit={10}
		{label}
		placeholder={label}
		on:select={({ detail }) => (guess = detail.original)}
		inputAfterSelect="clear"
		disabled={gameOver}
	/>
</div>

<style lang="postcss">
	/* styles the whole typeahead component */
	:global([data-svelte-typeahead]) {
		@apply bg-transparent !important;
	}

	/* styles for the search input */
	:global([data-svelte-typeahead] input) {
		@apply border-0 bg-white rounded-xl placeholder:text-gray-600 placeholder:text-center !important;
	}
	:global([data-svelte-typeahead] input:not(:disabled)) {
		@apply placeholder:text-left !important;
		padding-left: 2.5rem;
		background: url('/images/search.svg') no-repeat left;
		background-size: 1.5rem;
		background-position-x: 0.5rem;
		background-position-y: 0.55rem;
	}

	/* styles for the results list */
	:global([data-svelte-typeahead] ul) {
		@apply top-auto bottom-full bg-white rounded-xl !important;
	}

	/* styles for the label */
	:global([data-svelte-search] label) {
		@apply hidden !important;
	}
</style>
