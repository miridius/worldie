import type { RequestHandler } from '@sveltejs/kit';
import type { Countries } from 'world-countries';
import _countriesData from 'world-countries/dist/countries.json';
const countriesData = _countriesData as unknown as Countries;

const useOfficialNames = new Set(['USA']);

const countryList = countriesData.map((ctry) => ({
	name: useOfficialNames.has(ctry.cca3) ? ctry.name.official : ctry.name.common,
	code: ctry.cca3,
}));

const countryLookup = Object.fromEntries(countriesData.map((c) => [c.cca3, c]));

const ctryCodes = countriesData.filter((c) => c.area > 1000).map((c) => c.cca3);

export const get: RequestHandler = () => {
	const code = ctryCodes[Math.floor(Math.random() * ctryCodes.length)];
	const ctry = countryLookup[code];
	return { body: { countryList, answer: { code, name: ctry.name.common }, borders: ctry.borders } };
};
