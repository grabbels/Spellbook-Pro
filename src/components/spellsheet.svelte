<script>
	// import Card from './card.svelte';
	import { activeSpells } from './stores-persist';
	import { fly } from 'svelte/transition';
	import SchoolIcon from './schoolicon.svelte';
	import Pill from './pill.svelte';
	import { onMount, afterUpdate } from 'svelte';
	import { arrayMoveImmutable } from 'array-move';
	let spellsheet;
	let spellsOrderedInDom;
	let orderedSpellsNames = [];
	let openSpell = null;
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
	function orderSpells() {
		spellsOrderedInDom = spellsheet.querySelectorAll('.spell');
		for (let i = 0; i < spellsOrderedInDom.length; i++) {
			orderedSpellsNames.push(spellsOrderedInDom[i].getAttribute('data-name'));
		}
		var sortedSpells = $activeSpells
			.slice()
			.sort((a, b) => orderedSpellsNames.indexOf(a.name) - orderedSpellsNames.indexOf(b.name));
		$activeSpells = sortedSpells;
	}
	
	onMount(() => {
		orderSpells();
	});

	
	function removeSpell(spell) {
		$activeSpells = $activeSpells.filter((a) => a !== spell);
		console.log($activeSpells);
	}
	function moveUpSpell(spell) {
		for (let i = 0; i < $activeSpells.length; i++) {
			if ($activeSpells[i] === spell) {
				if ($activeSpells[i - 1]) {
					$activeSpells = arrayMoveImmutable($activeSpells, i, i - 1);
				}
			}
		}
	}
	function moveDownSpell(spell) {
		for (let i = 0; i < $activeSpells.length; i++) {
			if ($activeSpells[i] === spell) {
				$activeSpells = arrayMoveImmutable($activeSpells, i, i + 1);
				// orderSpells();
			}
		}
	}
</script>

<div bind:this={spellsheet}>
	{#each activeLevels as level}
		<div class="grid_wrapper panel">
			<h2>{levels[level]}</h2>
			<div class="grid" on:dragover|preventDefault>
				{#each $activeSpells as spell, index}
					{#if spell.level == level}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							data-name={spell.name}
							class="spell {openSpell === null ? '' : openSpell === spell ? 'open' : 'not-open'}"
							on:click|self={() => {
								openClickedSpell(spell);
							}}
							in:fly={{ y: 10, duration: 300, delay: 50 * index }}
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
								<div class="block">
									<Pill text={spell.casting_time} size="large" icon="ri-flashlight-line" />
									<Pill text={spell.range} size="large" icon="ri-arrow-right-up-line" />
									<Pill text={spell.duration} size="large" icon="ri-time-line" />
								</div>
								<div class="block">
									<Pill text="no" size="small" icon="ri-book-2-line" />
									<Pill text="no" size="small" icon="ri-lifebuoy-line" />
									<Pill text="no" size="small" icon="ri-sword-line" />
									<Pill text="no" size="small" icon="ri-open-arm-line" />
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
									><i class="ri-arrow-up-s-line" /></button
								>
								<button class="down" on:click={() => moveDownSpell(spell)}
									><i class="ri-arrow-down-s-line" /></button
								>
								<button class="remove" on:click={() => removeSpell(spell)}
									><i class="ri-close-line" /></button
								>
							</div>
							<div class="close_veil" on:click={() => (openSpell = null)} />
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{:else}
		<p class="message">You have not added spells yet.</p>
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
			background-color: rgb(22, 9, 57);
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
				i {
					color: var(--translucent);
					transform: 0.1s;
				}
				&:hover {
					i {
						color: var(--accent);
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
