<script>
	import {
		activeLevels,
		bookmarksOpen,
		filtersOpen,
		pagetitle
	} from '../components/stores/stores.js';
	import { activeSpells, userPrefs } from '../components/stores/stores-persist.js';
	$pagetitle = 'Home';
	let innerWidth;
	import Section from '../components/section.svelte';
	import Spellsheet from '../components/spellsheet.svelte';
	import Filters from '../components/filters.svelte';
	import Tabs from '../components/spellbooktabs.svelte';
	import Handles from '../components/handles.svelte';
</script>

{#if innerWidth < 1025}
	<Handles/>
{/if}
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

<svelte:window bind:innerWidth />
