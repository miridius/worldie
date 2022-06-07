<script lang="ts">
	import type { Game$ } from '$lib/game';
	import Typeahead from 'svelte-typeahead';

	export let game$: Game$;

	$: countryName = $game$.answer?.name.toUpperCase();
	$: label = $game$.gameOver
		? $game$.won
			? `You guessed it, it's ${countryName}!`
			: `It's ${countryName}! Better luck next time.`
		: 'Guess the country';
</script>

<div class="p-5 w-full max-w-md">
	<Typeahead
		data={$game$.countryList}
		extract={(ctry) => ctry.name}
		limit={10}
		{label}
		placeholder={label}
		on:select={({ detail }) => game$.makeGuess(detail.original)}
		inputAfterSelect="clear"
		disabled={$game$.gameOver}
	/>
</div>

<style lang="postcss">
	/* styles the whole typeahead component */
	:global([data-svelte-typeahead]) {
		@apply bg-transparent !important;
	}

	/* styles for the search input */
	:global([data-svelte-typeahead] input) {
		@apply border-0 outline-none bg-white rounded-xl opacity-100
		placeholder:text-left placeholder:text-gray-600
		disabled:placeholder:text-center disabled:placeholder:text-gray-900
		!important;
	}
	/* styles for the search input in dark mode */
	:global(.dark [data-svelte-typeahead] input) {
		@apply bg-gray-600 placeholder:text-gray-300 disabled:placeholder:text-gray-100 text-white !important;
	}
	/* show search icon (when not disabled) */
	:global([data-svelte-typeahead] input:not(:disabled)) {
		padding-left: 2.5rem;
		background: url('/images/search.svg') no-repeat left;
		background-size: 1.5rem;
		background-position-x: 0.5rem;
		background-position-y: 0.55rem;
	}
	/* hide clear button when disabled */
	:global([data-svelte-typeahead] input:disabled::-webkit-search-cancel-button) {
		@apply hidden !important;
	}

	/* styles for the results list */
	:global([data-svelte-typeahead] ul) {
		@apply top-auto bottom-full bg-white rounded-xl !important;
	}
	:global([data-svelte-typeahead] ul .selected) {
		@apply first:rounded-t-xl last:rounded-b-xl !important;
	}
	:global([data-svelte-typeahead] ul li) {
		@apply border-gray-500 !important;
	}
	:global([data-svelte-typeahead] ul mark) {
		@apply bg-transparent text-blue-600 font-medium !important;
	}
	/* styles for the results list in dark mode */
	:global([data-svelte-typeahead] ul) {
		@apply bg-gray-600 text-gray-200 !important;
	}
	:global([data-svelte-typeahead] ul .selected) {
		@apply bg-gray-700 !important;
	}
	:global([data-svelte-typeahead] ul mark) {
		@apply text-blue-300 !important;
	}

	/* styles for the label */
	:global([data-svelte-search] label) {
		@apply hidden !important;
	}
</style>
