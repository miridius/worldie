<script lang="ts">
	export let ctryCode: string;
	export let guess: { name: string; code: string };
	let loading = true;

	// import { map, tileLayer } from 'leaflet';
	import * as L from 'leaflet';
	import { onMount } from 'svelte';

	let map;
	let ctryLayer;
	let center;

	const addCtryToMap = async (ctryCode: string, style = {}) => {
		const res = await fetch(`./data/${ctryCode.toLowerCase()}.geo.json`);
		const data = await res.json();
		return L.geoJSON(data, {
			style: { weight: 2, color: '#f8fafc', fill: true, ...style },
		}).addTo(map);
	};

	onMount(async () => {
		map = L.map('map');
		ctryLayer = await addCtryToMap(ctryCode);
		center = ctryLayer.getBounds().getCenter();
		map.fitBounds(ctryLayer.getBounds());
		loading = false;
	});

	$: if (guess) {
		if (guess.code === ctryCode) {
			alert(`omg yass bro it's ${guess.name}`);
			const layer = L.tileLayer(
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
					map.flyToBounds(ctryLayer.getBounds().pad(1), 3, { duration: 2 });
				});
			});
		}
		guess = undefined;
	}
</script>

<div class="h-full w-full flex justify-center items-center p-2 bg-transparent" id="map">
	{#if loading}<p class="text-slate-100">Loading map...</p>{/if}
</div>

<style>
	@import 'leaflet/dist/leaflet.css';
</style>
