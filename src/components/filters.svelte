<script>
	import { fade, scale } from 'svelte/transition';
	import { removeFilters } from './globalfunctions.svelte';
	import { filters, actionFilter, rangeFilter, searchFilter, saveFilter } from './stores';
	import { activeSpells } from './stores-persist';
	let actionFilterArray = [];
	let rangeFilterArray = [];
	let saveFilterArray = [];
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
				saveFilterArray.push(save)
			}
		}
	}

	function filterSpells() {
		if (!$actionFilter && !$rangeFilter && !$searchFilter && !$saveFilter) {
			$filters = false;
			for (let i = 0; i < $activeSpells.length; i++) {
				$activeSpells[i].display = true;
			}
		} else {
			$filters = true;
		}
		console.log($saveFilter)
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

<div class="filters_wrapper panel">
	<h3 style="font-size: 1.1rem; opacity: .8; display: inline-block; height:auto; align-self:center ">Filters</h3>
	<div class="filter" data-filter="search">
		<input bind:value={$searchFilter} type="text" placeholder="Search spellbook..." />
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
		position: sticky;
		top: 0.5rem;
		gap: 1rem;
		background-color: var(--translucentdark);
		.filter {
			display: flex;
			align-items: center;
			position: relative;
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
