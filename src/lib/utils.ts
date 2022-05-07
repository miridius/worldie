export const sleep = async (ms: number) => new Promise((r) => setTimeout(r, ms));

export const debugLog =
	(label: string) =>
	<T>(x: T) => (console.debug(label + ':', x), x);

export const memoize = <A extends unknown[], R>(f: (...a: A) => R) => {
	const cache: Record<string, R> = {};
	return (...a: A): R => {
		const key = JSON.stringify(a);
		return key in cache ? cache[key] : (cache[key] = f(...a));
	};
};

// get the ISO string for a date, without the time component
export const toIsoDate = (date: Date) => date.toISOString().split('T')[0];
