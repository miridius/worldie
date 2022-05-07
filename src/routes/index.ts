import { memoize, toIsoDate } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import { createHash } from 'crypto';
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

// determinisitically get a pseudo-random integer (between 0 and 2^52) from a string
const intHashOfString = (str: string) => {
	// JS numbers have 52 bits of precision so we only need the first 52 bits = 13 hex digits
	const hashStr = createHash('md5').update(str).digest('hex').substring(0, 13);
	return parseInt(hashStr, 16);
};

const challengeStartdate = '2022-05-07';

const _selectCtryForDate = (isoDate: string, unseenCtryCodes = [...ctryCodes]) => {
	if (isoDate > challengeStartdate) {
		// create a new Date and step it back one day
		const previous = new Date(isoDate);
		previous.setDate(previous.getDate() - 1);
		// recurse for the side effect of removing already seen countries
		_selectCtryForDate(toIsoDate(previous), unseenCtryCodes);
	}
	if (unseenCtryCodes.length === 0) {
		// every country has been chosen already, time to start fresh
		unseenCtryCodes = [...ctryCodes];
	}
	const idx = intHashOfString(isoDate) % unseenCtryCodes.length;
	return unseenCtryCodes.splice(idx, 1)[0];
};

const selectCtryForDate = memoize(_selectCtryForDate);

export const get: RequestHandler = () => {
	const isoDate = toIsoDate(new Date());
	const code = selectCtryForDate(isoDate);
	const ctry = countryLookup[code];
	return {
		body: { isoDate, countryList, answer: { code, name: ctry.name.common }, borders: ctry.borders },
	};
};
