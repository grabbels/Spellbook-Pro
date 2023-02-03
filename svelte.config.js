import adapter from '@sveltejs/adapter-vercel';
import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({
		postcss: {
			plugins: [autoprefixer()]
		}
	}),
	kit: {
		adapter: adapter()

		// vite: {
		// 	define: {
		// 		'process.env': process.env
		// 	}
		// }
	}
};

export default config;
