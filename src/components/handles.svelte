<script>
	import {
		activeLevels,
		bookmarksOpen,
		filters,
		filtersOpen,
		tabsPanelOpen
	} from './stores/stores';
</script>

<div class="handles" class:open={$bookmarksOpen ? true : $filtersOpen ? true : ''}>
	{#if $activeLevels.length > 0}
		<button class="filters handle" class:active={$filters} on:click={() => ($filtersOpen = true)}
			><div><i class="ri-filter-2-fill" /></div></button
		>
		<button class="bookmarks handle" on:click={() => ($bookmarksOpen = true)}
			><div><i class="ri-bookmark-fill" /></div></button
		>
	{/if}
	<button class="tabs handle" on:click={() => ($tabsPanelOpen = true)}
		><div><i class="ri-book-open-fill" /></div></button
	>
</div>

<style lang="scss">
	.handles {
		position: fixed;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		left: 0;
		bottom: calc(env(safe-area-inset-bottom) + 1rem + var(--bottombarheight));
		z-index: 10;
		transition: 0.15s;
		&.open {
			transform: translateX(-60px);
		}
		.handle {
			margin: 0;
			border-radius: 0 6px 6px 0;
			background-color: var(--translucent);
			backdrop-filter: blur(10px);
			width: 55px;
			height: 55px;

			padding: 0;

			* {
				pointer-events: none;
			}

			div {
				text-align: center;
				i {
					font-size: 1.6rem;
					color: var(--white);
					margin: 0;
				}
			}
			&.active {
				border: 2px solid var(--lightblue);
				border-left: 0;
			}
		}
	}
</style>
