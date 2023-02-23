<script>
	// import Card from './card.svelte';
	import {
		activeSpells,
		activeTab,
		openSpellbooks,
		tabs,
		userPrefs
	} from './stores/stores-persist';
	import { fade, fly } from 'svelte/transition';
	import SchoolIcon from './schoolicon.svelte';
	import Pill from './pill.svelte';
	import { onMount } from 'svelte';
	import { moveItem, newBook, removeFilters, setUnsaved } from './functions/globalfunctions.svelte';
	import Close from './close.svelte';
	import {
		filters,
		activeLevels,
		modalCall,
		lookupSpell,
		bookmarksOpen,
		summaryOpen,
		loadingBook
	} from './stores/stores';
	import Button from './button.svelte';
	import PlaceholderCard from './placeholdercard.svelte';
	import Bookmarks from './bookmarks.svelte';
	import Grid from './grid.svelte';
	import Schoolicon from './schoolicon.svelte';
	import { currentUser, pb } from '$lib/pocketbase';
	import Loading from './loading.svelte';
	let spellsheet;
	let spellsOrderedInDom;
	let orderedSpellsNames = [];
	let placeholders = ['', '', '', '', '', ''];
	let openSpell = null;
	let promise;
	let save;
	let spellDescription;
	let savingArray = [
		'strength sav',
		'dexterity sav',
		'consitution sav',
		'intelligence sav',
		'wisdom sav',
		'charisma sav'
	];
	const levels = [
		'cantrips',
		'level 1',
		'level 2',
		'level 3',
		'level 4',
		'level 5',
		'level 6',
		'level 7',
		'level 8',
		'level 9'
	];

	// $: $activeTab, ($openSpellbooks[$activeTab].list = $activeSpells)
	$: $activeTab,
		console.log($activeTab),
		$openSpellbooks.length > 0 && $openSpellbooks[$activeTab] && $openSpellbooks[$activeTab].list
			? ($activeSpells = $openSpellbooks[$activeTab].list)
			: $activeTab == -1
			? ($activeSpells = [])
			: !$openSpellbooks[$activeTab]
			? ($activeSpells = [])
			: !$openSpellbooks[$activeTab].length
			? ($activeSpells = [])
			: '';
	$: $activeSpells, setActiveLevels();

	function setActiveLevels() {
		if ($activeSpells.length) {
			$activeLevels = [];
			for (let spell of $activeSpells) {
				if (spell.display === true && !$activeLevels.includes(parseInt(spell.level))) {
					$activeLevels.push(parseInt(spell.level));
				}
			}
			$activeLevels.sort();
		} else {
			$activeLevels = [];
		}
	}
	function openClickedSpell(spell) {
		openSpell === spell ? (openSpell = null) : (openSpell = spell);
	}
	const characters = '◼';
	function generateString(length) {
		let result = ' ';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		return result;
	}

	function orderSpells() {
		if (spellsheet) {
			spellsOrderedInDom = spellsheet.querySelectorAll('.spell');
			for (let i = 0; i < spellsOrderedInDom.length; i++) {
				orderedSpellsNames.push(spellsOrderedInDom[i].getAttribute('data-name'));
			}
			if ($activeSpells.length) {
				var sortedSpells = $activeSpells
					.slice()
					.sort((a, b) => orderedSpellsNames.indexOf(a.name) - orderedSpellsNames.indexOf(b.name));
				$activeSpells = sortedSpells;
			}
			// console.log($activeSpells)
		}
	}

	onMount(() => {
		orderSpells();
	});

	function checkInput(input, words) {
		return words.some((word) => input.toLowerCase().includes(word.toLowerCase()));
	}
	// $: orderSpells($activeSpells);

	function removeSpell(spell) {
		$activeSpells = $activeSpells.filter((a) => a !== spell);
		setUnsaved();
	}
	function moveUpSpell(spell) {
		for (let i = 0; i < $activeSpells.length; i++) {
			if ($activeSpells[i] === spell) {
				if ($activeSpells[i - 1]) {
					$activeSpells = moveItem($activeSpells, i - 1, i);
					setUnsaved();
					promise = Promise.resolve();
					return;
				}
			}
		}
		promise.then(() => {
			orderSpells();
		});
	}
	function moveDownSpell(spell) {
		for (let i = 0; i < $activeSpells.length; i++) {
			if ($activeSpells[i] === spell) {
				if ($activeSpells[i + 1]) {
					$activeSpells = moveItem($activeSpells, i + 1, i);
					setUnsaved();
					promise = Promise.resolve();
					return;
				}
			}
		}
		promise.then(() => {
			orderSpells();
		});
	}
</script>

<div
	class="spellsheet_wrapper"
	class:no-bookmarks={$userPrefs.bookmarks != true ? true : false}
	bind:this={spellsheet}
	class:bookmarksopen={$bookmarksOpen}
>
	{#if $userPrefs.bookmarks != false}
		<Bookmarks />
	{/if}
	{#if $loadingBook === true}
		<Loading />
	{:else}
		{#key $activeTab}
			<!-- <div in:fly={{delay: 150, duration:150, y:7}} out:fly={{duration:150, y:7}} class="spellsheet"> -->
			<div class="spellsheet">
				<div class="grid_wrapper panel summary" class:open={$summaryOpen} id="summary">
					{#each $activeLevels as level}
						<ul class="grid_wrapper panel">
							<p><strong>{levels[level]}</strong></p>
							{#each $activeSpells as spell}
								{#if spell.level == level}
									<li class="item" in:fade={{ duration: 200 }}>
										<button
											on:click={() => {
												// openClickedSpell(spell);
												$modalCall = 'spell';
												$lookupSpell = spell;
											}}
										>
											<p><SchoolIcon type="small" school={spell.school} />{spell.name}</p>
										</button>
									</li>
								{/if}
							{/each}
						</ul>
					{/each}
					<button class="close" on:click={() => ($summaryOpen = false)}
						><i class="ri-arrow-up-s-line" /></button
					>
				</div>
				<!-- {#key $activeSpells} -->
				{#each $activeLevels as level}
					<div class="grid_wrapper panel" id={level}>
						<h2>{levels[level]}</h2>
						<Grid collapse={$userPrefs.description === false ? true : false}>
							{#each $activeSpells as spell}
								{#if spell.display === true}
									{@const spellDescription = spell.description.toLowerCase()}
									{#if spell.level == level}
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<div
											data-name={spell.name}
											class="card item"
											on:click={() => {
												// openClickedSpell(spell);
												$modalCall = 'spell';
												$lookupSpell = spell;
											}}
											role="button"
											data-castingtime={spell.casting_time}
											data-range={spell.range}
										>
											<div class="card_inner">
												{#if openSpell === spell}
													<Close on:click={() => (openSpell = null)} />
												{/if}
												<div class="block">
													<h3>
														{#if $userPrefs.icon != false}
															<SchoolIcon school={spell.school} />
														{/if}
														<span style="margin-left: .3rem">{spell.name}</span>
													</h3>
												</div>
												<div class="block pills">
													{#if $userPrefs.casting_time != false}
														<Pill
															label="Casting time"
															text={spell.casting_time}
															size="large"
															icon="ri-flashlight-line"
														/>
													{/if}
													{#if $userPrefs.range != false}
														<Pill
															label="Range or target"
															text={spell.range}
															size="large"
															icon="ri-arrow-right-up-line"
														/>
													{/if}
													{#if $userPrefs.duration != false}
														<Pill
															label="Duration"
															text={spell.duration}
															size="large"
															icon="ri-time-line"
														/>
													{/if}
												</div>
												<div class="block pills" style="margin-top: .1rem">
													{#if $userPrefs.school != false}
														<Pill
															label="School of magic"
															text={spell.school}
															size="small"
															icon="ri-book-2-line"
														/>
													{/if}

													{#if spellDescription.includes('make a ranged spell attack') && $userPrefs.attack != false}
														<Pill
															label="Spell attack"
															text="Ranged spell attack"
															size="small"
															icon="ri-sword-line"
														/>
													{:else if spellDescription.includes('make a melee spell attack') && $userPrefs.attack != false}
														<Pill
															label="Spell attack"
															text="Melee spell attack"
															size="small"
															icon="ri-sword-line"
														/>
													{:else if spellDescription.includes('make a spell attack') && $userPrefs.attack != false}
														<Pill
															label="Spell attack"
															text="Spell attack"
															size="small"
															icon="ri-sword-line"
														/>
													{:else if spell.save && $userPrefs.save != false}
														<Pill
															label="Saving throw"
															text={spell.save}
															size="small"
															icon="ri-lifebuoy-line"
														/>
													{/if}
												</div>
												{#if $userPrefs.description != false}
													<div class="block description">
														<p>{@html spell.description}</p>
													</div>
												{/if}
												<button class="fold" on:click={() => (openSpell = null)}
													><i class="ri-arrow-down-s-line fold" /></button
												>
											</div>
											<div class="controls">
												<button class="up" on:click|stopPropagation={() => moveUpSpell(spell)}
													><i class="ri-arrow-up-s-line" />
													<div class="label">Move up</div></button
												>
												<button class="down" on:click|stopPropagation={() => moveDownSpell(spell)}
													><i class="ri-arrow-down-s-line" />
													<div class="label">Move down</div></button
												>
												<button class="remove" on:click|stopPropagation={() => removeSpell(spell)}
													><i class="ri-close-line" />
													<div class="label">Remove</div></button
												>
											</div>
											<div class="close_veil" on:click={() => (openSpell = null)} />
										</div>
									{/if}
								{/if}
							{/each}
						</Grid>
					</div>
				{:else}
					{#if $filters === true}
						<div class="grid_wrapper panel">
							<h2
								style="opacity: 1; margin-top: 1rem; text-align: center; margin-left: 0; text-transform:none"
							>
								no results
							</h2>
							<div style="width: 100%; text-align: center">
								<Button on:click={() => removeFilters()} text="Remove filters" type="outline alt" />
							</div>
						</div>
					{:else if $openSpellbooks.length > 0}
						<div class="grid_wrapper panel">
							<h2>Add some spells!</h2>
							<div in:fade={{ duration: 200 }} class="grid" on:dragover|preventDefault>
								{#each placeholders as placeholder}
									<PlaceholderCard />
								{/each}
							</div>
						</div>
					{:else if $openSpellbooks.length < 1}
						<div class="grid_wrapper panel">
							<div class="no_book">
								<h3>The beginning of a new adventure!</h3>

								<div class="panel">
									{#if $currentUser}
										<Button
											on:click={newBook}
											type="blue fill"
											text="New spellbook"
											icon="ri-health-book-line"
										/>
										<Button
											on:click={() => ($modalCall = 'load')}
											type="accent fill"
											text="Open saved spellbook"
											icon="ri-folder-open-line"
										/>
										<p>Need a refresher? Check out the tutorial!</p>
										<Button
											type="fill"
											text="Tutorial"
											icon="ri-question-line"
											on:click={() => ($modalCall = 'tutorial')}
										/>
									{:else}
										<p>Without an account you won't be able to save your spellbooks.</p>
										<Button
											on:click={newBook}
											type="blue fill"
											text="New spellbook"
											icon="ri-health-book-line"
										/>
										<Button
											href="/account/login?register=true"
											type="accent fill"
											text="Register"
											icon="ri-user-add-line"
										/>
										<br />
										<p>Already have an account?</p>
										<Button
											href="/account/login"
											type="fill"
											text="Log in"
											icon="ri-login-circle-line"
										/>
										<p>Not sure where to start? Check out the tutorial!</p>
										<Button
											type="fill"
											text="Tutorial"
											icon="ri-question-line"
											on:click={() => ($modalCall = 'tutorial')}
										/>
									{/if}
								</div>
							</div>
						</div>
					{/if}
				{/each}
				<!-- {/key} -->
			</div>
		{/key}
	{/if}
</div>

<style lang="scss">
	.spellsheet_wrapper {
		display: grid;
		grid-template-columns: 60px 1fr;
		grid-gap: 1rem;
		align-items: flex-start;

		// &.bookmarks {
		// 	grid-template-columns: 60px 1fr;
		// 	grid-gap: 1rem;
		// }
		&.no-bookmarks {
			grid-template-columns: 1fr;
		}
		h2 {
			position: sticky;
			top: 0;
			// opacity: 0.5;
			z-index: 2;
		}
		@media only screen and (max-width: 1024px) {
			grid-template-columns: 0 1fr;
			grid-gap: 0;
			transition: 0.2s;
			&.bookmarksopen {
				width: calc(100% + 60px + 5vw);
				grid-template-columns: 60px 1fr;
				grid-gap: 2.5vw;
			}
		}
	}
	.grid_wrapper {
		&:last-child {
			margin-bottom: 8rem;
		}
		.grid {
			width: 100%;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-auto-rows: 325px;
			grid-gap: 1rem;
			position: relative;
			@media only screen and (max-width: 1500px) {
				grid-template-columns: 1fr 1fr 1fr;
			}
			@media only screen and (max-width: 1024px) {
				grid-template-columns: 1fr 1fr;
			}
			@media only screen and (max-width: 820px) {
				grid-template-columns: 1fr;
			}
			&.collapse {
				grid-auto-rows: 105px;
			}
		}
		&:global(.one-child) {
			width: calc(33.34% + 2rem);
			.grid {
				grid-template-columns: 1fr;
			}
		}
		&:global(.two-children) {
			width: calc(66.67% + 2rem);
			.grid {
				grid-template-columns: 1fr 1fr;
			}
		}
		.no_book {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0.2rem;
			padding: 2rem 0 0;
			flex-wrap: wrap;
			h3 {
				margin: 1rem 0;
				width: 100%;
				text-align: center;
			}
			.panel {
				width: auto;
				padding: 1.2rem 1.5rem 1rem;
				background-color: var(--translucentdark);
			}
		}
		&.summary {
			background-color: var(--spellbg);
			grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
			display: grid;
			border-radius: 6px;
			padding: 1.5rem 2rem;
			gap: 1rem;
			height: 0;
			padding: 0;
			margin: 0;
			overflow: hidden;
			position: relative;
			max-width: 100%;
			.grid_wrapper {
				opacity: 0;
				background-color: transparent;
				padding: 0;
				border-radius: 0;
				li {
					button {
						all: unset;
						margin: 0;
						padding: 0;
						height: 0;
						cursor: pointer;
					}
				}
			}
			&.open {
				padding: 1.5rem 2rem;
				margin-bottom: 2rem;
				height: auto;
				.grid_wrapper {
					opacity: 1;
				}
			}
			button.close {
				position: absolute;
				bottom: 0px;
				left: 50%;
				transform: translateX(-50%);
				margin-bottom: 0;
				width: 100%;
				text-align: center;
				height: 30px;
				transition: 0.1s;
				border-radius: 0 0 6px 6px;
				i {
					font-size: 2.2rem;
					color: var(--translucent);
					margin-top: -8px;
					display: inline-block;
					transition: 0.1s;
				}
				&:hover {
					background-color: var(--moretranslucent);
				}
			}
		}
		@media screen and (max-width: 820px) {
			padding: 1rem 0.5rem 2rem;
		}
	}
	.card {
		.card_inner {
			transform-origin: bottom;
			.block.description {
				p {
					font-size: 0.95rem;
				}
			}
		}
		i.fold {
			font-size: 2.5rem;
			color: var(--moretranslucent);
			margin: 0;
			transition: 0.1s;
		}
		button.fold {
			all: unset;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: -0.2rem;
			cursor: pointer;
		}
		&:hover {
			i.fold {
				color: var(--accent);
			}
		}
		&:global(.open) {
			z-index: 2;

			.card_inner {
				pointer-events: all;
				position: absolute;
				top: 0;
				left: 0;
				display: table;
				z-index: 1;
				padding-bottom: 3rem;
				border-color: transparent !important;
				transform: scale(1.02);
				cursor: auto;
				.block.description {
					opacity: 1;
					mask-image: none;
				}
			}
			button.fold {
				transform: translateX(-50%) rotate(180deg);
				i {
					color: var(--moretranslucent) !important;
				}
			}
		}
		&.not-open {
			opacity: 0.7;
		}
		.controls {
			position: absolute;
			top: 0;
			right: 0;
			border-radius: 6px 6px 0 0;
			opacity: 0;
			transition: 0.1s;
			button {
				margin: 0;
				padding: 0.5rem 0.8rem 0 0;
				position: relative;
				i {
					color: var(--translucent);
					transform: 0.1s;
				}
				.label {
					display: none;
					position: absolute;
					background-color: var(--spellbg);
					right: 36px;
					top: 11.5px;
					color: var(--translucent);
					width: 100px;
					text-align: right;
					padding: 0.2rem 0.6rem;
					pointer-events: none;
				}
				&:hover {
					i {
						color: var(--accent);
					}
					.label {
						display: block;
					}
				}
			}
		}
		&:hover {
			.controls {
				opacity: 1;
			}
		}
		// &:hover {
		// 	.controls {
		// 		transform: translateY(-100%);
		// 	}
		// }
		&:last-child {
			.controls {
				.down {
					display: none;
				}
			}
		}
		&:first-child {
			.controls {
				.up {
					display: none;
				}
			}
		}
	}
</style>
