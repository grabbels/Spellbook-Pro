<script>
	import {
		pagetitle,
		session,
		notification,
		savedSpellSheets,
		modalCall,
		savePrompt,
		userId,
		userNickname,
		userEmail,
		lookupBook
	} from '../../components/stores/stores';
	import { activeSpells } from '../../components/stores/stores-persist';
	import Section from '../../components/section.svelte';
	import {
		loadSpellsheetsByUserId,
		editPassword,
		refreshSession,
		setUserData
	} from '../../components/functions/globalfunctions.svelte';
	import Button from '../../components/button.svelte';
	import { goto } from '$app/navigation';
	import SaveSlot from '../../components/saveslot.svelte';
	import { onMount } from 'svelte';
	import Loading from '../../components/loading.svelte';
	import { currentUser, pb } from '$lib/pocketbase';
	import Filter from 'bad-words';
	let filter = new Filter();
	// let savedSpellSheets = [];
	let openCard = null;
	// let userId;
	let editButtonText = 'Edit details';
	let editing = false;
	let loading = false;
	onMount(() => {
		// if ($currentUser) {
		loadSpellsheetsByUserId($userId);
		// }
	});

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
	let editingNickname = false;
	let newNickname;
	let allowed = /^[a-zA-Z0-9]*-?[a-zA-Z0-9]*$/;
	async function saveNickname() {
		if (!filter.clean(newNickname).includes('*')) {
			if (
				allowed.test(newNickname) &&
				newNickname.indexOf('-') != 0 &&
				newNickname.charAt(newNickname.length - 1) != '-' &&
				newNickname.length > 3
			) {
				loading = true;
				const data = {
					username: newNickname
				};
				try {
					const record = await pb.collection('users').update($userId, data);
					if (record) {
						setUserData();
					}
				} catch (err) {
					loading = false;
					console.log(err.data);
					$notification = err.data.message + ' Error code: ' + err.data.code + '#error';
				}

				for (let i = 0; i < $savedSpellSheets.length; i++) {
					if ($savedSpellSheets[i].id && $savedSpellSheets[i].id != 'add') {
						const data = {
							creator: newNickname
						};
						try {
							const record = await pb
								.collection('spellbooks')
								.update($savedSpellSheets[i].id, data);
							console.log(record);
						} catch (err) {
							console.log(err.data);
							$notification = err.data.message + ' Error code: ' + err.data.code + '#error';
						}
					}
				}
				$notification = 'Nickname succesfully changed.#positive';
				loading = false;
				editingNickname = false;
			} else {
				$notification =
					'Your nickname may only contain letters, numbers and at most one hypen (not at the start or end) and should be at least 4 characters long.#alert';
			}
		} else {
			$notification = 'Your nickname contains profanity. Please choose a different nickname.#alert';
		}
	}
	let editingEmail = false;
	let newEmail;
	async function changeEmail() {
		loading = true;
		try {
			await pb.collection('users').requestEmailChange(newEmail);
			$notification =
				'Please confirm your email address change using the link that has just been emailed to you.#info';
			loading = false;
			editingEmail = false;
		} catch (err) {
			$notification = err.data.message + ' Error code: ' + err.data.code + '#error';
			console.log(err);
			loading = false;
		}
	}

	// async function removeSpellsheet(e, i) {
	// 	let spellbookId = e.target.closest('.card_inner').getAttribute('data-id');
	// 	if (
	// 		confirm('Are you sure you want to remove this spellbook? This action is irreversable.') ==
	// 		true
	// 	) {
	// 		e.target.closest('.card_inner').remove();
	// 		const { error } = await supabaseClient.from('spellbooks').delete().eq('id', spellbookId);
	// 		if (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// }

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
	{#if $currentUser}
		<div class="panel">
			<h2>My Account</h2>
			{#if $userNickname}
				<h1>Hi, {$userNickname}!</h1>
			{/if}
		</div>
		<div class="grid">
			<div class="panel spellsheets">
				<h2 style="margin-bottom: 0">Saved spellbooks</h2>
				<p style="margin-left: .2rem; opacity: .5">click to view and edit</p>
				<!-- {#key $savedSpellSheets} -->
				{#if $savedSpellSheets.length < 1}
					<Loading />
				{:else if $savedSpellSheets == 'none'}
					<p>You have no saved spellbooks yet!</p>
				{:else if !$savedSpellSheets[0].list}
					<p>You have no saved spellbooks yet!</p>
				{:else}
					<div class="save_slots">
						{#key $savedSpellSheets}
							{#each $savedSpellSheets as spellsheet}
								<SaveSlot
									data={spellsheet}
									type="large account"
									on:click={() => {
										$modalCall = 'spellbook';
										$lookupBook = spellsheet;
									}}
								/>
							{/each}
						{/key}
					</div>
				{/if}
				<!-- {/key} -->
			</div>
			<div class="panel details dark">
				<h2>Acccount information</h2>
				{#if $userNickname}
					<div>
						<form
							on:submit|preventDefault={() => {
								saveNickname();
							}}
						>
							<label for="nickname">Nickname</label>
							{#if editingNickname}
								<!-- svelte-ignore a11y-autofocus -->
								<input
									required
									type="text"
									name="nickname"
									placeholder="New nickname"
									autofocus
									bind:value={newNickname}
								/>
								<div style="margin-bottom: 1rem">
									<button class="{loading ? 'loading' : ''} fill accent" type="submit"
										><i class="ri-checkbox-circle-line" />Save
										<div><i class="ri-loader-5-line" /></div></button
									>
									<Button
										on:click={() => (editingNickname = false)}
										text="Cancel"
										type="outline alt"
										icon="ri-close-circle-line"
									/>
								</div>
							{:else}
								<input type="text" name="nickname" value={$userNickname} disabled />
								<button class="edit" on:click={() => (editingNickname = true)}>
									<i class="ri-edit-2-line" />
								</button>
							{/if}
						</form>
					</div>
				{/if}
				{#if $userEmail}
					<div style="margin-bottom: 1rem">
						<form
							on:submit|preventDefault={() => {
								changeEmail();
							}}
						>
							<label for="email">Email address</label>
							{#if editingEmail}
								<!-- svelte-ignore a11y-autofocus -->
								<input
									required
									type="email"
									name="email"
									placeholder="New email"
									autofocus
									bind:value={newEmail}
								/>
								<div style="margin-bottom: 1rem">
									<button class="{loading ? 'loading' : ''} fill accent" type="submit"
										><i class="ri-checkbox-circle-line" />Save
										<div><i class="ri-loader-5-line" /></div></button
									>
									<Button
										on:click={() => (editingEmail = false)}
										text="Cancel"
										type="outline alt"
										icon="ri-close-circle-line"
									/>
								</div>
							{:else}
								<input type="text" name="email" value={$userEmail} disabled />
								<button class="edit" on:click={() => (editingEmail = true)}>
									<i class="ri-edit-2-line" />
								</button>
							{/if}
						</form>
					</div>
				{/if}

				<Button
					text="Change password"
					on:click={() => editPassword($userEmail)}
					type="fill"
					icon="ri-lock-password-line"
				/>
			</div>
		</div>
	{:else}
		<div class="panel">
			<p>You need to be logged in to use this page.</p>
			<Button href="/account/login" type="outline" text="Log in" icon="ri-login-circle-line" />
			<Button
				href="/account/login?register=true"
				type="outline"
				text="Register"
				icon="ri-user-add-line"
			/>
		</div>
	{/if}
</Section>

<style lang="scss">
	.save_slots {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		grid-gap: 0.5rem;
		margin-top: 1rem;
		position: relative;
		z-index: 1;
	}
	.grid {
		display: grid;
		grid-template-columns: 1fr 400px;
		grid-gap: 2rem;
		@media only screen and (max-width: 1200px) {
			grid-template-columns: 1fr;
			grid-gap: 0;
		}
		.panel {
			h2 {
				opacity: 0.85;
			}
			&.details {
				div {
					position: relative;
					label {
						color: var(--white);
					}
					input {
						transition: 0.1s;
						border: 2px solid transparent;
						&:hover {
							border: 2px solid var(--accent);
						}
					}
					button.edit {
						position: absolute;
						right: -3px;
						top: 22px;

						i {
							color: var(--white);
						}
						&:hover {
							i {
								color: var(--accent);
							}
						}
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
			&.spellsheets {
				min-height: 245px;
			}
		}
	}
</style>
