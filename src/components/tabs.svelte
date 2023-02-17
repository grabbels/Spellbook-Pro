<script>
	import { onMount } from 'svelte';
	import Close from './close.svelte';
	import { loadSpellsheetsByUserId, newBook, handleLoad, closeTab } from './functions/globalfunctions.svelte';
	import Spell from './modal/spell.svelte';
	import { modalCall, savedSpellSheets, userId } from './stores/stores';
	import { activeSpells, openSpellbooks, activeTab, tabs } from './stores/stores-persist';
	let tabName = [];
	let dragOver;
	onMount(() => {
		loadSpellsheetsByUserId($userId);
		// for (let i = 0; i < tabName.length; i++) {
		// 	if (tabName[i].clientWidth > tabName[i].parentElement.clientWidth) {
		// 		tabName[i].parentElement.classList.add('scroll');
		// 	}
		// }
		// console.log($tabs[0]);
	});
	
	function handleDrop(e) {
		dragOver = null;
		console.log(window.tabIndex);
		if (e.target.closest('.button')) {
			// remove `from` item and store it
			var f = $openSpellbooks.splice(window.tabIndex, 1)[0];
			// insert stored item into position `to`
			// console.log(f);
			var el = e.target.closest('.button');

			let newIndex = [...el.parentElement.children].indexOf(el) - 1;
			console.log(newIndex);
			$openSpellbooks.splice(newIndex, 0, f);
			$openSpellbooks = $openSpellbooks;
		}
	}
	function handleDragover(e) {
		// if (e.target.closest('.button')) {
		// 	console.log(e.target.closest('.button'));
		// }
	}
	// $: $activeSpells,
</script>

<div class="tabs_wrapper">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div role="button" class="button label" on:click={handleLoad}>
		<div><i class="ri-book-open-line" /></div>
	</div>
	{#key $openSpellbooks}
	{#each $openSpellbooks as spellbook, index}
		{#if spellbook.name != undefined}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				role="button"
				class="button"
				draggable="true"
				on:dragstart={(e) => {
					console.log(e);
					window.tabIndex = index;
				}}
				on:dragexit={(e) => {
					if (e.target.closest('.button')) {
						dragOver = null;
					}
				}}
				on:dragenter={(e) => {
					if (e.target.closest('.button')) {
						dragOver = spellbook;
					}
				}}
				class:dragover={dragOver == spellbook ? true : false}
				data-id={spellbook.id}
				data-active={spellbook.open_tab}
				bind:this={$tabs[index]}
				on:click={() => {
					console.log($activeTab)
					console.log($openSpellbooks)
					if ($tabs[index].getAttribute('data-id') !== $activeTab.id) {
						$activeTab = spellbook;
						for (let i = 0; i < $openSpellbooks.length; i++) {
							$openSpellbooks[i].open_tab = false;
						}
						$openSpellbooks[index].open_tab = true;
						if (spellbook.list) {
							$activeSpells = spellbook.list;
						} else {
							$activeSpells = [];
						}
					}
				}}
				class:active={$activeTab.id === spellbook.id}
				style="--bookcolor: {spellbook.color}"
			>
				<div bind:this={tabName[index]}>
					<span style="color: {spellbook.color}">●</span>
					{spellbook.name}
				</div>
				<button
					class="close"
					on:click={() => {
						console.log($openSpellbooks[index]);
						if ($openSpellbooks[index].id.toString().includes('temp') && $openSpellbooks[index].list.length > 0) {
							// $modalCall = 'prompt unsaved'
							if (
								confirm(
									'This spellbook is unsaved and you will lose its contents when you close this tab. Are you sure you want to close this tab?'
								) == true
							) {
								closeTab(index);
							}
						} else {
							closeTab(index);
						}
					}}><i class="ri-close-circle-fill" /></button
				>
			</div>
		{/if}
	{/each}
	{/key}
</div>

<svelte:window
	on:dragover={(e) => {
		e.preventDefault();
		handleDragover(e);
	}}
	on:drop={(e) => handleDrop(e)}
/>

<style lang="scss">
	.tabs_wrapper {
		border-radius: 6px;
		display: flex;
		gap: 1px;
		width: 100%;
		overflow-x: auto;
		height: 46.4px;
		background-color: var(--translucentdark);
		div[role='button'] {
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
			&.active {
				border: 2px solid var(--bookcolor);
				background-color: var(--moretranslucent);
				div {
					opacity: 1;
				}
			}
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
</style>
