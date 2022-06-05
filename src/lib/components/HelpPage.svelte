<script lang="ts">
	import FullscreenDialog from './FullscreenDialog.svelte';

	export let open: boolean;
</script>

<FullscreenDialog title="How to Play" bind:open>
	<article class="mx-4 space-y-6">
		<section class="space-y-3">
			<p>You are shown the shape of a mystery country.</p>
			<p>You have six chances to guess the correct answer.</p>
			<p>Each guess must be a valid country. Press enter to submit your guess.</p>
			<p>
				If your guess is wrong, the incorrect country shape will be added to the map in red to help
				you visually narrow down the location of the correct country.
			</p>
			<p>
				If your guess touches borders with the mystery country, it will show in yellow instead of
				red.
			</p>
		</section>
		<div class="border-t border-black dark:border-white w-full" />
		<section class="space-y-3">
			<p>A new country is available to guess each day, good luck!</p>
			<p>Random play and challenge archive modes coming soon :)</p>
		</section>
		<div class="border-t border-black dark:border-white w-full" />
		<section class="space-y-3">
			<p>
				You can report issues, make feature requests, or contribute to this project on <a
					href="https://github.com/miridius/worldie"
					rel="external">GitHub</a
				>, or join the discussion on
				<a href="https://t.me/+_YvCH-33niI3OWUy" rel="external">Telegram</a>
			</p>
		</section>
		<div class="border-t border-black dark:border-white w-full" />
		<section>
			<p>
				<span class="font-display font-medium">WORLDIE</span> is inspired by
				<a href="https://www.nytimes.com/games/wordle/index.html" rel="external"
					><span class="font-display">Wordle</span></a
				>
				and
				<a href="https://worldle.teuteuf.fr/" rel="external">WOR<b>L</b>DLE</a>.
			</p>
		</section>
	</article>
</FullscreenDialog>

<style lang="postcss">
	a {
		@apply underline hover:text-green-700;
	}
</style>
