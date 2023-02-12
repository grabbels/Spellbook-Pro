<script>
	let query = '';
	import SchoolIcon from './schoolicon.svelte';
	import { sidemenuopen, notification } from './stores/stores';
	import { activeSpells } from './stores/stores-persist';
	import { fly } from 'svelte/transition';
	import { spells } from './data/spells';
	import bg from '../img/menu-bg.png';
	import Button from './button.svelte';
	import { addSpell } from './functions/globalfunctions.svelte';
	let results = [];
	let result = [];
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
	
	var resultNumber = -1;
	function handleKeyDown(e) {
		if (e.key == 'ArrowDown' && results) {
			e.preventDefault();
			resultNumber++;
			if (result[resultNumber]) {
				result[resultNumber].focus();
			} else {
				resultNumber--;
			}
		}
		if (e.key == 'ArrowUp' && results) {
			e.preventDefault();
			resultNumber--;
			if (result[resultNumber]) {
				result[resultNumber].focus();
			} else {
				searchField.focus();
				resultNumber = -1;
			}
		}
		if (e.key == 'Escape') {
			searchField.value = '';
			resultNumber = -1;
			$sidemenuopen = false;
		}
	}
	function touchFeedback(e) {
		console.log(e);
		let feedback = document.createElement('div');
		feedback.classList.add('feedback');
		feedback.style.left = e.clientX + 'px';
		feedback.style.right = e.clientY + 'px';
		e.target.append(feedback);
		setTimeout(() => {
			feedback.classList.add('animate');
		}, 1);

		setTimeout(() => {
			feedback.remove();
		}, 401);
	}
</script>

<div class="sidemenu" style="background-image: url('{bg}')" class:open={$sidemenuopen}>
	<div class="wrapper" on:keydown={handleKeyDown}>
		<form autocomplete="off">
			<input
			autocomplete="off"
				on:click={() => (resultNumber = -1)}
				bind:value={query}
				type="text"
				id="spellsearch"
				placeholder="Search for spells..."
				bind:this={searchField}
				name="search"
			/>
		</form>
		<button on:click={() => (query = '')} class="clear" class:show={query}
			><i class="ri-close-circle-fill" /></button
		>
		<ul bind:this={resultsList} tabindex="-1">
			{#if results.length > 0}
				{#each results as spell, i}
					<li
						class={$activeSpells.includes(spell[i]) ? 'disabled' : ''}
						transition:fly={{ y: 10, duration: 200 }}
					>
						<button
							bind:this={result[i]}
							on:click={(e) => {
								addSpell(spell); touchFeedback(e); resultNumber -1; searchField.select() ;
							}}
							tabindex="0"
						>
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
		<div class="close_button"><Button on:click={() => $sidemenuopen = false} type="outline alt" text="close" icon="ri-close-line" /></div>
	</div>
</div>

<style lang="scss">
	:global(.feedback) {
		width: 600px;
		height: 600px;
		transform: scale(0.2) translateX(-50%);
		transition: 0.4s;
		opacity: 1;
		border-radius: 50vh;
		background-color: var(--moretranslucent);
		position: absolute;
		transform-origin: left;
	}
	:global(.feedback.animate) {
		opacity: 0;
		transform: scale(1) translateX(-50%);
	}

	.sidemenu {
		position: fixed;
		left: 0;
		top: 0;
		height: 100vh;
		max-width: 400px;
		width: 100vw;
		background-position: top center;
		background-size: cover;
		transform: translateX(-100%);
		transition: transform 0.3s;
		z-index: 3;
		height: -webkit-fill-available;
		&.open {
			transform: translateX(0%);
		}
		&:before {
			position: absolute;
			content: '';
			height: 100%;
			width: 60px;
			right: 0;
			top: 0;
			z-index: -1;
			background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
		}
	}

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
		padding: 2rem 1.5rem 2rem 3rem;
		position: relative;
		@media only screen and (max-width: 1024px) {
			padding: 2rem 3vw 1rem;
			display: grid;
			grid-template-rows: 42px 1fr 46px;
			grid-gap: 0.8rem;
		}
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
		right: 34px;
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
	.close_button {
		display: none;
		width: 100%;
		@media only screen and (max-width: 1024px) {
			display: block;
			text-align: center;
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
		@media only screen and (max-width: 1024px) {
			margin-top: 0;
		}
		// scrollbar-width:;

		li {
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
				box-sizing: border-box;
				padding: 0.35rem 0.8rem 0.5rem;
				width: 100%;
				height: 100%;
				display: grid;
				grid-template-columns: 40px 1fr;
				align-items: center;
				border-bottom: 1px solid rgba(255, 255, 255, 0.15);
				position: relative;
				overflow: hidden;
				&:focus {
					background-color: rgba(255, 255, 255, 0.15);
					:global(& + i) {
						opacity: 1;
					}
				}
				* {
					pointer-events: none;
				}
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
			@media (pointer: fine) {
				&:hover {
					button {
						background-color: rgba(255, 255, 255, 0.15);
					}
					i {
						opacity: 1;
					}
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
