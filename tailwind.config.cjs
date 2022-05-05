const colors = require('tailwindcss/colors');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.neutral,
			red: colors.red,
			yellow: colors.amber,
			green: colors.emerald,
			blue: colors.sky,
		},
		extend: {
			fontFamily: {
				display: ['DM Serif Display', 'Times New Roman', 'Times', 'serif'],
			},
		},
	},

	plugins: [],
};

module.exports = config;
