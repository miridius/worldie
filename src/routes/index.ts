import type { RequestHandler } from '@sveltejs/kit';
import countries from 'world-countries/dist/countries.json';

const ctryCodes = countries.filter((c) => c.area > 1000).map((c) => c.cca3);

export const get: RequestHandler = () => ({
	body: {
		ctry: ctryCodes[Math.floor(Math.random() * ctryCodes.length)],
		data: countries.map((ctry) => ({ name: ctry.name.common, code: ctry.cca3 })),
	},
});
