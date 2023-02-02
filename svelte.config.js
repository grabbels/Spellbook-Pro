import adapter from '@sveltejs/adapter-vercel';
import sveltePreprocess from 'svelte-preprocess';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess(),
	kit: {
		adapter: adapter(),
		
		// vite: {
		// 	define: {
		// 		'process.env': process.env
		// 	}
		// }
	}
};

export default config;
