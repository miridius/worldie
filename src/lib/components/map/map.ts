import { settings$ } from '$lib/components/settings/store';
import { sleep } from '$lib/utils';
import type {
	FeatureGroup,
	FitBoundsOptions,
	GeoJSON,
	LatLngBounds,
	Map as LeafletMap,
	Marker,
} from 'leaflet';
import { derived } from 'svelte/store';

const colors = {
	sky: { '500': '#0ea5e9' },
	red: { '500': '#ef4444' },
	emerald: { '500': '#10b981' },
};

let FLY_MS: number, PAUSE_MS: number;
settings$.subscribe((v) => ({ flyTimeMs: FLY_MS, pauseTimeMs: PAUSE_MS } = v));

const style$ = derived(settings$, (s) => ({ weight: s['style.weight'], fill: s['style.fill'] }));

// this needs to be imported dynamically because it crashes if imported on the server
let L: typeof import('leaflet/index');

type Country = { layer: GeoJSON; marker: Marker };

export default class Map {
	map!: LeafletMap;
	targetCtry!: Country;
	guesses: Country[] = [];

	// this logic can't be in the constructor because it is async
	async init(elementId: string, targetCtryCode: string) {
		if (!L) L = await import('leaflet');
		this.map = L.map(elementId, { attributionControl: false, zoomSnap: 0.1 });
		const layer = await this.addCtry(targetCtryCode, colors.sky['500']);
		this.targetCtry = { layer, marker: this.addMarker(layer, '?') };
		this.map.fitBounds(this.targetBounds);
		this.targetCtry.marker.openTooltip();
		return this;
	}

	get targetBounds() {
		return this.targetCtry.layer.getBounds().pad(0.1);
	}

	private async addCtry(ctryCode: string, color: string) {
		const data = await fetch(`./data/${ctryCode.toLowerCase()}.geo.json`)
			.then((res) => res.json())
			.catch(alert);
		// const layer = L.geoJSON(data, { style: { color, ...get(style) } }).addTo(this.map);
		const layer = L.geoJSON(data).addTo(this.map);
		style$.subscribe((style) => layer.setStyle({ color, ...style }));
		return layer;
	}

	async addWrongGuess(ctryCode: string, ctryName: string) {
		const layer = await this.addCtry(ctryCode, colors.red['500']);
		const marker = this.addMarker(layer, ctryName);
		this.guesses.push({ layer, marker });
		await this.showGuess(this.guesses.length - 1);
		await sleep(PAUSE_MS);
		await this.showTarget();
	}

	async showGuess(index: number): Promise<void> {
		const guess = this.guesses[index];
		if (guess) {
			this.targetCtry.marker.closeTooltip();
			const bounds = guess.layer.getBounds().pad(0.1);
			// include the target in the frame as well but only if min zoom level supports it
			if (this.map.getMinZoom() <= 2) bounds.extend(this.targetBounds);
			await this.fly(bounds);
			guess.marker.openTooltip();
		} else if (index > 0) {
			this.showTarget();
		}
	}

	async showTarget(): Promise<void> {
		this.targetCtry.layer.bringToFront();
		this.hideAllTooltips();
		await this.fly(this.targetBounds);
		this.targetCtry.marker.openTooltip();
	}

	private fly(bounds: LatLngBounds, options: FitBoundsOptions = {}): Promise<void> {
		return new Promise((resolve) => {
			this.map.flyToBounds(bounds, { duration: FLY_MS / 1000, ...options });
			this.map.once('moveend', () => resolve());
		});
	}

	hideAllTooltips() {
		this.guesses.forEach(({ marker }) => marker.closeTooltip());
	}

	private addMarker(feature: FeatureGroup, title: string) {
		return L.marker(feature.getBounds().getCenter(), { icon: L.divIcon({ className: 'hidden' }) })
			.addTo(this.map)
			.bindTooltip(title);
	}

	showWin() {
		this.targetCtry?.layer.setStyle({ color: '#10b981' }).bringToFront();
		this.gameOver();
	}

	gameOver() {
		this.showFullMap();
		this.targetCtry.marker.unbindTooltip();
	}

	private showFullMap() {
		this.map.setMinZoom(3);
		this.map.setView(this.targetBounds.getCenter(), Math.max(3, this.map.getZoom()));
		L.tileLayer(
			'https://tile.tracestrack.com/en/{z}/{x}/{y}.png?key=1c9009346d9c00c44c84ef373ba739a4',
			{ opacity: 0.5 },
		).addTo(this.map);
	}
}
