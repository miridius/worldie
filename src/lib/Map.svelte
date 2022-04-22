<script lang="ts">
	import { Map, View } from 'ol';
	import { boundingExtent, extend, type Extent } from 'ol/extent';
	import GeoJSON from 'ol/format/GeoJSON';
	import TileLayer from 'ol/layer/Tile';
	import VectorLayer from 'ol/layer/Vector';
	import { fromLonLat } from 'ol/proj';
	import OSM from 'ol/source/OSM';
	import VectorSource from 'ol/source/Vector';
	import Fill from 'ol/style/Fill';
	import Stroke from 'ol/style/Stroke';
	import Style from 'ol/style/Style';
	import { onMount } from 'svelte';

	let loading = true;
	export let ctry: string;
	export let guess: { name: string; code: string };

	const ctrySource = async (ctry: string) =>
		fetch(`./api/${ctry}.geo.json`)
			.then((res) => res.text())
			.then((text) => new GeoJSON().readFeatures(text, { featureProjection: 'EPSG:3857' }))
			.then((features) => new VectorSource({ features }));

	let map: Map;
	let mainSource: VectorSource;
	let mainExtent: Extent;

	// const fill = new Fill({ color: 'rgb(248, 250, 252, 0.5)' });
	const fill = new Fill({ color: 'rgb(100, 116, 139)' });
	const stroke = new Stroke({ color: 'rgb(248 250 252)', width: 1.25 });

	onMount(async () => {
		mainSource = await ctrySource(ctry);
		mainExtent = mainSource.getExtent();
		const layer = new VectorLayer({ source: mainSource, style: new Style({ fill, stroke }) });
		const view = new View({ extent: mainExtent, showFullExtent: true });
		map = new Map({ target: 'map', layers: [layer], view });
		view.fit(mainExtent);
		loading = false;
	});

	$: if (guess) {
		if (guess.code === ctry) {
			alert(`omg yass bro it's ${guess.name}`);
			const osmLayer = new TileLayer({ source: new OSM(), opacity: 0.5 });
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
