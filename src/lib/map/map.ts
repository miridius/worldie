import type {
	FeatureGroup,
	FitBoundsOptions,
	GeoJSON,
	LatLngBounds,
	Map as LeafletMap,
	Marker,
} from 'leaflet';
import { sleep } from '../utils';

const colors = {
	sky: { '500': '#0ea5e9' },
	red: { '500': '#ef4444' },
	emerald: { '500': '#10b981' },
};

const FLY_MS = 1500;
const PAUSE_MS = 1500;

// this needs to be imported dynamically because it crashes if imported on the server
let L: typeof import('leaflet/index');

type Guess = { layer: GeoJSON; marker: Marker };

export default class Map {
	map!: LeafletMap;
	targetCtry!: GeoJSON;
	guesses: Guess[] = [];

	// this logic can't be in the constructor because it is async
	async init(elementId: string, targetCtryCode: string) {
		if (!L) L = await import('leaflet');
		this.map = L.map(elementId, { attributionControl: false, zoomSnap: 0.1 });
		this.targetCtry = await this.addCtry(targetCtryCode, colors.sky['500']);
		this.map.fitBounds(this.targetCtry.getBounds().pad(0.1));
		return this;
	}

	private async addCtry(ctryCode: string, color: string) {
		const data = await fetch(`./data/${ctryCode.toLowerCase()}.geo.json`)
			.then((res) => res.json())
			.catch(alert);
		return L.geoJSON(data, { style: { weight: 4, color, fill: false } }).addTo(this.map);
	}

	async addWrongGuess(ctryCode: string, ctryName: string) {
		const layer = await this.addCtry(ctryCode, colors.red['500']);
		const marker = this.addMarker(layer, ctryName);
		this.guesses.push({ layer, marker });
		await this.showGuess({ layer, marker });
		await sleep(PAUSE_MS);
		await this.showTarget();
	}

	async showGuess(guess: Guess): Promise<void> {
		if (!guess) return;
		await this.fly(this.targetCtry.getBounds().extend(guess.layer.getBounds()));
		guess.marker.openTooltip();
	}

	async showTarget(): Promise<void> {
		this.targetCtry.bringToFront();
		this.hideAllTooltips();
		await this.fly(this.targetCtry.getBounds().pad(0.5));
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

	showWin(ctryName: string) {
		this.showFullMap();
		this.targetCtry?.setStyle({ color: '#10b981' }).bringToFront().bindPopup(ctryName);
	}

	private showFullMap() {
		this.map.setMinZoom(3);
		this.map.setView(this.targetCtry.getBounds().getCenter(), Math.max(3, this.map.getZoom()));
		L.tileLayer(
			'https://tile.tracestrack.com/en/{z}/{x}/{y}.png?key=1c9009346d9c00c44c84ef373ba739a4',
			{ opacity: 0.5 },
		).addTo(this.map);
	}
}
