<script>
	// import Card from './card.svelte';
	import { activeSpells } from './stores-persist';
	import { fade } from 'svelte/transition';
	import SchoolIcon from './schoolicon.svelte';
	import Pill from './pill.svelte';
	import { onMount, afterUpdate } from 'svelte';
	import { arrayMoveImmutable } from 'array-move';
	import { moveItem } from './globalfunctions.svelte';
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
	let activeLevels = [];
	$: $activeSpells, setActiveLevels();
	function setActiveLevels() {
		activeLevels = [];
		for (let spell of $activeSpells) {
			if (!activeLevels.includes(parseInt(spell.level))) {
				activeLevels.push(parseInt(spell.level));
			}
		}
		activeLevels.sort();
	}
	function openClickedSpell(spell) {
		openSpell === spell ? (openSpell = null) : (openSpell = spell);
	}
	// const characters ='▆▍▇▆▇▅▆▅▁▇▁▅▆▇▆▆▉▆▇▅▅▇▆▆';
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
					console.log(i);
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
					console.log(i);
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

<div bind:this={spellsheet}>
	{#each activeLevels as level}
		<div class="grid_wrapper panel">
			<h2>{levels[level]}</h2>
			<div class="grid" on:dragover|preventDefault>
				{#each $activeSpells as spell, index (spell.name)}
					{@const spellDescription = spell.description.toLowerCase()}
					{#if spell.level == level}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							data-name={spell.name}
							class="spell {openSpell === null ? '' : openSpell === spell ? 'open' : 'not-open'}"
							on:click|self={() => {
								openClickedSpell(spell);
							}}
							in:fade={{ duration: 200 }}
						>
							<div class="spell_inner">
								<button on:click={() => (openSpell = null)} class="close"
									><i class="ri-close-line" /></button
								>
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
									<Pill label="Duration" text={spell.duration} size="large" icon="ri-time-line" />
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
									{:else if checkInput(spellDescription, savingArray)}
										<Pill
											label="Saving throw"
											text={spellDescription.includes('strength sav')
												? 'Str save'
												: spellDescription.includes('dexterity sav')
												? 'Dex save'
												: spellDescription.includes('constitution sav')
												? 'Str save'
												: spellDescription.includes('intelligence sav')
												? 'Int save'
												: spellDescription.includes('wisdom sav')
												? 'Wis save'
												: spellDescription.includes('charisma sav')
												? 'Cha save'
												: ''}
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
				{/each}
			</div>
		</div>
	{:else}
	
		<div class="grid_wrapper panel">
			<h2>Add some spells!</h2>
			<div class="grid" on:dragover|preventDefault>
				{#each placeholders as placeholder}
				<div class="spell placeholder">
					<div class="spell_inner">
						<div class="block">
							<h3>
								<SchoolIcon school="blank" />
								<span style="margin-left: .3rem"
									>{'◼'.repeat(Math.floor(Math.random() * 12) + 6)}</span
								>
							</h3>
						</div>
						<div class="block pills">
							<Pill
								label="Casting time"
								text={'◼'.repeat(Math.floor(Math.random() * 8) + 6)}
								size="large"
								icon="ri-checkbox-blank-circle-fill"
							/>
							<Pill
								label="Range or target"
								text={'◼'.repeat(Math.floor(Math.random() * 8) + 6)}
								size="large"
								icon="ri-checkbox-blank-circle-fill"
							/>
							<Pill
								label="Duration"
								text={'◼'.repeat(Math.floor(Math.random() * 8) + 6)}
								size="large"
								icon="ri-checkbox-blank-circle-fill"
							/>
						</div>
						<div class="block pills">
							<Pill
								label="School of magic"
								text={'◼'.repeat(Math.floor(Math.random() * 8) + 6)}
								size="small"
								icon="ri-checkbox-blank-circle-fill"
							/>
						</div>
						<div class="block description">
							<p style="word-break: break-all;">
								{'◼'.repeat(Math.floor(Math.random() * 100) + 100)}
							</p>
						</div>
					</div>
				</div>
				{/each}
			</div>
		</div>
	
	{/each}
</div>

<style lang="scss">
	.grid_wrapper {
		.grid {
			width: 100%;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-auto-rows: 350px;
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
	.spell {
		position: relative;
		z-index: 1;
		cursor: pointer;
		transition: 0.1s;
		// background: linear-gradient(0deg, rgba(20,8,50,1) 0%, rgba(33,14,79,1) 100%);
		.close_veil {
			z-index: -1;
			width: 100vw;
			height: 100vw;
			position: fixed;
			left: 0;
			top: 0;
			background-color: transparent;
			pointer-events: none;
			opacity: 0;
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

		.spell_inner {
			pointer-events: none;
			display: block;
			border: 0;
			padding: 1.3rem 1.9rem;
			display: flex;
			flex-wrap: nowrap;
			flex-direction: column;
			height: 100%;
			position: relative;
			box-shadow: 0 3px 10px rgba(19, 19, 19, 0.4);
			border-radius: 6px;
			background-color: var(--spellbg);
			transition: 0.15s;
			border: 2px solid transparent;
			button.close {
				all: unset;
				cursor: pointer;
				position: absolute;
				top: 18px;
				right: 26px;
				display: none;
				i {
					font-size: 2rem;
					color: var(--translucent);
					transition: 0.1s;
				}
				&:hover {
					i {
						color: var(--accent);
					}
				}
			}
			h3 {
				margin-bottom: 0.1rem;
			}
			.block {
				display: flex;
				flex-wrap: wrap;
				position: relative;
				pointer-events: none;
				user-select: none;
				&.pills {
					pointer-events: auto;
				}
				&.description {
					user-select: auto;
					margin-top: 0.5rem;
					overflow-y: hidden;
					flex-grow: 1;
					opacity: 0.7;
					// scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
					// scrollbar-width:thin
					p {
						font-size: 0.95rem;
					}
					&:after {
						content: '';
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
						height: 100px;
						background: linear-gradient(0deg, rgba(22, 9, 57, 1) 10%, rgba(22, 9, 57, 0) 100%);
						opacity: 1;
						transition: 0.2s;
					}
				}
			}
		}
		&:hover {
			.spell_inner {
				border-color: var(--accent);
			}
			i.fold {
				color: var(--accent);
			}
		}
		&:global(.open) {
			z-index: 2;

			.spell_inner {
				pointer-events: all;
				position: absolute;
				top: 0;
				left: 0;
				box-shadow: 0 11px 40px rgba(19, 19, 19, 0.5);
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
			.close_veil {
				// opacity: .2;
				pointer-events: all;
			}
			button.fold {
				transform: translateX(-50%) rotate(180deg);
				i {
					color: var(--moretranslucent) !important;
				}
			}
			button.close {
				display: block;
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
					top: 7.5px;
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
		&.placeholder {
			opacity: .2;
			pointer-events: none!important;
			.spell_inner {
				pointer-events: none!important;
				* {
					letter-spacing: -4px;
					opacity: 0.2;
					pointer-events: none!important;
				}
				h3 {
					opacity: 1;
					font-size: 2rem;
					span {
						opacity: 1;
						letter-spacing: -2.9px;
					}
				}
				p {
					line-height: 1.3;
					font-size: 1.8rem;
				}
				.block.description {
					&:after {
						display: none;
					}
				}
			}
		}
	}
</style>
