import { settings$ } from '$lib/components/settings/store';
import type { Country, Guess } from '$lib/types';
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
	yellow: { '500': '#eab308' },
	amber: { '500': '#f59e0b' },
	emerald: { '500': '#10b981' },
};

let FLY_MS: number, PAUSE_MS: number;
settings$.subscribe((v) => ({ flyTimeMs: FLY_MS, pauseTimeMs: PAUSE_MS } = v));

const style$ = derived(settings$, (s) => ({ weight: s['style.weight'], fill: s['style.fill'] }));

// this needs to be imported dynamically because it crashes if imported on the server
let L: typeof import('leaflet/index');

type CountryLayer = { layer: GeoJSON; marker: Marker };

export default class Map {
	private map!: LeafletMap;
	private targetLayer!: CountryLayer;
	private guessLayers: CountryLayer[] = [];

	constructor(private answer: Country, private selected: number) {}

	// this logic can't be in the constructor because it is async
	async init(elementId: string) {
		if (!L) L = await import('leaflet');
		this.map = L.map(elementId, { attributionControl: false, zoomSnap: 0.1 });
		const layer = await this.addCtry(this.answer.code, colors.sky['500']);
		this.targetLayer = { layer, marker: this.addMarker(layer, '?') };
		this.map.fitBounds(this.targetBounds, { padding: [0, 128] });
		this.targetLayer.marker.openTooltip();
		return this;
	}

	setGuesses(guesses: Guess[]) {
		this.renderGuesses(guesses);
	}

	setSelected(selected: number) {
		this.selected = selected;
		this.flyToSelected();
	}

	won() {
		this.targetLayer.layer.setStyle({ color: '#10b981' });
	}

	gameOver() {
		this.showFullMap();
		this.targetLayer.marker.unbindTooltip();
	}

	private get targetBounds() {
		return this.targetLayer.layer.getBounds().pad(0.1);
	}

	private async addCtry(ctryCode: string, color: string) {
		const data = await fetch(`./data/${ctryCode.toLowerCase()}.geo.json`)
			.then((res) => res.json())
			.catch(alert);
		const layer = L.geoJSON(data).addTo(this.map);
		style$.subscribe((style) => layer.setStyle({ color, ...style }));
		return layer;
	}

	private async renderGuesses(guesses: Guess[]) {
		guesses.forEach(async (guess, i) => {
			if (!this.guessLayers[i] && guess.code !== this.answer.code) {
				await this.addWrongGuess(guess);
			}
		});
	}

	private async addWrongGuess({ code, name, close }: Guess) {
		const layer = await this.addCtry(code, close ? colors.amber[500] : colors.red['500']);
		const marker = this.addMarker(layer, name);
		this.guessLayers.push({ layer, marker });
		if (this.selected === this.guessLayers.length - 1) await this.flyToSelected();
	}

	private async flyToSelected(): Promise<void> {
		const guess = this.guessLayers[this.selected];
		if (guess) {
			this.targetLayer.marker.closeTooltip();
			const bounds = guess.layer.getBounds().pad(0.1);
			// include the target in the frame as well but only if min zoom level supports it
			if (this.map.getMinZoom() <= 2) bounds.extend(this.targetBounds);
			await this.fly(bounds);
			guess.marker.openTooltip();
		} else {
			this.showTarget();
		}
	}

	private async showTarget(): Promise<void> {
		this.targetLayer.layer.bringToFront();
		this.hideAllTooltips();
		await this.fly(this.targetBounds);
		this.targetLayer.marker.openTooltip();
	}

	private fly(bounds: LatLngBounds, options: FitBoundsOptions = {}): Promise<void> {
		return new Promise((resolve) => {
			this.map.flyToBounds(bounds, { duration: FLY_MS / 1000, padding: [0, 128], ...options });
			this.map.once('moveend', () => resolve());
		});
	}

	private hideAllTooltips() {
		this.guessLayers.forEach(({ marker }) => marker.closeTooltip());
	}

	private addMarker(feature: FeatureGroup, title: string) {
		return L.marker(feature.getBounds().getCenter(), { icon: L.divIcon({ className: 'hidden' }) })
			.addTo(this.map)
			.bindTooltip(title);
	}

	private showFullMap() {
		this.map.setMinZoom(3);
		this.map.setView(this.targetBounds.getCenter(), Math.max(3, this.map.getZoom()));
		L.tileLayer(
			'https://tile.tracestrack.com/en/{z}/{x}/{y}.png?key=1c9009346d9c00c44c84ef373ba739a4',
			{ opacity: 1 },
		).addTo(this.map);
	}
}
