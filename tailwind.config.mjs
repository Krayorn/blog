/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				neony: "#ffdb4b",
				neonr: "#d9453f",
				red: "#7c2626"
			},
			boxShadow: {
				'neon': '0 0 10px 0 #ffdb4b',
			}
		},
	},
	plugins: [],
}
