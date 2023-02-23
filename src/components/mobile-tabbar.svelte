<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import {
		handleLoad,
		newBook,
		sideMenuOpenClose,
		topMenuOpenClose
	} from './functions/globalfunctions.svelte';
	import { pagetitle, tabsPanelOpen } from './stores/stores';
	import Tab from './tab.svelte';
</script>

<!-- {#key $tabsPanelOpen && $page} -->
<div class="ui-tabbar" transition:slide={{ duration: 200 }} class:light={$tabsPanelOpen}>
	{#if $tabsPanelOpen === true}
		<Tab on:click={()=> handleLoad()} icon="ri-folder-open-line">Open</Tab>
		<Tab on:click={() => ($tabsPanelOpen = false)} icon="ri-arrow-down-s-line" />
		<Tab
			on:click={() => {
				newBook();
				$tabsPanelOpen = false;
			}}
			icon="ri-health-book-line">New</Tab
		>
	{:else if $pagetitle == 'Home'}
		<Tab on:click={sideMenuOpenClose} icon="ri-add-line">Add spells</Tab>
		<Tab on:click={topMenuOpenClose} icon="ri-menu-4-line">Menu</Tab>
		<Tab on:click={() => goto('/browse')} icon="ri-dashboard-fill">Browse</Tab>
	{:else if $pagetitle == 'My account'}
		<Tab on:click={() => goto('/')} icon="ri-book-mark-line">Spellbook</Tab>
		<Tab on:click={topMenuOpenClose} icon="ri-menu-4-line">Menu</Tab>
		<Tab on:click={() => goto('/browse')} icon="ri-dashboard-fill">Browse</Tab>
	{:else}
		<Tab on:click={() => goto('/')} icon="ri-book-mark-line">Spellbook</Tab>
		<Tab on:click={topMenuOpenClose} icon="ri-menu-4-line">Menu</Tab>
		<Tab on:click={() => goto('/account')} icon="ri-contacts-book-2-line">Account</Tab>
	{/if}
</div>

<!-- {/key} -->
<style lang="scss">
	.ui-tabbar {
		box-shadow: 0 0px 10px rgba(10, 10, 10, 0.4);
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		min-height: var(--bottombarheight);
		background-color: var(--bg);
		z-index: 99;
		padding-bottom: max(env(safe-area-inset-bottom), .1rem);
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		transition: 0.3s;
		&.light {
			background-color: var(--moretranslucent);
			backdrop-filter: blur(20px);
			&:after {
				content: '';
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				position: absolute;
				z-index: -1;
				// background: linear-gradient(180deg, rgba(57,46,87,0) 0%, rgba(57,46,87,1) 94%);
			}
		}
	}
</style>
