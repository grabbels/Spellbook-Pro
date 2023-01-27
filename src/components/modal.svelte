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
		lookupSpell
	} from './stores';
	import {
		retrieveSession,
		loadSpellsheetsByUserId,
		classOptions,
		refreshList
	} from './globalfunctions.svelte';
	import Pill from './pill.svelte';
	import Button from './button.svelte';
	import { supabaseClient } from '$lib/db';
	import { activeSpells } from './stores-persist';
	import Close from './close.svelte';
	import SchoolIcon from './schoolicon.svelte';
	export let modal;
	let savePrompt = false;
	let loadingSave;
	let saveName;
	let saveLevel;
	let saveClass;
	let saveDescription;
	let overwriteId;
	let saveForm;
	let listLength;
	let quickInput;
	let results;
	let result = [];
	$: $modalCall, ($quickQuery = '');
	// $modalCall = 'save';
	let placeholderTiles = [1, 2, 3, 4, 5, 6, 7, 8];
	if ($modalCall == 'save' || 'load') {
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
	});
	$: listLength = $savedSpellSheets.length;
	// function newSave() {
	// 	savePrompt = true;
	// }
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
	}

	async function handleSave(e) {
		e.preventDefault;
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
					user_id: $userId
				})
				.select();
			if (error) {
				console.log(error);
				$notification = 'Oops, an error occurred. Error code: ' + error.code + '#error';
			} else if (data) {
				console.log('test');
				$notification = 'Spellbook saved.#info';

				overwriteId = '';
				savePrompt = false;
				$topmenuopen = false;
				// loadSpellsheetsByUserId($userId);
				$modalCall = '';
				$modalCall = $modalCall;
			}
		}
	}

	async function handleClick(id) {
		if ($modalCall == 'save') {
			if (
				confirm(
					'This will overwrite the spellbook in the selected slot. Do you want to continue?'
				) == true
			) {
				overwriteId = id;
				savePrompt = true;
			}
		} else if ($modalCall == 'load') {
			if (
				confirm(
					'This will wipe your current spellbook, you can save your current spellbook before loading another one.'
				) == true
			) {
				const { data, error } = await supabaseClient.from('spellbooks').select().eq('id', id);
				if (error) {
					console.log(error);
					$notification = 'Oops, an error occurred. Error code: ' + error.code + '#error';
				} else if (data) {
					$activeSpells = data[0].list;
					refreshList();
					$modalCall = '';
					$modalCall = $modalCall;
					$topmenuopen = false;
				}
			} else {
				console.log('nope');
				$modalCall = 'save';
			}
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
			{#if $modalCall == 'save' || $modalCall == 'load'}
				<div class="modal_inner">
					<div class="bookmark_decal"><i class="ri-bookmark-fill" /></div>

					{#if $modalCall == 'save'}
						<h2>Save slots</h2>
						<p>Select a slot to save your spellbook in:</p>
					{/if}
					{#if $modalCall == 'load'}
						<h2>Saved spellbooks</h2>
						<p>Select which spellbook you would like to load:</p>
					{/if}
					<div class="save_slots">
						{#each $savedSpellSheets as spellsheet, i}
							<button
								transition:fade={{ duration: 100 }}
								data-id={spellsheet.id}
								class="slot taken"
								on:click={() => handleClick(spellsheet.id)}
							>
								<h3>{spellsheet.name}</h3>
								<Pill text={spellsheet.class} size="small" icon="ri-contacts-line" />
								<Pill text="Level {spellsheet.level}" size="small" icon="ri-user-star-line" />
							</button>
						{/each}
						{#if listLength == 0 || $savedSpellSheets.length < 9 && $modalCall == 'save'}
							<button class="slot add" on:click={() => (savePrompt = true)}
								><i class="ri-add-line" /></button
							>
						{/if}

						<!-- {#each (placeholderTiles.length - $savedSpellSheets.length) as placeholder}
							<div class="slot placeholder"></div>
						{/each} -->
						{#if $modalCall == 'save'}
							<div class="save_slots placeholder">
								{#each placeholderTiles as tile}
									<div class="slot placeholder" />
								{/each}
							</div>
						{/if}
					</div>

					{#if savePrompt === true}
						<div transition:fly={{ duration: 150, y: 10 }} class="new_save">
							<form bind:this={saveForm} on:submit={(e) => handleSave(e)}>
								<label for="name">Spellbook name</label>
								<input bind:this={saveName} name="name" type="text" maxlength="30" />
								<div class="grid">
									<div>
										<label for="class">Character class</label>
										<select bind:this={saveClass} name="class">{@html classOptions}</select>
									</div>
									<div>
										<label for="level">Character level</label>
										<input
											bind:this={saveLevel}
											name="level"
											type="number"
											min="1"
											max="20"
											value=""
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
								/>
								<button class="{loadingSave ? 'loading' : ''} button fill accent" type="submit"
									><i class="ri-save-3-line" />Save
									<div><i class="ri-loader-5-line" /></div></button
								>
								<Button
									on:click={(e) => {
										e.preventDefault;
										savePrompt = false;
									}}
									text="Cancel"
									type="fill"
								/>
							</form>
						</div>
					{/if}
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
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 998;
		display: flex;
		justify-content: center;
		align-items: center;
		.modal {
			height: auto;
			min-height: 350px;
			width: 100%;
			max-width: 800px;
			box-shadow: 0 5px 20px rgba(2, 2, 2, 0.6);
			background-color: var(--spellbg);
			border-radius: 6px;
			position: relative;
			.close_modal {
				position: fixed;
				width: 100vw;
				height: 100vh;
				left: 0;
				top: 0;
				z-index: -1;
			}
			.modal_inner {
				padding: 2rem;
				position: relative;
				background-color: var(--spellbg);
				border-radius: 6px;
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
					&.placeholder {
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
						pointer-events: none;
						margin-top: 0;
					}
					.slot {
						background-color: var(--moretranslucent);
						border-radius: 6px;
						aspect-ratio: 1 / 1.15;
						position: relative;
						margin: 0;
						transition: 0.1s;
						border: 2px solid transparent;
						padding: 0.5rem;
						&.add {
							background-color: transparent;
						}
						h3 {
							line-height: 1.3;
							margin-bottom: 0.5rem;
						}

						i {
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translate(-50%, -50%);
							font-size: 3rem;
							color: var(--moretranslucent);
							transition: 0.1s;
						}
						&:hover {
							background-color: rgba(255, 255, 255, 0.2);
							border-color: var(--accent);
							i {
								color: var(--translucent);
							}
						}
						&.taken {
							background-color: var(--purple);
						}
					}
				}
				.new_save {
					position: absolute;
					left: 0;
					top: 0;
					height: auto;
					min-height: 100%;
					width: 100%;
					padding: 2rem;
					border-radius: 6px;
					background-color: var(--spellbg);
					display: flex;
					align-items: center;
					justify-content: center;
					form {
						max-width: 400px;
						.grid {
							display: grid;
							grid-template-columns: 1fr 150px;
							grid-gap: 1rem;
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
				overflow-y: auto;
				overflow-x: hidden;
			}
		}
	}
	.card {
		cursor: auto;
		.card_inner {
			padding: 0;
			box-shadow: none;
			border-width: 0px;
			.block {
				&.description {
					height: auto;
					p {
						font-size: 1rem;
					}
					&:after {
						display: none;
					}
				}
			}
		}
	}
</style>
