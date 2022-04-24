<script lang="ts">
	export let ctryCode: string;
	export let guess: { name: string; code: string };
	let loading = true;

	import { onMount } from 'svelte';

	let L;
	let map;
	let ctryLayer;

	const addCtryToMap = async (ctryCode: string, style = {}) => {
		const res = await fetch(`./data/${ctryCode.toLowerCase()}.geo.json`);
		const data = await res.json();
		return L.geoJSON(data, {
			style: { weight: 2, color: '#f8fafc', fill: true, ...style },
		}).addTo(map);
	};

	onMount(async () => {
		L = await import('leaflet');
		map = L.map('map');
		ctryLayer = await addCtryToMap(ctryCode);
		map.fitBounds(ctryLayer.getBounds());
		loading = false;
	});

	$: if (guess) {
		if (guess.code === ctryCode) {
			alert(`omg yass bro it's ${guess.name}`);
			ctryLayer.setStyle({ color: '#10b981' }).bringToFront().bindPopup(guess.name);
			L.tileLayer(
				'https://tile.tracestrack.com/en/{z}/{x}/{y}.png?key=1c9009346d9c00c44c84ef373ba739a4',
				{ opacity: 0.5 },
			).addTo(map);
		} else {
			const name = guess.name;
			addCtryToMap(guess.code, { color: '#ef4444' }).then(async (layer) => {
				layer.bindPopup(name);
				map.flyToBounds(ctryLayer.getBounds().extend(layer.getBounds()));
				map.once('moveend', async () => {
					await new Promise((r) => setTimeout(r, 500));
					map.flyToBounds(ctryLayer.getBounds().pad(0.5), undefined, { duration: 2 });
				});
			});
		}
		guess = undefined;
	}
</script>

<div class="h-full w-full flex justify-center items-center p-2" id="map">
	{#if loading}<p class="text-slate-100">Loading map...</p>{/if}
</div>

<style>
	@import 'leaflet/dist/leaflet.css';

	#map {
		@apply bg-slate-900;
	}
</style>
