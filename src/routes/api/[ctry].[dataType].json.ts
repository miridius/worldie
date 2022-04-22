import type { RequestHandler } from '@sveltejs/kit';
import { readFile } from 'fs/promises';
import countries from 'world-countries/dist/countries.json';

const ctryData = Object.fromEntries(countries.map((c) => [c.cca3, c]));

export const get: RequestHandler = async ({ params }) => {
	if (params.dataType === 'data') {
		return { body: ctryData[params.ctry.toUpperCase()] };
	} else {
		const data = await readFile(
			`node_modules/world-countries/data/${params.ctry.toLowerCase()}.${params.dataType}.json`,
			'utf-8',
		);
		return { body: JSON.parse(data) };
	}
};
