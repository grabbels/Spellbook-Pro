<script>
	import { pagetitle } from '../components/stores/stores.js';
	import { activeSpells, userPrefs } from '../components/stores/stores-persist.js';
	$pagetitle = 'Home';
	import Section from '../components/section.svelte';
	import Spellsheet from '../components/spellsheet.svelte';
	import Filters from '../components/filters.svelte';
	import Tabs from '../components/tabs.svelte';

	// let menu = 'menu';
</script>

{#if $userPrefs.tabs != false}
	<Section name="tabs">
		<Tabs />
	</Section>
{/if}
{#if $userPrefs.filters != false}
	<Section name="filters">
		<Filters />
	</Section>
{/if}
<Section name="spellsheet">
	<Spellsheet />
</Section>
