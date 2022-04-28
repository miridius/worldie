<script lang="ts">
	import type { Country } from '$lib/types';
	import Typeahead from 'svelte-typeahead';

	export let countries: Country[];
	export let guess: Country | undefined;
	export let gameOver: boolean;
	export let won: boolean;

	$: label = gameOver
		? won
			? 'You guessed it!'
			: 'Better luck next time!'
		: 'Guess the country...';

	const extract = (ctry: Country) => ctry.name;
</script>

<div class="p-3 w-full max-w-sm">
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
	/* move the results list above the input + make sure it appears in front of the map */
	:global([data-svelte-typeahead] ul) {
		@apply top-auto bottom-full z-[9999];
	}

	/* hide the typeahead label */
	:global([data-svelte-search] label) {
		@apply hidden;
	}
</style>
