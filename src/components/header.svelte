<script>
	import { fade } from 'svelte/transition';
	import Section from '../components/section.svelte';
	import Button from '../components/button.svelte';
	import {
		pagetitle,
		session,
		modalCall,
		quickQuery,
		spellListEmpty,
		notification,
		editingTitle
	} from './stores/stores';
	import { activeTab, loggedIn, userNickname, openSpellbooks } from './stores/stores-persist';
	import {
		topMenuOpenClose,
		sideMenuOpenClose,
		handleLogOut,
		newBook,
		handleSave,
		handleLoad,
		updateBook
	} from './functions/globalfunctions.svelte';
	import { currentUser } from '$lib/pocketbase';
	import { is_function } from 'svelte/internal';
	let bookTitle, titleInput;
	function handleNew() {}
	async function editName() {
		if ($editingTitle === true) {
			let updateDone = await updateBook($activeTab.id, 'name', titleInput.value);
			if (updateDone) {
				console.log(updateDone);
			}
			bookTitle.text = titleInput.value;
			$editingTitle = false;
		} else {
			$editingTitle = true;
			setTimeout(() => {
				titleInput.focus();
				titleInput.select();
			}, 1);
			console.log(titleInput);
		}
	}
</script>

<Section name="header">
	<header>
		{#key $activeTab.name}
			{#key $pagetitle}
				<div class="title_wrapper" class:editing={$editingTitle}>
					<h1 bind:this={bookTitle} class:editing={$editingTitle} in:fade={{ duration: 200 }}>
						{#if $pagetitle !== 'Home'}
							{$pagetitle}
						{:else if $openSpellbooks.length < 1}
							Spellbook Pro
						{:else}
							{$activeTab.name ? $activeTab.name : 'Untitled spellbook'}
						{/if}
					</h1>
					<input
						bind:this={titleInput}
						class:editing={$editingTitle}
						on:keydown={(e) => e.key == 'Enter' ? editName() : ''}
						type="text"
						value={$activeTab.name}
					/>
					{#if $pagetitle == 'Home' && $openSpellbooks.length > 0}
					<button class:editing={$editingTitle} on:click={editName}
						><i class="ri-edit-line" /><i class="ri-save-3-line" />
					</button>
					{/if}
				</div>
			{/key}
		{/key}

		<div class="header_inner">
			<div class="header_left">
				{#if $pagetitle === 'Home'}
					<Button
						disabled={$openSpellbooks.length < 1 ? true : false}
						href=""
						on:click={sideMenuOpenClose}
						type="fill accent"
						icon="ri-add-line"
						text="Add spells"
					/>
				{/if}
				{#if $pagetitle === 'Premade spellbooks' || $pagetitle === 'My account'}
					<Button text="Spellbook" href="/" type="fill accent" icon="ri-arrow-left-s-line" />
				{/if}
				{#if $pagetitle == 'My account' && $currentUser}
					<Button
						on:click={handleLogOut}
						type="fill mobile"
						icon="ri-logout-circle-r-line"
						text="Log out"
					/>
				{/if}
				{#if $pagetitle === 'Home'}
					<Button
						on:click={newBook}
						href=""
						type="fill desktop"
						icon="ri-health-book-line"
						text="New"
					/>
					<Button
						on:click={handleLoad}
						href=""
						type="fill desktop"
						icon="ri-folder-open-line"
						text="Open"
					/><Button
						disabled={$spellListEmpty}
						on:click={() => handleSave($activeTab.id)}
						href=""
						type="fill desktop"
						icon="ri-save-3-line"
						text="Save"
					/>
					<Button
						href=""
						on:click={() => topMenuOpenClose()}
						type="outline"
						icon="ri-menu-2-line"
						text="menu"
					/>
				{/if}
			</div>
			<div class="header_right">
				<input
					readonly
					type="text"
					placeholder="Quick spell lookup..."
					on:focus={() => ($modalCall = 'lookup')}
				/>

				{#if $currentUser && $pagetitle !== 'My account'}
					<Button
						type="fill desktop"
						icon="ri-contacts-book-2-line"
						text="Account"
						href="/account"
					/>
				{:else if $pagetitle == 'My account' && $currentUser}
					<Button
						on:click={handleLogOut}
						type="fill desktop"
						icon="ri-logout-circle-r-line"
						text="Log out"
					/>
				{:else if !$currentUser}
					<Button
						type="fill desktop"
						href="/account/login"
						icon="ri-login-circle-line"
						text="Log in"
					/>
				{/if}
				{#if $pagetitle === 'Home' || $pagetitle === 'My account'}
					<Button href="/browse" type="fill blue desktop" icon="ri-dashboard-fill" text="Premade" />
				{/if}
				<!-- <Button type="fill dark-mode" icon="ri-moon-line" text="dark mode" /> -->
			</div>
		</div>
	</header>
</Section>

<style lang="scss">
	header {
		margin-top: 2rem;
		width: 100%;
		@media only screen and (max-width: 1024px) {
			margin-top: 1rem;
		}
		.title_wrapper {
			position: relative;
			display: inline-block;
			&.editing {
				display: grid;
				grid-template-columns: 1fr 35px;
			}
			button {
				all: unset;
				cursor: pointer;
				display: none;
				z-index: 2;
				user-select: none;
				vertical-align: 2px;
				i {
					color: var(--white);
					font-size: 1.6rem;
				}
				.ri-save-3-line {
					display: none;
				}
				&.editing {
					display: inline-block;
					margin-left: 0.5rem;
					vertical-align: -1px;
					margin-bottom: 1rem;
					.ri-save-3-line {
						display: inline-block;
					}
					.ri-edit-line {
						display: none;
					}
				}
				&:hover {
					i {
						color: var(--accent);
					}
				}
			}
			&:hover {
				button {
					display: inline-block;
				}
			}
			input {
				display: none;
				width: auto;
				&.editing {
					display: inline-block;
				}
			}
			h1 {
				display: inline-block;
				margin-bottom: 1rem;
				position: relative;
				cursor: default;
				@media only screen and (max-width: 1024px) {
					span {
						display: block;
						width: 100%;
					}
				}
				&:after {
					display: none;
					content: '';
					position: absolute;
					border-radius: 6px;
					left: -0.3rem;
					top: -0.3rem;
					bottom: -0.3rem;
					right: -0.3rem;
					background-color: var(--moretranslucent);
				}
				&.editing {
					display: none;
				}
			}
		}

		.header_inner {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			width: 100%;
			align-items: flex-end;
			.header_right,
			.header_left {
				display: flex;
				gap: 0.2rem;
				flex-shrink: 0;
			}
			.header_middle {
				flex-shrink: 1;
			}
			h1 {
				margin-bottom: 1rem;
			}
			input {
				margin-bottom: 0;
				width: 250px;
				height: 46.4px;
				display: inline-block;
				border: 2px solid transparent;
			}
		}
	}

	@media only screen and (max-width: 950px) {
		header {
			.header_inner {
				.header_left,
				.header_right {
					width: 100%;
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 0.5rem;
				}
				.header_right {
					input {
						grid-column-start: 1;
						grid-column-end: 3;
						width: 100%;
					}
				}
			}
		}
	}
</style>
