<svelte:options accessors={true}/>
<script>
	import { fade, scale } from 'svelte/transition';
	import { removeFilters } from './functions/globalfunctions.svelte';
	import { filters, actionFilter, rangeFilter, searchFilter, saveFilter, bookmarksOpen, summaryOpen } from './stores/stores';
	import { activeSpells } from './stores/stores-persist';
	import { clickOutside } from './functions/clickOutside.js';
	let actionFilterArray = [];
	let rangeFilterArray = [];
	let saveFilterArray = [];
	let filtersOpen = false;
	$: $activeSpells, collectFilters();
	$: filterSpells($actionFilter, $rangeFilter, $searchFilter, $saveFilter);
	function collectFilters() {
		actionFilterArray = [];
		rangeFilterArray = [];
		saveFilterArray = [];
		for (let i = 0; i < $activeSpells.length; i++) {
			let description = $activeSpells[i].description.toLowerCase();
			let range = $activeSpells[i].range.toLowerCase();
			let action = $activeSpells[i].casting_time.toLowerCase();
			let save = $activeSpells[i].save;
			if (range.includes('self') && !rangeFilterArray.includes('self')) {
				rangeFilterArray.push('self');
			}
			if (range.includes('touch') && !rangeFilterArray.includes('touch')) {
				rangeFilterArray.push('touch');
			}
			if (range.includes('feet') && !rangeFilterArray.includes('range')) {
				rangeFilterArray.push('range');
			}
			if (action.toLowerCase().includes('bonus') && !actionFilterArray.includes('bonus')) {
				actionFilterArray.push('bonus');
			}
			if (action.toLowerCase().includes('1 action') && !actionFilterArray.includes('1 action')) {
				actionFilterArray.push('action');
			}
			if (action.toLowerCase().includes('reaction') && !actionFilterArray.includes('reaction')) {
				actionFilterArray.push('re-action');
			}
			if (save && !saveFilterArray.includes(save)) {
				saveFilterArray.push(save);
			}
		}
	}

	function handleClickOutside() {
		console.log('outside');
	}

	$: $activeSpells, filterSpells();

	function filterSpells() {
		$summaryOpen = false;
		if (!$actionFilter && !$rangeFilter && !$searchFilter && !$saveFilter) {
			$filters = false;
			for (let i = 0; i < $activeSpells.length; i++) {
				$activeSpells[i].display = true;
			}
		} else {
			$filters = true;
		}
		$activeSpells.filter((item) => {
			if ($actionFilter || $rangeFilter || $searchFilter || $saveFilter) {
				($actionFilter ? item.casting_time.toLowerCase().includes($actionFilter) : true) &&
				($rangeFilter ? item.range.toLowerCase().includes($rangeFilter) : true) &&
				($saveFilter ? item.save == $saveFilter : true) &&
				($searchFilter ? item.name.toLowerCase().includes($searchFilter) : true)
					? (item.display = true)
					: (item.display = false);
			}
		});
		$activeSpells = $activeSpells;
	}
</script>

<button class="filters_handle handle" class:open={$bookmarksOpen ? true : filtersOpen ? true : ''} on:click={() => (filtersOpen = true)}
	><div><i class="ri-filter-2-fill" /></div></button
>

<div
	class:open={filtersOpen}
	class="filters_wrapper panel"
	class:active={$filters}
	use:clickOutside
	on:outsideclick={() => (filtersOpen = false)}
>
	<button on:click={() => (filtersOpen = false)} class="down"
		><i class="ri-arrow-down-s-line" /></button
	>
	<h3 class="button"><i class="ri-filter-2-line" /> Filters</h3>
	<div class="filter" data-filter="search">
		<input id="spellbooksearch" bind:value={$searchFilter} type="text" placeholder="Search spellbook..." />
	</div>
	{#if actionFilterArray.length > 0}
		<div class="filter castingtime" data-filter="castingtime">
			<button disabled="disabled" class="subtle" class:active={$actionFilter}
				><i class={$actionFilter ? 'ri-flashlight-fill' : 'ri-flashlight-line'} /></button
			>
			{#if actionFilterArray.includes('action')}
				<button
					class="subtle"
					on:click={() =>
						$actionFilter === 'action' ? ($actionFilter = '') : ($actionFilter = 'action')}
					class:selected={$actionFilter === 'action'}>Action</button
				>
			{/if}
			{#if actionFilterArray.includes('bonus')}
				<button
					class="subtle"
					on:click={() =>
						$actionFilter === 'bonus' ? ($actionFilter = '') : ($actionFilter = 'bonus')}
					class:selected={$actionFilter === 'bonus'}>Bonus</button
				>
			{/if}

			{#if actionFilterArray.includes('re-action')}
				<button
					class="subtle"
					on:click={() =>
						$actionFilter === 'reaction' ? ($actionFilter = '') : ($actionFilter = 'reaction')}
					class:selected={$actionFilter === 'reaction'}>Reaction</button
				>
			{/if}
		</div>
	{/if}
	{#if rangeFilterArray.length > 0}
		<div class="filter range" data-filter="range">
			<button disabled="disabled" class="subtle" class:active={$rangeFilter}
				><i class="ri-arrow-right-up-line" /></button
			>
			{#if rangeFilterArray.includes('self')}
				<button
					class="subtle"
					on:click={() => ($rangeFilter === 'self' ? ($rangeFilter = '') : ($rangeFilter = 'self'))}
					class:selected={$rangeFilter === 'self'}>Self</button
				>
			{/if}
			{#if rangeFilterArray.includes('touch')}
				<button
					class="subtle"
					on:click={() =>
						$rangeFilter === 'touch' ? ($rangeFilter = '') : ($rangeFilter = 'touch')}
					class:selected={$rangeFilter === 'touch'}>Touch</button
				>
			{/if}

			{#if rangeFilterArray.includes('range')}
				<button
					class="subtle"
					on:click={() => ($rangeFilter === 'feet' ? ($rangeFilter = '') : ($rangeFilter = 'feet'))}
					class:selected={$rangeFilter === 'feet'}>Range</button
				>
			{/if}
		</div>
	{/if}
	<!-- {#if $rangeFilter == 'feet'}
	<div class="filter distance" transition:scale={{ duration: 200 }}>
		<input type="range">
	</div>
	{/if} -->
	{#if saveFilterArray.length > 0}
		<div class="filter save" data-filter="save">
			<button disabled="disabled" class="subtle" class:active={$saveFilter}
				><i class="ri-lifebuoy-line" /></button
			>
			{#each saveFilterArray as save}
				<button
					class="subtle"
					on:click={() => ($saveFilter === save ? ($saveFilter = '') : ($saveFilter = save))}
					class:selected={$saveFilter === save}>{save}</button
				>
			{/each}
		</div>
	{/if}
	<div class="filter remove">
		{#if $filters}
			<button
				transition:fade={{ duration: 100 }}
				on:click={() => removeFilters()}
				class="outline alt"><i class="ri-close-line" /></button
			>{/if}
	</div>
</div>

<style lang="scss">
	.filters_wrapper {
		width: 100%;
		margin-bottom: 0;
		padding: 1rem 2rem 1rem 1rem;
		display: flex;
		flex-wrap: nowrap;
		position: relative;
		overflow-x: auto;
		// top: 0.5rem;
		gap: 1rem;
		border: 2px solid transparent;
		background-color: var(--translucentdark);
		&.active {
			border-color: var(--lightblue);
		}
		@media only screen and (max-width: 1024px) {
			position: fixed;

			left: 0;
			right: 0;
			bottom: 0;
			z-index: 20;
			flex-wrap: wrap;
			backdrop-filter: blur(20px);
			border-radius: 12px 12px 0 0;
			transform: translateY(100%);
			transition: 0.3s;
			&.open {
				transform: translateY(0);
			}
		}
		.down {
			display: none;
			@media only screen and (max-width: 1024px) {
				display: block;
				position: absolute;
				top: 0.7rem;
				right: 1rem;
				i {
					color: white;
					font-size: 1.7rem;
				}
			}
		}
		h3 {
			font-size: 1.1rem;
			opacity: 0.8;
			display: inline-block;
			height: auto;
			align-self: center;
			padding-left: 0.5rem;
			margin: 0;
			white-space: nowrap;

		}
		.filter {
			display: flex;
			align-items: center;
			position: relative;
			@media only screen and (max-width: 1024px) {
				width: 100%;
			}
			input,
			button {
				margin-bottom: 0;
				height: 100%;
				i {
					transition: 0.1s;
				}
				&.active {
					i {
						color: var(--lightblue);
					}
				}
			}
			input {
				background-color: var(--moretranslucent);
				min-width: 230px;
				@media only screen and (max-width: 1024px) {
					width: 100%;
				}
			}
			&.castingtime,
			&.range,
			&.save {
				button {
					margin: 0;
					border-radius: 0;
					&.selected {
						background-color: var(--lightblue);
						border-color: var(--lightblue);
					}
					&:first-child {
						border-radius: 6px 0 0 6px;
						pointer-events: none;
						padding-right: 0.2rem;
					}
					&:last-child {
						border-radius: 0 6px 6px 0;
					}
				}
			}
			&.remove {
				button {
					padding: 0.35rem 0.8rem;
					i {
						margin: 0;
					}
				}
			}
		}
	}
</style>
