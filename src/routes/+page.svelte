<script>
	import { pagetitle } from '../components/stores.js';
	import { activeSpells } from '../components/stores-persist.js';
	$pagetitle = 'Home';
	import Section from '../components/section.svelte';
	import Spellsheet from '../components/spellsheet.svelte';
	import Filters from '../components/filters.svelte';
	// let menu = 'menu';
</script>
<Section name="filters">
	{#if $activeSpells.length > 0}
		<Filters/>
	{/if}
</Section>
<Section name="spellsheet">
	<Spellsheet />
</Section>
