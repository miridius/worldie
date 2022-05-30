import { writable } from 'svelte/store';

export const createLocalStorageStore = <T>(key: string, defaultValueFn: () => T) => {
	// Namespace the key to prevent clash with other apps on localhost
	key = `worldie.${key}`;
	// Get and parse the value out of storage on load, fall back to the default
	const init: T = JSON.parse(globalThis.localStorage?.getItem(key) || 'null') ?? defaultValueFn();
	// Create a store with this starting value
	const store = writable<T>(init);
	// Anytime the store changes, serialize it back to storage.
	store.subscribe((v) => globalThis.localStorage?.setItem(key, JSON.stringify(v)));
	// return the store
	return store;
};
