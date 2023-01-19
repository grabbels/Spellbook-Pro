<script>
	import { pagetitle } from '../components/stores.js';
	$pagetitle = "Home";
	import Section from '../components/section.svelte';
	import Spellsheet from '../components/spellsheet.svelte';

	// let menu = 'menu';
</script>

<Section name="title">
	<!-- <h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
</Section>
<Section name="spellsheet">
	<Spellsheet />
</Section>
