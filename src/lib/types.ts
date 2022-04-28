export interface Country {
	name: string;
	code: string;
}

export interface Guess extends Country {
	correct: boolean;
	close: boolean;
}
