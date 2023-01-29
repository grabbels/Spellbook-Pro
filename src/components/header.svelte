<script>
	import { fade } from 'svelte/transition';
	import Section from '../components/section.svelte';
	import Button from '../components/button.svelte';
	import { pagetitle, session, modalCall, quickQuery } from '../components/stores';
	import { loggedIn, userNickname } from '../components/stores-persist';
	import {
		topMenuOpenClose,
		sideMenuOpenClose,
		handleLogOut
	} from './globalfunctions.svelte';
</script>

<Section name="header">
	<header style="margin-top: 2rem">
		<div class="header_left">
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
			{#if $pagetitle === 'Home' || $pagetitle === 'My account'}
				<Button href="/browse" type="fill blue" icon="ri-dashboard-fill" text="Premade" />
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
			<input type="text" placeholder="Quick spell lookup..." bind:value={$quickQuery} on:input={() => $modalCall = 'lookup'} />
			{#if $session && $pagetitle !== 'My account'}
				<Button type="fill" icon="ri-contacts-book-2-line" text="Account" href="/account" />
			{:else if $pagetitle == 'My account' && $session}
				<Button on:click={handleLogOut} type="fill" icon="ri-logout-circle-r-line" text="Log out" />
			{:else if !$session}
				<Button type="fill" href="/account/login" icon="ri-login-circle-line" text="Log in" />
			{/if}

			<!-- <Button type="fill dark-mode" icon="ri-moon-line" text="dark mode" /> -->
		</div>
	</header>
</Section>

<style>
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
</style>
