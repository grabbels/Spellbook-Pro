<script>
	let query = '';
	import SchoolIcon from './schoolicon.svelte';
	import { sidemenuopen, notification } from './stores';
	import { activeSpells } from './stores-persist';
	import { fly } from 'svelte/transition';
	import { spells } from './spells';
	let results = [];
	let searchField;
	let clear;
	let resultsList;
	// spellssave();
	// function spellssave() {
	// 	for (let i = 0; i < spells.length; i++) {
	// 		let spellDescription = spells[i].description.toLowerCase();
	// 		spellDescription.includes('strength sav')
	// 			? (spells[i].save = 'str')
	// 			: spellDescription.includes('dexterity sav')
	// 			? (spells[i].save = 'dex')
	// 			: spellDescription.includes('constitution sav')
	// 			? (spells[i].save = 'con')
	// 			: spellDescription.includes('intelligence sav')
	// 			? (spells[i].save = 'int')
	// 			: spellDescription.includes('wisdom sav')
	// 			? (spells[i].save = 'wis')
	// 			: spellDescription.includes('charisma sav')
	// 			? (spells[i].save = 'cha')
	// 			: '';
	// 	}
	// 	console.log(spells)
	// }
	$: if ($sidemenuopen === true) {
		searchField.focus();
	}
	$: if (query.length > 0) {
		results = spells.filter((data) => data?.name.toLowerCase()?.includes(query.toLowerCase()));
	} else {
		results = [];
	}
	const addSpell = (spell) => {
		console.log($activeSpells);
		if ($activeSpells.filter((e) => e.name === spell.name).length > 0) {
			$notification = 'This spell is already in your spellbook.#error';
		} else {
			spell.display = true;
			$activeSpells.push(spell);
		}
		$activeSpells = $activeSpells;
	};
</script>

<div class="wrapper">
	<input
		bind:value={query}
		on:keydown={(e) => {
			if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				e.preventDefault();
				if (e.key === 'ArrowDown') {
					// console.log(e.target.nextElementSibling.children[0])
				}
			}
		}}
		type="text"
		id="spellsearch"
		placeholder="Search for spells..."
		bind:this={searchField}
	/>
	<button on:click={() => (query = '')} class="clear" class:show={query}
		><i class="ri-close-circle-fill" /></button
	>
	<ul bind:this={resultsList}>
		{#if results.length > 0}
			{#each results as spell, i}
				<li
					class={$activeSpells.includes(spell[i]) ? 'disabled' : ''}
					transition:fly={{ y: 10, duration: 200 }}
				>
					<button on:click={() => addSpell(spell)}>
						<div>
							<SchoolIcon school={spell.school} />
						</div>
						<div>
							<h3>{spell.name}</h3>
							<p>{spell.type}</p>
							<i class="ri-add-line" />
						</div>
					</button>
				</li>
			{/each}
		{:else if query.length > 0}
			<li transition:fly={{ y: 10, duration: 200 }}>
				<button style="pointer-events: none">
					<div>
						<!-- <SchoolIcon school={spell.school} /> -->
					</div>
					<div>
						<!-- <h3>{spell.name}</h3> -->
						<p>No results</p>
						<!-- <i class="ri-add-line" /> -->
					</div>
				</button>
			</li>
		{/if}
	</ul>
</div>

<style lang="scss">
	::-webkit-scrollbar-thumb {
		background-color: rgba(255, 255, 255, 0.3);
	}
	::-webkit-scrollbar-track-piece {
		background-color: transparent;
	}
	::-webkit-scrollbar-track {
		background-color: transparent;
	}
	::-webkit-scrollbar {
		width: 6px;
	}
	.wrapper {
		width: 100%;
		height: 100%;
		padding: 2rem 3rem;
		position: relative;
	}
	input {
		margin-bottom: 0;
	}
	button.clear {
		background-color: transparent;
		border: none;
		padding: 0;
		margin: 0;
		min-height: 0;
		height: auto;
		position: absolute;
		top: 37px;
		right: 54px;
		font-size: 1.1rem;
		display: none;
		i {
			font-size: 1.1rem;
			color: var(--lesstranslucent);
		}
		&.show {
			display: block;
		}
	}
	ul {
		height: 100%;
		width: 100%;
		margin-top: 0.8rem;
		overflow-x: hidden;
		overflow-y: auto;
		position: relative;
		transition: 0.2s;
		scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
		
		// scrollbar-width:;

		li {
			border-bottom: 1px solid rgba(255, 255, 255, 0.15);
			cursor: pointer;
			position: relative;
			transition: 0.1s;
			&:last-child {
				margin-bottom: 3rem;
			}
			p {
				font-weight: 400;
			}
			button {
				all: unset;
				padding: 0.35rem 0.8rem 0.5rem;
				width: 100%;
				height: 100%;
				display: grid;
				grid-template-columns: 40px 1fr;
				align-items: center;
			}
			i {
				position: absolute;
				font-size: 1.5rem;
				color: white;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				transition: 0.1s;
				opacity: 0;
				color: var(--translucent);
			}
			&:hover {
				background-color: rgba(255, 255, 255, 0.15);
				i {
					opacity: 1;
				}
			}
			&.disabled {
				button {
					opacity: 0.3;
				}
			}
		}
	}
</style>
