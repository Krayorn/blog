/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				neony: "#ffdb4b",
				neonr: "#d9453f",
				neonb: "#07f0ff",
				red: "#7c2626",
				dark: "#071016",
				green: "#21c382", // blog value, not for cyberpunk

			},
			boxShadow: {
				'neon': '0 0 10px 0 #ffdb4b',
				'neonr': '0 0 15px 3px #d9453f',
			}
		},
	},
	plugins: [],
}
