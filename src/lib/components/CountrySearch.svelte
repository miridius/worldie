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
		placeholder:text-gray-600 placeholder:text-center !important;
	}
	:global([data-svelte-typeahead] input:not(:disabled)) {
		@apply placeholder:text-left !important;
		padding-left: 2.5rem;
		background: url('/images/search.svg') no-repeat left;
		background-size: 1.5rem;
		background-position-x: 0.5rem;
		background-position-y: 0.55rem;
	}
	:global([data-svelte-typeahead] input:disabled::-webkit-search-cancel-button) {
		@apply hidden !important;
	}

	/* styles for the results list */
	:global([data-svelte-typeahead] ul) {
		@apply top-auto bottom-full bg-white rounded-xl !important;
	}
	:global([data-svelte-typeahead] ul mark) {
		@apply bg-transparent text-blue-600 font-medium !important;
	}

	/* styles for the label */
	:global([data-svelte-search] label) {
		@apply hidden !important;
	}
</style>
