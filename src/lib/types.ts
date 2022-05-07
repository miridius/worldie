export interface Country {
	name: string;
	code: string;
}

export interface Guess extends Country {
	correct: boolean;
	close: boolean;
}

export interface Game {
	isoDate: string;
	countryList: Country[];
	answer: Country;
	borders: string[];
	guesses: Guess[];
	current: number;
	selected: number;
	won: boolean;
	gameOver: boolean;
}
