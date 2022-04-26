import type { Map as LeafletMap, GeoJSON } from 'leaflet';

// this needs to be imported dynamically because it crashes if imported on the server
let L: typeof import('leaflet/index');

export default class Map {
	map: LeafletMap;
	targetCtry: GeoJSON;

	// this logic can't be in the constructor because it is async
	async init(elementId: string, targetCtryCode: string) {
		if (!L) L = await import('leaflet');
		this.map = L.map(elementId, { attributionControl: false, zoomSnap: 0.1 });
		this.targetCtry = await this.addCtry(targetCtryCode);
		this.map.fitBounds(this.targetCtry.getBounds());
		return this;
	}

	showWin(ctryName: string) {
		this.showFullMap();
		this.targetCtry.setStyle({ color: '#10b981' }).bringToFront().bindPopup(ctryName);
	}

	async showWrongGuess(ctryCode: string, ctryName: string) {
		const layer = (await this.addCtry(ctryCode, '#ef4444')).bindPopup(ctryName);
		this.targetCtry.bringToFront();
		this.map.flyToBounds(this.targetCtry.getBounds().extend(layer.getBounds()));
		this.map.once('moveend', async () => {
			await new Promise((r) => setTimeout(r, 1000));
			this.map.flyToBounds(this.targetCtry.getBounds().pad(0.5));
		});
	}

	private async addCtry(ctryCode: string, color = '#f8fafc') {
		const data = await fetch(`./data/${ctryCode.toLowerCase()}.geo.json`)
			.then((res) => res.json())
			.catch(alert);
		return L.geoJSON(data, { style: { weight: 2, color } }).addTo(this.map);
	}

	private showFullMap() {
		L.tileLayer(
			'https://tile.tracestrack.com/en/{z}/{x}/{y}.png?key=1c9009346d9c00c44c84ef373ba739a4',
			{ opacity: 0.5 },
		).addTo(this.map);
	}
}
