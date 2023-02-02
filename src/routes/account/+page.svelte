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
		userEmail
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
	import { onMount } from 'svelte';
	import Loading from '../../components/loading.svelte';
	// let savedSpellSheets = [];
	let openCard = null;
	// let userId;
	let editButtonText = 'Edit details';
	let editing = false;

	onMount(() => {
		loadSpellsheetsByUserId($userId);
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

	function editNickname() {}

	function editEmail() {}

	function editPassword() {}

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
	<div class="panel">
		<h2>My Account</h2>
		{#if $userNickname}
			<h1>Hi, {$userNickname}!</h1>
		{/if}
	</div>
	<div class="grid">
		<div class="panel spellsheets">
			<h2>Saved spellbooks</h2>
			<!-- {#key $savedSpellSheets} -->
			{#if $savedSpellSheets.length < 1}
			<Loading />
			{:else if $savedSpellSheets == 'none'}
				<p>You have no saved spellbooks yet!</p>
			{:else}
			<div class="save_slots">
				{#each $savedSpellSheets as spellsheet}
					<SaveSlot data={spellsheet} type="large" />
				{/each}
			</div>
			{/if}
			<!-- {/key} -->
		</div>
		<div class="panel details">
			<h2>Acccount information</h2>

			<form>
				{#if $userNickname}
					<div>
						<label for="nickname">Nickname</label>
						<input type="text" name="nickname" value={$userNickname} disabled />
						<button on:click={editNickname}> <i class="ri-edit-2-line" /> </button>
					</div>
				{/if}
				{#if $userEmail}
					<div>
						<label for="email">Email address</label>
						<input type="text" name="email" value={$userEmail} disabled />
						<button on:click={editEmail}> <i class="ri-edit-2-line" /> </button>
					</div>
				{/if}
			</form>

			<Button
				text="Change password"
				on:click={editPassword}
				type="fill"
				icon="ri-lock-password-line"
			/>
		</div>
	</div>
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
				form {
					div {
						position: relative;
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
						button {
							position: absolute;
							right: -3px;
							top: 22px;

							i {
								color: white;
							}
							&:hover {
								i {
									color: var(--accent);
								}
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
