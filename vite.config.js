import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	kit: {
		// adapter: adapter()

		vite: {
			optimizeDeps: {
				entries: []
			},
			define: {
				'process.env': process.env
			}
		}
	}
};

export default config;
