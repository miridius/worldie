import type { Map as LeafletMap, GeoJSON } from 'leaflet';
import colors from 'tailwindcss/colors';

// this needs to be imported dynamically because it crashes if imported on the server
let L: typeof import('leaflet/index');

export default class Map {
	map!: LeafletMap;
	targetCtry!: GeoJSON;

	// this logic can't be in the constructor because it is async
	async init(elementId: string, targetCtryCode: string) {
		if (!L) L = await import('leaflet');
		this.map = L.map(elementId, { attributionControl: false, zoomSnap: 0.1 });
		this.targetCtry = await this.addCtry(targetCtryCode, colors.blue['500']);
		this.map.fitBounds(this.targetCtry.getBounds().pad(0.1));
		return this;
	}

	private async addCtry(ctryCode: string, color: string) {
		const data = await fetch(`./data/${ctryCode.toLowerCase()}.geo.json`)
			.then((res) => res.json())
			.catch(alert);
		return L.geoJSON(data, { style: { weight: 4, color, fill: false } }).addTo(this.map);
	}

	async showWrongGuess(ctryCode: string, ctryName: string) {
		const layer = (await this.addCtry(ctryCode, colors.red['500'])).bindPopup(ctryName);
		this.map.flyToBounds(this.targetCtry.getBounds().extend(layer.getBounds()), { duration: 1.5 });
		this.map.once('moveend', async () => {
			await new Promise((r) => setTimeout(r, 1500));
			this.targetCtry.bringToFront();
			this.map.flyToBounds(this.targetCtry.getBounds().pad(0.5), { duration: 1.5 });
		});
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
