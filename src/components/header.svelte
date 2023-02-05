
<script>
	import { fade } from 'svelte/transition';
	import Section from '../components/section.svelte';
	import Button from '../components/button.svelte';
	import { pagetitle, session, modalCall, quickQuery } from './stores/stores';
	import { loggedIn, userNickname } from './stores/stores-persist';
	import { topMenuOpenClose, sideMenuOpenClose, handleLogOut } from './functions/globalfunctions.svelte';
</script>

<Section name="header">
	<header>
		{#if $pagetitle === 'Home'}
			{#key $pagetitle}
				<h1 in:fade={{ duration: 200 }}>
					Inky's Spellbook <span style="margin-left: .2rem;font-size: 1.2rem; opacity: .3;"
						>Beta / D&D 5E</span
					>
				</h1>
			{/key}
		{:else}
			{#key $pagetitle}
				<h1 in:fade={{ duration: 200 }}>
					{$pagetitle}
				</h1>
			{/key}
		{/if}
		<div class="header_inner">
			<div class="header_left">
				{#if $pagetitle === 'Home'}
					<Button
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
				{#if $pagetitle == 'My account' && $session}
					<Button
						on:click={handleLogOut}
						type="fill mobile"
						icon="ri-logout-circle-r-line"
						text="Log out"
					/>
				{/if}
				{#if $pagetitle === 'Home' || $pagetitle === 'My account'}
					<Button href="/browse" type="fill blue desktop" icon="ri-dashboard-fill" text="Premade" />
				{/if}
				{#if $pagetitle === 'Home'}
					<Button
						href=""
						on:click={() => topMenuOpenClose()}
						type="fill"
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
				{#if $session && $pagetitle !== 'My account'}
					<Button
						type="fill desktop"
						icon="ri-contacts-book-2-line"
						text="Account"
						href="/account"
					/>
				{:else if $pagetitle == 'My account' && $session}
					<Button
						on:click={handleLogOut}
						type="fill desktop"
						icon="ri-logout-circle-r-line"
						text="Log out"
					/>
				{:else if !$session}
					<Button
						type="fill desktop"
						href="/account/login"
						icon="ri-login-circle-line"
						text="Log in"
					/>
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
		h1 {
			margin-bottom: 1rem;
			@media only screen and (max-width: 1024px) {
				span {
					display: block;
					width: 100%;
				}
			}
		}
		.header_inner {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			width: 100%;
			align-items: flex-end;
			.header_right {
				display: flex;
				gap: 0.4rem;
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
