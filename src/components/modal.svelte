<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { spells } from './spells';
	import {
		modalCall,
		savedSpellSheets,
		userId,
		session,
		notification,
		userNickname,
		topmenuopen,
		quickQuery,
		lookupSpell,
		savePrompt,
		bookToEdit,
		lookupBook
	} from './stores';
	import {
		retrieveSession,
		loadSpellsheetsByUserId,
		classOptions,
		classes,
		refreshList,
		loadBook
	} from './globalfunctions.svelte';
	import Pill from './pill.svelte';
	import Button from './button.svelte';
	import { supabaseClient } from '$lib/db';
	import { activeSpells } from './stores-persist';
	import Close from './close.svelte';
	import SchoolIcon from './schoolicon.svelte';
	import Colorpicker from './colorpicker.svelte';
	import SaveSlot from './saveslot.svelte';
	import Loading from './loading.svelte';
	export let modal;
	let loadingSave;
	let saveName;
	let saveLevel;
	let saveClass;
	let saveDescription;
	let saveColor = $bookToEdit ? $bookToEdit.color : 'var(--purple)';
	let overwriteId;
	let quickInput;
	let results;
	let form;
	let result = [];
	let colorPicker = false;
	let levelList = [];
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

	$: $modalCall, ($quickQuery = '');
	$: saveColor, (colorPicker = false), console.log(saveColor);
	if ($modalCall == 'save' || 'load' || 'edit') {
		if (!$userId || !$userNickname) {
			if ($session) {
				$userId = $session.user.id;
				$userNickname = $session.user.user_metadata.nickname;
				loadSpellsheetsByUserId($userId);
			} else {
				let promiseSession = retrieveSession();
				promiseSession.then((value) => {
					if (value) {
						$session = value;
						$userId = value.user.id;
						$userNickname = value.user.user_metadata.nickname;
						loadSpellsheetsByUserId($userId);
					}
				});
			}
		} else {
			loadSpellsheetsByUserId($userId);
		}
	}
	$: if ($quickQuery.length > 0) {
		results = spells.filter((data) =>
			data?.name.toLowerCase()?.includes($quickQuery.toLowerCase())
		);
	} else {
		results = [];
	}
	onMount(() => {
		if ($modalCall == 'lookup') {
			quickInput.focus();
		}
		for (let i = 0; i < levelList.length; i++) {
			console.log(levelList[i]);
			if (!levelList[i].querySelector('ul').children.length) {
				levelList[i].style.display = 'none';
			}
		}
	});

	$: listLength = $savedSpellSheets.length;
	$: console.log($modalCall);
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
				quickInput.focus();
				resultNumber = -1;
			}
		}
		if (e.key == 'Escape') {
			$modalCall = '';
			$quickQuery = '';
			$lookupSpell = '';
		}
	}

	function handleLookup(i) {
		$lookupSpell = results[i];
		$modalCall = 'spell';

		// setTimeout(() => {
		// 	$modalCall = 'spell';
		// }, 1);
	}

	async function handleSave(e) {
		e.preventDefault;
		if ($bookToEdit) {
			overwriteId = $bookToEdit.id;
		}
		if (!saveName.value || !saveLevel.value || !saveClass.value) {
			$notification = 'Please fill in all the fields.#alert';
		} else {
			loadingSave = 'loading';
			if (overwriteId) {
				const { error } = await supabaseClient.from('spellbooks').delete().eq('id', overwriteId);
				if (error) {
					console.log(error);
				}
			}
			const { data, error } = await supabaseClient
				.from('spellbooks')
				.insert({
					creator: $userNickname,
					name: saveName.value,
					class: saveClass.value,
					level: saveLevel.value,
					description: saveDescription.value,
					list: $activeSpells,
					user_id: $userId,
					color: saveColor
				})
				.select();
			if (error) {
				console.log(error);
				$notification = 'Oops, an error occurred. Error code: ' + error.code + '#error';
			} else if (data) {
				console.log('test');
				$notification = 'Spellbook saved.#info';

				overwriteId = '';
				$savePrompt = false;
				$topmenuopen = false;
				// loadSpellsheetsByUserId($userId);
				$modalCall = '';
				$modalCall = $modalCall;
				if ($bookToEdit) {
					loadSpellsheetsByUserId();
				}
				$bookToEdit = '';
			}
		}
	}

	async function handleClick(id) {
		if ($modalCall == 'save') {
			if (id === 'add') {
				$savePrompt = true;
			} else if (
				id != 'add' &&
				confirm(
					'This will overwrite the spellbook in the selected slot. Do you want to continue?'
				) == true
			) {
				overwriteId = id;
				$savePrompt = true;
			}
		} else if ($modalCall == 'load') {
			loadBook(id);
		}
	}
</script>

<!-- {#if $modalCall == 'save'} -->
{#if $modalCall}
	<div class="modal_wrapper" bind:this={modal} transition:fade={{ duration: 100 }}>
		<div class="modal {$modalCall}" transition:fly={{ duration: 200, y: 20, delay: 50 }}>
			<button
				class="close_modal"
				on:click={() => {
					$modalCall = '';
					$quickQuery = '';
				}}
			/>
			{#if $modalCall !== 'lookup'}
				<Close on:click={() => ($modalCall = '')} />
			{/if}
			{#if $modalCall == 'welcome'}
				<div class="modal_inner">
					<h2>Welcome!</h2>
					<p>
						I'm so glad you're here. Inky's Spellbook is a project I've been working on on and off
						now for quite some time, and like any "let's see where it goes" project it got
						completely out of hand and it turned into an ambitious plan for a web-app (the one
						you're on now) and an app for mobile devices (next phase).
					</p>
					<p>
						Have a look around, but be warned that there might be scary and dangerous bugs lurking
						around! This app is currently very much in beta, and I would be very thankful if you
						could report any issues or bugs you may encounter. Features requests or ideas are also
						very welcome!
					</p>
					<p>You'll find the bugreport button in the menu. Have fun!</p>
				</div>
			{:else if $modalCall == 'save' || $modalCall == 'load' || $modalCall == 'edit'}
				<div class="modal_inner">
					{#if $modalCall !== 'edit'}
						<div class="bookmark_decal"><i class="ri-bookmark-fill" /></div>
						{#if $savePrompt === false}
							{#if $modalCall == 'save'}
								<h2>Save slots</h2>
								<p>Select a slot to save your open spellbook in:</p>
							{/if}
							{#if $modalCall == 'load'}
								<h2>Saved spellbooks</h2>
								<p>Select which spellbook you would like to load:</p>
							{/if}
							{#if $savedSpellSheets.length > 0}
								<div class="save_slots">
									{#each $savedSpellSheets as spellsheet}
										<SaveSlot data={spellsheet} on:click={() => handleClick(spellsheet.id)} />
									{/each}
								</div>
							{:else}
								<Loading />
							{/if}
						{/if}
					{/if}
					{#if $savePrompt === true || $modalCall === 'edit'}
						<div transition:fly={{ duration: 150, y: 10 }} class="new_save">
							<form on:submit={(e) => handleSave(e)} bind:this={form}>
								<div class="grid name-color">
									<div>
										<label for="name">Spellbook name</label>
										<input
											bind:this={saveName}
											value={$bookToEdit.name ? $bookToEdit.name : ''}
											name="name"
											type="text"
											maxlength="30"
										/>
									</div>
									<div>
										<label for="name">Color</label>
										<input
											type="checkbox"
											name="color"
											style="background-color: {saveColor}"
											on:click={() => (colorPicker = true)}
										/>
										<!-- <button name="color" style="background-color: {saveColor}" on:click={() => (colorPicker = true)} /> -->
										{#if colorPicker}
											<div style="position: relative">
												<Colorpicker bind:selectedColor={saveColor} />
											</div>
										{/if}
									</div>
								</div>
								<div class="grid">
									<div>
										<label for="class">Character class</label>
										<!-- <select bind:this={saveClass} name="class"
											>{@html classOptions}</select
										> -->
										<select bind:this={saveClass} name="class">
											<option value="" disabled selected hidden>Select class</option>
											{#each classes as dndclass}
												{#if $bookToEdit.class == dndclass}
													<option selected value={dndclass}>{dndclass}</option>
												{:else}
													<option value={dndclass}>{dndclass}</option>
												{/if}
											{/each}
										</select>
									</div>
									<div>
										<label for="level">Character level</label>
										<input
											bind:this={saveLevel}
											name="level"
											type="number"
											min="1"
											max="20"
											value={$bookToEdit.level ? $bookToEdit.level : ''}
										/>
									</div>
								</div>
								<label for="description">Spellbook description</label>
								<textarea
									bind:this={saveDescription}
									name="description"
									style="width: 100%"
									rows="4"
									maxlength="185"
									value={$bookToEdit.description ? $bookToEdit.description : ''}
								/>
								<button class="{loadingSave ? 'loading' : ''} button fill accent" type="submit"
									><i class="ri-save-3-line" />Save
									<div><i class="ri-loader-5-line" /></div></button
								>
								<Button
									on:click={(e) => {
										e.preventDefault;
										if ($modalCall === 'edit') {
											$modalCall = '';
											$bookToEdit = '';
											$savePrompt = false;
										} else {
											$savePrompt = false;
										}
									}}
									text="Cancel"
									type="fill"
								/>
							</form>
						</div>
					{/if}
				</div>
			{:else if $modalCall == 'terms'}
				<div class="modal_inner">
					<h2>Terms and conditions</h2>
					<p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC

"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
				</div>
			{:else if $modalCall == 'lookup'}
				<div class="modal_inner">
					<input
						bind:this={quickInput}
						bind:value={$quickQuery}
						on:keydown={handleKeyDown}
						on:click={() => (resultNumber = -1)}
						type="text"
						placeholder="Quick spell lookup..."
					/>
					{#if results}
						<ul tabindex="-1">
							{#each results as spell, i}
								<li>
									<button
										on:click={() => handleLookup(i)}
										on:keydown={handleKeyDown}
										bind:this={result[i]}
										tabindex="0"
									>
										<div>
											<SchoolIcon school={spell.school} />
										</div>
										<div>
											<h3>{spell.name}</h3>
											<p>{spell.type}</p>
										</div>
									</button>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{:else if $modalCall == 'spell'}
				<div class="modal_inner" on:keydown={handleKeyDown}>
					<div
						data-name={$lookupSpell.name}
						class="card item"
						data-castingtime={$lookupSpell.casting_time}
						data-range={$lookupSpell.range}
					>
						<div class="card_inner">
							<div class="block">
								<h3>
									<SchoolIcon school={$lookupSpell.school} />
									<span style="margin-left: .3rem">{$lookupSpell.name}</span>
								</h3>
							</div>
							<div class="block pills">
								<Pill
									label="Casting time"
									text={$lookupSpell.casting_time}
									size="large"
									icon="ri-flashlight-line"
								/>
								<Pill
									label="Range or target"
									text={$lookupSpell.range}
									size="large"
									icon="ri-arrow-right-up-line"
								/>
								<Pill
									label="Duration"
									text={$lookupSpell.duration}
									size="large"
									icon="ri-time-line"
								/>
							</div>
							<div class="block pills">
								<Pill
									label="School of magic"
									text={$lookupSpell.school}
									size="small"
									icon="ri-book-2-line"
								/>

								{#if $lookupSpell.description.toLowerCase().includes('make a ranged spell attack')}
									<Pill
										label="Spell attack"
										text="Ranged spell attack"
										size="small"
										icon="ri-sword-line"
									/>
								{:else if $lookupSpell.description
									.toLowerCase()
									.includes('make a melee spell attack')}
									<Pill
										label="Spell attack"
										text="Melee spell attack"
										size="small"
										icon="ri-sword-line"
									/>
								{:else if $lookupSpell.description.toLowerCase().includes('make a spell attack')}
									<Pill
										label="Spell attack"
										text="Spell attack"
										size="small"
										icon="ri-sword-line"
									/>
								{:else if $lookupSpell.save}
									<Pill
										label="Saving throw"
										text={$lookupSpell.save}
										size="small"
										icon="ri-lifebuoy-line"
									/>
								{/if}
							</div>
							<div class="block description">
								<p>{@html $lookupSpell.description}</p>
							</div>
						</div>
					</div>
				</div>
			{:else if $modalCall == 'spellbook'}
				<div class="modal_inner" on:keydown={handleKeyDown}>
					<div class="card">
						<div class="card_inner">
							<div class="block title">
								<h2>
									<!-- <SchoolIcon school={book.school} /> -->
									<i style="color: {$lookupBook.color}" class="ri-book-mark-line" />
									{$lookupBook.name}
								</h2>
								<br />
								<p style="color: {$lookupBook.color}">
									created by <a
										on:click={() => {
											$modalCall = '';
											$quickQuery = '';
										}}
										style="color: {$lookupBook.color}"
										href="/"><strong>{$lookupBook.creator}</strong></a
									>
								</p>
							</div>
							<div class="block pills">
								<Pill
									label="Character level"
									text="Level {$lookupBook.level}"
									size="large"
									icon="ri-numbers-line"
								/>
								<Pill
									label="Character class"
									text={$lookupBook.class}
									size="large"
									icon="ri-sword-line"
								/>
							</div>
							<div class="block description">
								<p>{@html $lookupBook.description}</p>
							</div>
							<div class="block buttons">
								<Button
									on:click={() => {}}
									text="Open"
									icon="ri-book-open-line"
									type="fill accent"
								/>
								<Button
									on:click={() => {}}
									text="Import"
									icon="ri-folder-download-line"
									type="fill blue"
								/>
							</div>
							<div class="block spells">
								<h3>Spells</h3>
								{#each levels as level, i}
									<div bind:this={levelList[i]}>
										<p class="level"><strong>{levels[i]}</strong></p>
										<ul>
											{#each $lookupBook.list as spell}
												{#if level.includes(spell.level) || (level == 'cantrips' && spell.level == 0)}
													<li>
														<p><SchoolIcon type="small" school={spell.school} /> {spell.name}</p>
													</li>
												{/if}
											{/each}
										</ul>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<svelte:window on:keydown={(e) => (e.key == 'Escape' ? handleKeyDown(e) : '')} />

<!-- {/if} -->
<style lang="scss">
	.modal_wrapper {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(3px);
		z-index: 998;
		display: flex;
		justify-content: center;
		align-items: center;
		.modal {
			height: auto;
			// min-height: 350px;
			max-height: 100vh;
			width: 100%;
			max-width: 800px;
			box-shadow: 0 8px 20px rgba(8, 8, 8, 0.4);
			background-color: var(--spellbg);
			border-radius: 6px;
			position: relative;
			&.load {
				.slot:not(.taken) {
					display: none;
				}
			}
			.close_modal {
				position: fixed;
				width: 100vw;
				height: 100vh;
				left: 0;
				top: 0;
				z-index: -1;
			}
			.modal_inner {
				height: 100%;
				padding: 2rem;
				position: relative;
				background-color: var(--spellbg);
				border-radius: 6px;
				max-height: 90vh;
				overflow-y: auto;
				@media only screen and (max-width: 1024px) {
					max-height: 100vh;
				}
				.bookmark_decal {
					transform: rotate(90deg);
					position: absolute;
					left: -47px;
					z-index: -1;
					top: 0px;
					i {
						font-size: 5rem;
						color: var(--yellow);
					}
				}
				.save_slots {
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
					grid-gap: 0.5rem;
					margin-top: 1rem;
					position: relative;
					z-index: 1;
					// &.placeholder {
					// 	position: absolute;
					// 	left: 0;
					// 	top: 0;
					// 	width: 100%;
					// 	height: 100%;
					// 	pointer-events: none;
					// 	margin-top: 0;
					// }
					// &.placeholder {
					// 	margin: 0;
					// 	position: absolute;
					// 	height: 100%;
					// 	width: 100%;
					// 	top: 0;
					// 	left: 0;
					// 	z-index: -1;
					// }
				}
				.new_save {
					height: auto;
					min-height: 100%;
					width: 100%;
					max-height: 100%;
					padding: 2rem;
					border-radius: 6px;
					background-color: var(--spellbg);
					display: flex;
					align-items: center;
					justify-content: center;
					z-index: 1;
					form {
						max-width: 400px;
						.grid {
							display: grid;
							grid-template-columns: 1fr 150px;
							grid-gap: 1rem;
							&.name-color {
								grid-template-columns: 1fr 41.4px;
								input[type='checkbox'] {
									all: unset;
									cursor: pointer;
									height: 41.4px;
									width: 41.4px;
									padding: 0;
									margin: 0;
									border: none;
									display: block;
									border-radius: 6px;
									// background-color: var(--purple);
								}
							}
						}
						label {
							color: var(--white);
							margin-bottom: 0.25rem;
							display: inline-block;
						}
						button[type='submit'] {
							div {
								position: absolute;
								display: none;
								animation-name: rotate;
								animation-iteration-count: infinite;
								animation-timing-function: linear;
								animation-duration: 0.6s;
								top: -3px;
								width: 100%;
								text-align: center;
								left: 0;
								i {
									font-size: 2rem;
									color: var(--bg);
								}
								@keyframes rotate {
									0% {
										transform: rotate(0deg);
									}
									100% {
										transform: rotate(360deg);
									}
								}
							}
							&.loading {
								color: var(--accent);
								div {
									display: block;
								}
							}
						}
					}
				}
			}
			&.lookup {
				background-color: rgba(0, 0, 0, 0.5);
				// backdrop-filter: blur(10px);
				min-height: 0;
				align-self: flex-start;
				margin-top: 10vh;
				max-width: 600px;
				@media only screen and (max-width: 1024px) {
					margin-top: 0;
				}
				.modal_inner {
					// background-color: transparent;
					input {
						height: 55px;
						margin: 0;
					}
					ul {
						height: 100%;
						width: 100%;
						margin-top: 0.8rem;
						overflow-x: hidden;
						overflow-y: auto;
						position: relative;
						transition: 0.2s;
						max-height: 60vh;
						scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
						// scrollbar-width:;

						li {
							border-bottom: 1px solid rgba(255, 255, 255, 0.15);
							cursor: pointer;
							position: relative;
							transition: 0.1s;
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
								&:focus {
									background-color: rgba(255, 255, 255, 0.15);
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
							&:hover {
								background-color: rgba(255, 255, 255, 0.15);
							}
							&.disabled {
								button {
									opacity: 0.3;
								}
							}
						}
					}
				}
			}
			&.spell {
				min-height: 0;
				max-height: 100vh;
				max-width: 600px;
			}
		}
	}
	.card {
		width: 100%;
		cursor: auto;
		&:hover {
			.card_inner {
				border-color: var(--accent) !important;
			}
		}
		.card_inner {
			padding: 0;
			box-shadow: none;
			border-width: 0px;
			pointer-events: unset;
			.block {
				pointer-events: unset;
				&.title {
					h2 {
						width: 100%;
					}
				}
				&.description {
					height: auto;
					p {
						font-size: 1rem;
					}
					&:after {
						display: none;
					}
				}
				&.buttons {
					margin-top: 1rem;
					display: flex;
					gap: 0.3rem;
				}
				&.spells {
					display: block;
					h3 {
						margin-top: 1rem;
						margin-bottom: -1rem;
					}
					p.level {
						margin-top: 1rem;
					}
					ul {
						display: grid;
						grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
						gap: 0 1rem;
						li {
							p {
								font-size: 0.9rem;
								margin-bottom: 0;
							}
						}
					}
				}
			}
		}
	}
</style>
