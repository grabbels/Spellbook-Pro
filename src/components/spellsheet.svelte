<script>
	// import Card from './card.svelte';
	import { activeSpells } from './stores-persist';
	import { fade } from 'svelte/transition';
	import SchoolIcon from './schoolicon.svelte';
	import Pill from './pill.svelte';
	import { onMount } from 'svelte';
	import { moveItem, removeFilters } from './globalfunctions.svelte';
	import Close from './close.svelte';
	import { filters, activeLevels, modalCall, lookupSpell } from './stores';
	import Button from './button.svelte';
	import PlaceholderCard from './placeholdercard.svelte';
	import Bookmarks from './bookmarks.svelte';
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
	$: $activeSpells, setActiveLevels();
	$: console.log($activeSpells);
	function setActiveLevels() {
		$activeLevels = [];
		for (let spell of $activeSpells) {
			if (spell.display === true && !$activeLevels.includes(parseInt(spell.level))) {
				$activeLevels.push(parseInt(spell.level));
			}
		}
		$activeLevels.sort();
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
			var sortedSpells = $activeSpells
				.slice()
				.sort((a, b) => orderedSpellsNames.indexOf(a.name) - orderedSpellsNames.indexOf(b.name));
			$activeSpells = sortedSpells;
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
	}
	function moveUpSpell(spell) {
		for (let i = 0; i < $activeSpells.length; i++) {
			if ($activeSpells[i] === spell) {
				if ($activeSpells[i - 1]) {
					$activeSpells = moveItem($activeSpells, i - 1, i);
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

<div class="spellsheet_wrapper" bind:this={spellsheet}>
	<Bookmarks />
	<div>
			{#each $activeLevels as level}
				<div class="grid_wrapper panel" id={level}>
					<h2>{levels[level]}</h2>
					<div class="grid" on:dragover|preventDefault>
						{#each $activeSpells as spell}
							{#if spell.display === true}
								{@const spellDescription = spell.description.toLowerCase()}
								{#if spell.level == level}
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<div
										data-name={spell.name}
										class="card item {openSpell === null
											? ''
											: openSpell === spell
											? 'open'
											: 'not-open'}"
										on:click|self={() => {
											// openClickedSpell(spell);
											$modalCall = 'spell';
											$lookupSpell = spell;
										}}
										in:fade={{ duration: 200 }}
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
													<SchoolIcon school={spell.school} />
													<span style="margin-left: .3rem">{spell.name}</span>
												</h3>
											</div>
											<div class="block pills">
												<Pill
													label="Casting time"
													text={spell.casting_time}
													size="large"
													icon="ri-flashlight-line"
												/>
												<Pill
													label="Range or target"
													text={spell.range}
													size="large"
													icon="ri-arrow-right-up-line"
												/>
												<Pill
													label="Duration"
													text={spell.duration}
													size="large"
													icon="ri-time-line"
												/>
											</div>
											<div class="block pills">
												<Pill
													label="School of magic"
													text={spell.school}
													size="small"
													icon="ri-book-2-line"
												/>

												{#if spellDescription.includes('make a ranged spell attack')}
													<Pill
														label="Spell attack"
														text="Ranged spell attack"
														size="small"
														icon="ri-sword-line"
													/>
												{:else if spellDescription.includes('make a melee spell attack')}
													<Pill
														label="Spell attack"
														text="Melee spell attack"
														size="small"
														icon="ri-sword-line"
													/>
												{:else if spellDescription.includes('make a spell attack')}
													<Pill
														label="Spell attack"
														text="Spell attack"
														size="small"
														icon="ri-sword-line"
													/>
												{:else if spell.save}
													<Pill
														label="Saving throw"
														text={spell.save}
														size="small"
														icon="ri-lifebuoy-line"
													/>
												{/if}
											</div>
											<div class="block description">
												<p>{@html spell.description}</p>
											</div>
											<button class="fold" on:click={() => (openSpell = null)}
												><i class="ri-arrow-down-s-line fold" /></button
											>
										</div>
										<div class="controls">
											<button class="up" on:click={() => moveUpSpell(spell)}
												><i class="ri-arrow-up-s-line" />
												<div class="label">Move up</div></button
											>
											<button class="down" on:click={() => moveDownSpell(spell)}
												><i class="ri-arrow-down-s-line" />
												<div class="label">Move down</div></button
											>
											<button class="remove" on:click={() => removeSpell(spell)}
												><i class="ri-close-line" />
												<div class="label">Remove</div></button
											>
										</div>
										<div class="close_veil" on:click={() => (openSpell = null)} />
									</div>
								{/if}
							{/if}
						{/each}
					</div>
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
				{:else}
					<div class="grid_wrapper panel">
						<h2>Add some spells!</h2>
						<div class="grid" on:dragover|preventDefault>
							{#each placeholders as placeholder}
								<PlaceholderCard />
							{/each}
						</div>
					</div>
				{/if}
			{/each}
	</div>
</div>

<style lang="scss">
	.spellsheet_wrapper {
		display: grid;
		grid-template-columns: 60px 1fr;
		grid-gap: 1rem;
		align-items: flex-start;
		transition: 0.2s;
		&.bookmarks {
			grid-template-columns: 60px 1fr;
			grid-gap: 1rem;
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
			@media only screen and (max-width: 1170px) {
				grid-template-columns: 1fr 1fr;
			}
			@media only screen and (max-width: 820px) {
				grid-template-columns: 1fr;
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
					&:after {
						opacity: 0;
					}
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
