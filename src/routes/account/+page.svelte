<script>
	import {
		pagetitle,
		session,
		notification,
		savedSpellSheets,
		modalCall,
		savePrompt
	} from '../../components/stores';
	import { fade } from 'svelte/transition';
	import { activeSpells, loggedIn } from '../../components/stores-persist';
	import Section from '../../components/section.svelte';
	import {
		retrieveSession,
		loadSpellsheetsByUserId,
		classOptions
	} from '../../components/globalfunctions.svelte';
	import { supabaseClient } from '$lib/db';
	import Pill from '../../components/pill.svelte';
	import Button from '../../components/button.svelte';
	import { goto } from '$app/navigation';
	import Close from '../../components/close.svelte';
	import SaveSlot from '../../components/saveslot.svelte';
	// let savedSpellSheets = [];
	let openCard = null;
	let userId;
	let userNickname;
	let userEmail;
	let editButtonText = 'Edit details';
	let editing = false;
	if ($session) {
		userId = $session.user.id;
		userNickname = $session.user.user_metadata.nickname;
		userEmail = $session.user.email;
		loadSpellsheetsByUserId(userId);
	} else {
		let promiseSession = retrieveSession();
		promiseSession.then((value) => {
			if (value) {
				$session = value;
				userId = value.user.id;
				userNickname = value.user.user_metadata.nickname;
				userEmail = value.user.email;
				loadSpellsheetsByUserId(userId);
			}
		});
	}

	function handleClick(id) {
		$modalCall = 'edit';
		$savePrompt = true;
	}

	$pagetitle = 'My account';
	function openClickedCard(event, spellsheet) {
		if (savedSpellSheets.length > 2) {
			openCard === spellsheet ? (openCard = null) : (openCard = spellsheet);
		} else {
			event.target.classList.contains('open') ? (openCard = null) : (openCard = spellsheet);
		}
	}
	// async function editBookDetails(e) {
	// 	let thisCardInner;
	// 	if (e.target.classList.contains('cancel')) {
	// 		thisCardInner = e.target.parentElement.parentElement.parentElement.parentElement;
	// 	} else if (e.target.classList.contains('close_veil')) {
	// 		thisCardInner = e.target.previousElementSibling;
	// 	} else {
	// 		thisCardInner = e.target.parentElement.parentElement.parentElement;
	// 	}
	// 	let description = thisCardInner.querySelector('p');
	// 	let title = thisCardInner.querySelector('h3');
	// 	let levelPill = thisCardInner.querySelector('.pill:not(.label):nth-child(2)');
	// 	let classPill = thisCardInner.querySelector('.pill:not(.label):nth-child(1)');
	// 	let pills = thisCardInner.querySelector('.pills');
	// 	let editPills = thisCardInner.querySelector('.edit-pills');
	// 	if (editing === false && !e.target.classList.contains('close_veil')) {
	// 		//Start editing
	// 		editing = true;
	// 		editButtonText = 'Save changes';
	// 		thisCardInner.classList.add('editing');

	// 		//title
	// 		let currentTitle = title.innerText;
	// 		let titleInput = document.createElement('input');
	// 		titleInput.value = currentTitle;
	// 		title.after(titleInput);
	// 		title.style.display = 'none';

	// 		//description
	// 		let currentText = description.innerText;
	// 		let descriptionInput = document.createElement('textarea');
	// 		descriptionInput.setAttribute('maxlength', '185');
	// 		descriptionInput.value = currentText;
	// 		description.after(descriptionInput);
	// 		description.style.display = 'none';

	// 		//level
	// 		let currentLevel = levelPill.querySelector('span').innerText.split(' ')[1];
	// 		let editPills = document.createElement('div');
	// 		editPills.classList = 'edit-pills';
	// 		editPills.innerHTML =
	// 			'<div><label for="class">Class</label><select name="class">' +
	// 			classOptions +
	// 			'</select></div><div><label for="level">Level</label><input type="number" value="' +
	// 			currentLevel +
	// 			'" name="level" max="20" min="1"></div>';
	// 		pills.after(editPills);
	// 		pills.style.display = 'none';
	// 	} else {
	// 		//Stop editing
	// 		let titleInput = thisCardInner.querySelectorAll('input')[0];
	// 		let descriptionInput = thisCardInner.querySelector('textarea');
	// 		if (e.target.classList.contains('save')) {
	// 			//save editing
	// 			title.innerText = titleInput.value;
	// 			description.innerText = descriptionInput.value;
	// 			levelPill.querySelector('span').innerText =
	// 				'Level ' + editPills.querySelector('input').value;
	// 			classPill.querySelector('span').innerText = editPills.querySelector('select').value;
	// 			const { error } = await supabaseClient
	// 				.from('spellbooks')
	// 				.update({
	// 					name: titleInput.value,
	// 					class: classPill.querySelector('span').innerText,
	// 					level: editPills.querySelector('input').value,
	// 					description: descriptionInput.value
	// 				})
	// 				.eq('id', thisCardInner.getAttribute('data-id'));
	// 			if (error) {
	// 				console.log(error);
	// 			}
	// 		}
	// 		titleInput.remove();
	// 		descriptionInput.remove();
	// 		editPills.remove();
	// 		pills.style.display = 'block';
	// 		description.style.display = 'block';
	// 		title.style.display = 'block';
	// 		editButtonText = 'Edit details';
	// 		editing = false;
	// 		thisCardInner.classList.remove('editing');
	// 	}
	// }

	async function removeSpellsheet(e, i) {
		let spellbookId = e.target.closest('.card_inner').getAttribute('data-id');
		if (
			confirm('Are you sure you want to remove this spellbook? This action is irreversable.') ==
			true
		) {
			e.target.closest('.card_inner').remove();
			const { error } = await supabaseClient.from('spellbooks').delete().eq('id', spellbookId);
			if (error) {
				console.log(error);
			}
		}
	}

	function loadSpellsheet(i) {
		if (
			confirm(
				'Are you sure you want to load this spellbook? This will remove your current spellbook.'
			) == true
		) {
			$activeSpells = $savedSpellSheets[i].list;
			goto('/');
			$notification = 'Spellbook "' + $savedSpellSheets[i].name + '" loaded.#info';
		}
	}
</script>

<Section name="my-account">
	<div class="panel">
		<h2>My Account</h2>
		{#if userNickname}
			<h1>Hi, {userNickname}!</h1>
		{/if}
	</div>
	<div class="grid">
		<div class="panel spellsheets">
			<h2>Saved spellbooks</h2>

			<div class="save_slots">
				{#each $savedSpellSheets as spellsheet}
					<SaveSlot data={spellsheet} on:click={() => handleClick(spellsheet.id)} />
				{/each}
			</div>

			<!-- <div class="grid">
				{#each $savedSpellSheets as spellsheet, i}
					<div
						class="card spellbook {openCard === spellsheet ? 'open' : ''}"
						on:click|self={() => {
							openCard = spellsheet;
						}}
						in:fade={{ duration: 200 }}
					>
						<div class="card_inner" data-id={spellsheet.id}>
							<Close on:click={() => (openCard = null)} />
							<div class="wrapper_preview">
								<div class="block">
									<h3>{spellsheet.name}</h3>
								</div>
								<div class="block pills">
									<Pill
										label="Class"
										text={spellsheet.class}
										size="large"
										icon="ri-contacts-line"
									/>

									<Pill
										label="Character level"
										text="Level {spellsheet.level}"
										size="large"
										icon="ri-user-star-line"
									/>
								</div>
							</div>
							<div class="wrapper_extended">
								<p style="margin: 1rem 0" data-max-length="200">{spellsheet.description}</p>
								<div class="buttons">
									<Button
										on:click={() => loadSpellsheet(i)}
										text="Load spellbook"
										type="fill accent"
										icon="ri-folder-open-line"
									/>
									{#if spellsheet.published === false}
										<Button text="Publish spellbook" type="fill blue" icon="ri-share-line" />
									{:else if spellsheet.published === true}
										<Button text="Make private" type="alt outline" icon="ri-lock-line" />
									{/if}
									<Button
										on:click={(e) => editBookDetails(e)}
										text={editButtonText}
										type="fill save"
										icon="ri-edit-line"
									/>
									<Button
										on:click={(e) => removeSpellsheet(e, i)}
										text="Delete spellbook"
										type="fill alt"
										icon="ri-delete-bin-line"
									/>
									<div>
										<Button
											text="Cancel"
											type="outline cancel"
											icon="ri-close-line"
											on:click={(e) => editBookDetails(e)}
										/>
									</div>
								</div>
							</div>
						</div>
						<button
							style="z-index: 1"
							class="close_veil"
							on:click={(e) => {
								openCard = null;
								editBookDetails(e);
							}}
						/>
					</div>
				{/each}
			</div> -->
		</div>
		<div class="panel details">
			<h2>Acccount information</h2>

			<form>
				{#if userNickname}
					<label for="nickname">Nickname</label>
					<input type="text" name="nickname" value={userNickname} disabled />
				{/if}
				{#if userEmail}
					<label for="email">Email address</label>
					<input type="text" name="email" value={userEmail} disabled />
				{/if}
			</form>

			<Button text="Change password" type="fill" icon="ri-lock-password-line" />
			<!-- <Button text="Change password" type="fill" icon="ri-share-line" /> -->
		</div>
	</div>
</Section>

<style lang="scss">
	.save_slots {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		grid-gap: 0.5rem;
		margin-top: 1rem;
		position: relative;
		z-index: 1;
		button {
			box-shadow: 10px 10px 0 black;
		}
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
	.grid {
		display: grid;
		grid-template-columns: 1fr 400px;
		grid-gap: 2rem;

		.panel {
			h2 {
				opacity: 0.85;
			}
			&.details {
				form {
					label {
						color: white;
					}
					input {
						transition: 0.1s;
						border: 2px solid transparent;
						&:hover {
							border: 2px solid var(--accent);
						}
					}
				}
			}
			&.spellsheets {
				min-height: 245px;
			}
			.grid {
				grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
				grid-gap: 1rem;
				.card {
					// aspect-ratio: 3 / 1;
					// height: 200px;
					.card_inner {
						height: 100%;
						width: 100%;
						display: table;
						z-index: 1;
						padding-bottom: 2.25rem;
						// transition: 0.3s;
						.block {
							pointer-events: none;
						}
						.wrapper_extended {
							position: absolute;
							margin-top: 1rem;
							width: 100%;
							pointer-events: none;
							height: 0;
							overflow-y: hidden;
							width: 400px;
							.buttons {
								display: grid;
								grid-template-columns: 1fr 1fr;
								grid-gap: 0 0.2rem;
								div {
									display: none;
									width: 100%;
								}
							}
						}
						&:global(.editing) {
							padding-top: 2rem;
							:global(.block:first-child) {
								:global(input) {
									margin-bottom: 0.5rem;
									// margin-top: 1rem;
								}
							}
							:global(.wrapper_extended) {
								:global(textarea) {
									background-color: var(--translucent);
									border-radius: 6px;
									height: 100px;
									width: 100%;
									color: white;
									border: none;
									resize: none;
									margin-bottom: 1rem;
								}
							}
							:global(.edit-pills) {
								display: grid;
								grid-template-columns: 1fr 1fr;
								grid-gap: 1rem;
								margin-top: 0.5rem;
								:global(div) {
									display: flex;
									:global(label) {
										display: inline-block;
										color: white;
										height: 100%;
										background-color: var(--primary);
										border-radius: 6px 0 0 6px;
										padding-left: 0.75rem;
										padding-top: 0.55rem;
										padding: 0.55rem 0.75rem;
										font-size: 0.9rem;
									}
									:global(input) {
										display: inline-block;
										margin-bottom: 0;
										border-radius: 0 6px 6px 0;
									}
									:global(select) {
										display: inline-block;
										margin-bottom: 0;
										border-radius: 0 6px 6px 0;
									}
								}
							}
							:global(button:not(:nth-child(3))) {
								display: none;
							}
							// :global(button:nth-child(3)) {
							// 	background-color: var(--accent);
							// 	color: var(--bg);
							// 	&:hover {
							// 		background-color: var(--lightblue);
							// 		border-color: var(--lightblue);
							// 	}
							// }
							:global(.buttons) {
								:global(div) {
									display: grid !important;
									:global(button) {
										display: inline-block;
										margin-left: 0.5rem;
									}
								}
							}
						}
					}
					&.open {
						.card_inner {
							position: absolute;
							top: 0;
							left: 0;
							max-width: 400px;
							transform: scale(1.02);
							z-index: 2;
							pointer-events: all;
							border-color: transparent !important;
							cursor: auto;
							.wrapper_extended {
								position: relative;
								pointer-events: all;
								height: auto;
								overflow-y: visible;
							}
							.block {
								pointer-events: all;
							}
						}
						.close {
							display: block;
							z-index: 2;
						}
					}
				}
			}
		}
	}
</style>
