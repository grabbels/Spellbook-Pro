<script>
	import { onMount } from 'svelte';
	import Close from './close.svelte';
	import {
		loadSpellsheetsByUserId,
		newBook,
		handleLoad,
		closeTab,
		scrollToTop
	} from './functions/globalfunctions.svelte';
	import Spell from './modal/spell.svelte';
	import { modalCall, savedSpellSheets, userId, tabsPanelOpen } from './stores/stores';
	import { activeSpells, openSpellbooks, activeTab, tabs } from './stores/stores-persist';
	let tabName = [];
	let allTabs = [];
	let dragOver;
	let tabsInner;
	let dragging = false;
	if (
		(!$activeTab && $openSpellbooks.length > 0) ||
		($activeTab == undefined && $openSpellbooks.length > 0)
	) {
		$activeTab = 0;
	} else if (!$openSpellbooks || !$openSpellbooks.length || $openSpellbooks.length < 1) {
		$activeTab = -1;
	}

	function setActiveTab(index) {
		$activeTab = index;
	}

	$: if ($tabsPanelOpen !== '' && tabsInner) {
		scrollTabsToTop();
	}

	function scrollTabsToTop() {
		tabsInner.scrollTo(0, 0);
	}

	function handleDrop(e) {
		dragOver = null;
		console.log(window.tabIndex);
		if (e.target.closest('label.tab')) {
			// $activeTab = -1
			// remove `from` item and store it
			var f = $openSpellbooks.splice(window.tabIndex, 1)[0];
			// insert stored item into position `to`
			// console.log(f);
			var el = e.target.closest('.tab');
			let newIndex = [...el.parentElement.children].indexOf(el) - 1;
			console.log(newIndex);
			$openSpellbooks.splice(newIndex, 0, f);
			$openSpellbooks = $openSpellbooks;
			$activeTab = newIndex;
			dragging = false;
			// $openSpellbooks = $openSpellbooks;
		}
	}
	function handleDragover(e) {
		// if (e.target.closest('.button')) {
		// 	console.log(e.target.closest('.button'));
		// }
	}
	// $: $activeSpells,
</script>

<div class:nohover={dragging} class:open={$tabsPanelOpen} class="tabs_wrapper">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<button
		class="tabs_panel_top"
		on:click={() => ($tabsPanelOpen !== true ? ($tabsPanelOpen = true) : ($tabsPanelOpen = false))}
	>
		{#if $tabsPanelOpen !== true}
			<button />
		{:else}
			<i class="ri-arrow-down-s-line" />
		{/if}
	</button>
	<div class="tabs_inner" bind:this={tabsInner}>
		<button class="tab label" on:click={handleLoad}>
			<div><i class="ri-book-open-line" /></div>
		</button>
		{#key $openSpellbooks}
			{#each $openSpellbooks as spellbook, index}
				<!-- {#if spellbook.name != undefined} -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<label
					for={spellbook.id}
					draggable="true"
					on:dragstart={(e) => {
						console.log(e);
						window.tabIndex = index;
						dragging = true;
					}}
					on:dragexit={(e) => {
						if (e.target.closest('.tab')) {
							dragOver = null;
						}
					}}
					on:dragenter={(e) => {
						if (e.target.closest('.tab')) {
							dragOver = spellbook;
						}
					}}
					class="tab"
					class:dragover={dragOver == spellbook ? true : false}
					class:active={$activeTab === index}
					style="--bookcolor: {spellbook.color ? spellbook.color : 'var(--white)'}"
				>
					<input
						type="radio"
						bind:group={$tabs}
						id={spellbook.id}
						value={spellbook.id}
						name="tab"
						bind:this={allTabs[index]}
						on:click={() => {
							setActiveTab(index);
							scrollToTop();
							$tabsPanelOpen = false;
						}}
					/>
					<div bind:this={tabName[index]}>
						{#if spellbook.unsaved === true}
							<span style="color: {spellbook.color ? spellbook.color : 'var(--white)'}">●</span>
						{/if}
						{spellbook.name}
					</div>
					<button
						class="close"
						on:click|stopPropagation={() => {
							closeTab(index);
						}}><i class="ri-close-circle-fill" /></button
					>
				</label>
			{/each}
		{/key}
	</div>
</div>

<svelte:window
	on:dragover={(e) => {
		e.preventDefault();
		handleDragover(e);
	}}
	on:drop|={(e) => handleDrop(e)}
/>

<style lang="scss">
	.tabs_wrapper {
		border-radius: 6px;
		width: 100%;
		overflow-x: auto;
		height: 46.4px;
		background-color: var(--translucentdark);
		position: relative;
		.close-swipe {
			display: none;
		}
		.tabs_inner {
			width: 100%;
			height: 100%;
			display: flex;
			gap: 1px;
			.tab {
				transition: 0s;
				min-height: 0;
				padding: 0;
				flex-grow: 1;
				flex-basis: 0;
				color: var(--white);
				min-width: 180px;
				overflow: hidden;
				border-radius: 6px;
				white-space: nowrap;
				border: 2px solid transparent;
				position: relative;
				margin: 0;
				pointer-events: all;
				display: flex;
				align-content: center;
				align-items: center;
				justify-content: center;
				max-width: 400px;
				input {
					display: none;
					div {
						font-size: 0.9rem;
						transition: 0.1s;
						opacity: 0.7;
						pointer-events: none;
						transition: 0s;
						width: 100%;
						mask-image: linear-gradient(
							90deg,
							transparent 0%,
							rgb(0, 0, 0) 10%,
							rgb(0, 0, 0) 80%,
							transparent 90%
						);
					}
				}
				div {
					width: 100%;
					text-align: center;
					padding-left: .5rem;
					mask-image: linear-gradient(
						90deg,

						rgb(0, 0, 0) 73%,
						transparent 83%
					);
				}
				&.active {
					border: 2px solid var(--bookcolor);
					background-color: var(--moretranslucent);
					div {
						opacity: 1;
					}
				}
				&.label {
					width: auto;
					flex-grow: 0;
					min-width: 54px;
					&:before,
					&:after {
						display: none;
					}
					i {
						margin: 0;
					}
				}
				// &:after,
				// &:before {
				// 	z-index: 1;
				// 	content: '';
				// 	position: absolute;
				// 	top: 0;
				// 	right: 0;
				// 	height: 100%;
				// 	width: 20px;
				// 	border-radius: 0 6px 6px 0;
				// 	background: linear-gradient(90deg, rgba(71, 31, 109, 0) 0%, rgba(71, 31, 109, 1) 50%);
				// }
				// &:after {
				// 	width: 50px;
				// }
				// &:before {
				// 	transition: 0.1s;
				// 	opacity: 0;
				// 	right: auto;
				// 	left: 0;
				// 	background: linear-gradient(90deg, rgba(71, 31, 109, 1) 30%, rgba(71, 31, 109, 0) 100%);
				// }
				&.dragover {
					background-color: var(--translucent);
					&:before,
					&:after {
						display: none;
					}
				}
				button.close {
					all: unset;
					width: 30px;
					cursor: pointer;
					z-index: 2;
					position: absolute;
					right: 0;
					height: 100%;
					top: 0;
					opacity: 0.25;
					transition: 0.1s;
					i {
						font-size: 1rem;
						vertical-align: -4px;
					}
					&:after,
					&:before {
						display: none;
					}
					&:hover {
						opacity: 1;
					}
				}
				&:hover {
					// background-color: var(--bookcolor);
					border-color: var(--bookcolor);
					div {
						opacity: 1;
					}
					&.scroll {
						div {
							// margin-top: 0px;

							animation-name: lightboard;
							animation-duration: 3s;
							animation-timing-function: linear;
							animation-iteration-count: infinite;
							animation-delay: 0.2s;
							@keyframes lightboard {
								to {
									transform: translateX(-50%);
								}
							}
						}
					}
					&:before {
						opacity: 1;
					}
				}
			}
		}
		&.nohover {
			.tabs_inner {
				.tabs {
					&:hover {
						border-color: transparent;
					}
				}
			}
		}
		.tabs_panel_top {
			display: none;
		}
		@media only screen and (max-width: 820px) {
			box-shadow: 0 0px 14px rgba(10, 10, 10, 0.6);
			position: fixed;
			bottom: env(safe-area-inset-bottom);
			left: 0;
			right: 0;
			height: 93vh;
			border-radius: 12px 12px 0 0;
			z-index: 15;
			background-color: var(--spellbg);
			transition: 0.4s;
			transform: translateY(100%);
			overflow: hidden;
			// overflow-x: hidden;
			&.open {
				transform: translateY(0);
				// transition: 0.5s cubic-bezier(.5,.5,.3,1);
			}
			.tabs_inner {
				width: 100%;
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-auto-rows: 200px;
				gap: 0.6rem;
				padding: 3rem 0.6rem calc(env(safe-area-inset-bottom) + var(--bottombarheight) + 0.6rem);
				position: relative;
				height: 100%;
				overflow-x: auto;
				button.tab {
					display: none;
				}
				label.tab {
					min-width: 0;
					max-width: none;
					background-color: var(--moretranslucent);
					border-bottom: 2px solid var(--bookcolor) !important;
					align-items: flex-start;
					padding: 0.5rem 0.8rem;
					div {
						width: 100%;
						overflow: hidden;
						mask-image: linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 70%, transparent 85%);
					}
					button.close {
						height: 20px;
						width: 20px;
						margin: 0;
						padding: 0.4rem 0.65rem;
						i {
							font-size: 1.2rem;
						}
					}
				}
			}
			.tabs_panel_top {
				display: block;
				width: 100%;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				min-height: 0;
				height: 48px;
				text-align: center;
				padding: 0;
				margin: 0;
				z-index: 2;
				i {
					color: var(--moretranslucent);
					font-size: 2.8rem;
					line-height: 1.15;
					margin: 0;
				}
			}
		}
	}
</style>
