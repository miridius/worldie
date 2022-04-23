import type { RequestHandler } from '@sveltejs/kit';
import countriesData from 'world-countries/dist/countries.json';

const countries = countriesData.map((ctry) => ({ name: ctry.name.common, code: ctry.cca3 }));

const ctryCodes = countriesData.filter((c) => c.area > 1000).map((c) => c.cca3);

export const get: RequestHandler = () => {
	const ctryCode = ctryCodes[Math.floor(Math.random() * ctryCodes.length)];
	return { body: { countries, ctryCode } };
};
