import adapter from '@sveltejs/adapter-static';
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
		adapter: adapter({ out: 'build' })
		// vite: {
		// 	define: {
		// 		'process.env': process.env
		// 	}
		// }
	}
};

export default config;
