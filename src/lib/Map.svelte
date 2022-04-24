<script lang="ts">
	import { Map, View } from 'ol';
	import { boundingExtent, extend, type Extent } from 'ol/extent.js';
	import GeoJSON from 'ol/format/GeoJSON.js';
	import TileLayer from 'ol/layer/Tile.js';
	import VectorLayer from 'ol/layer/Vector.js';
	import { fromLonLat } from 'ol/proj.js';
	import OSM from 'ol/source/OSM.js';
	import VectorSource from 'ol/source/Vector.js';
	import Fill from 'ol/style/Fill.js';
	import Stroke from 'ol/style/Stroke.js';
	import Style from 'ol/style/Style.js';
	import { onMount } from 'svelte';

	export let ctryCode: string;
	export let guess: { name: string; code: string };

	const ctrySource = async (ctry: string) =>
		fetch(`./data/${ctry.toLowerCase()}.geo.json`)
			.then((res) => res.text())
			.then((text) => new GeoJSON().readFeatures(text, { featureProjection: 'EPSG:3857' }))
			.then((features) => new VectorSource({ features, wrapX: false }));

	let loading = true;
	let map: Map;
	let mainSource: VectorSource;
	let mainExtent: Extent;

	const fill = new Fill({ color: 'rgb(100, 116, 139)' });
	const stroke = new Stroke({ color: 'rgb(248 250 252)', width: 1.25 });

	onMount(async () => {
		mainSource = await ctrySource(ctryCode);
		mainExtent = mainSource.getExtent();
		const layer = new VectorLayer({ source: mainSource, style: new Style({ fill, stroke }) });
		const view = new View({ extent: mainExtent, showFullExtent: true });
		map = new Map({ target: 'map', layers: [layer], view });
		view.fit(mainExtent);
		loading = false;
	});

	$: if (guess) {
		if (guess.code === ctryCode) {
			alert(`omg yass bro it's ${guess.name}`);
			const osmLayer = new TileLayer({
				source: new OSM({
					url: 'https://tile.tracestrack.com/en-name/{z}/{x}/{y}.png?key=1c9009346d9c00c44c84ef373ba739a4',
				}),
			});
			map.addLayer(osmLayer);
			map.getView().fit(mainExtent, { duration: 1000 });
			extend(mainExtent, boundingExtent([fromLonLat([-180, -180]), fromLonLat([180, 180])]));
		} else {
			ctrySource(guess.code)
				.then((source) => {
					map.addLayer(
						new VectorLayer({
							source,
							style: new Style({ stroke }),
							updateWhileAnimating: true,
							updateWhileInteracting: true,
						}),
					);
					extend(mainExtent, source.getExtent());
					map.getView().fit(extend(mainSource.getExtent(), source.getExtent()), { duration: 1000 });
				})
				.catch(alert);
		}
		guess = undefined;
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="h-full w-full flex justify-center items-center p-2" id="map">
	{#if loading}<p class="text-slate-100">Loading map...</p>{/if}
</div>

<style>
	@import 'ol/ol.css';
</style>
