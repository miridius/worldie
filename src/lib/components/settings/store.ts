import { createLocalStorageStore } from '$lib/storage';

export interface Settings {
	'style.weight': number;
	'style.fill': boolean;
	theme: 'auto' | 'dark' | 'light';
	flyTimeMs: number;
	pauseTimeMs: number;
}

export const DEFAULT_SETTINGS: Settings = {
	'style.weight': 2,
	'style.fill': true,
	theme: 'auto',
	flyTimeMs: 1500,
	pauseTimeMs: 1500,
};

// Create a store that starts with either the stored value or the default.
export const settings$ = createLocalStorageStore('settings', DEFAULT_SETTINGS);
