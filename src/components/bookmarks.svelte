<script>
	import { activeLevels, bookmarksOpen, summaryOpen } from './stores/stores';
	import { clickOutside } from './functions/clickOutside.js';
	import { removeFilters } from './functions/globalfunctions.svelte';
</script>

{#if $activeLevels.length > 0}
	<button
		class="bookmarks_handle handle"
		class:open={$bookmarksOpen}
		on:click={() => ($bookmarksOpen = true)}><div><i class="ri-bookmark-fill" /></div></button
	>
{/if}
<div
id="bookmarks"
	class="bookmarks panel"
	class:open={$bookmarksOpen}
	use:clickOutside
	on:outsideclick={() => ($bookmarksOpen = false)}
>
	<a on:click={() => ($bookmarksOpen = false)} href="#top" class="bookmark"
		><div><i class="ri-bookmark-fill" /></div></a
	>
	{#if $activeLevels.length > 0}
		<a
			on:click={() => {
				removeFilters();
				setTimeout(() => {
					$summaryOpen = true;
					$bookmarksOpen = false;
				}, 1);
			}}
			href="#summary"
			class="bookmark"><div><i class="ri-list-check" /></div></a
		>
	{/if}
	{#each $activeLevels as level}
		<a on:click={() => ($bookmarksOpen = false)} href="#{level}" class="bookmark"
			><div>{level}</div></a
		>
	{/each}
</div>

<style lang="scss">
	.bookmarks {
		background-color: transparent;
		position: sticky;
		top: 1rem;
		width: 60px;
		padding: 0;
		height: auto;
		background-color: var(--translucentdark);
		border-radius: 6px;
		overflow-x: hidden;
		@media only screen and (max-width: 1024px) {
			opacity: 0;
			transition: 0.15s;
			&.open {
				opacity: 1;
			}
		}
		.bookmark {
			display: inline-block;
			text-decoration: none;
			width: 100%;
			height: 60px;
			color: var(--white);
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1.2rem;
			border-radius: 6px;
			i {
				font-size: 1.5rem;
			}
		}
		a {
			&:hover {
				background-color: var(--primary);
			}
		}
	}
</style>
