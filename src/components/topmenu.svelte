<script>
	import Button from './button.svelte';
	import Section from './section.svelte';
	import { activeSpells } from './stores/stores-persist';
	import { spellListEmpty, notification, modalCall, topmenuopen, pagetitle } from './stores/stores';
	import { topMenuOpenClose, empty, newBook, shareBook, handleSave, handleLoad } from './functions/globalfunctions.svelte';
	import bgalt from '../img/menu-bg-alt.png';
	import Pdf from './pdf.svelte';
	import { currentUser } from '$lib/pocketbase';
	let exportpdf = false;
	let fileinput;
	function download() {
		var activeSpellsSave = JSON.stringify($activeSpells);
		// var favoriteSpellsSave = localStorage.favoriteSpells.split(',');
		// favoriteSpellsSave.splice(0, 0, 'favorites');
		// var favoriteSpellsSave = favoriteSpellsSave.toString();
		// var saveFileString = activeSpellsSave + ',' + favoriteSpellsSave;
		var saveFileString = activeSpellsSave;
		let a = document.createElement('a');
		var name = prompt('Filename:');
		if (name !== null) {
			if (typeof a.download !== 'undefined') a.download = name + '.json';
			a.href = URL.createObjectURL(
				new Blob([saveFileString], {
					type: 'application/octet-stream'
				})
			);
			a.dispatchEvent(new MouseEvent('click'));
		}
	}

	function save() {
		$modalCall = 'save';
	}
	function load() {
		if ($currentUser) {
			$modalCall = 'load';
		} else {
			$notification = 'You need to <a href="/account/login">log in</a> to load spellbooks#alert';
		}
	}

	const onFileSelected = (e) => {
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.readAsText(file);
		reader.onload = (e) => {
			$activeSpells = [];
			$activeSpells = JSON.parse(e.target.result);
		};
	};
</script>

{#if exportpdf}
	<Pdf working={exportpdf} />
{/if}
<div class="topmenu" style="background-image: url('{bgalt}')" class:open={$topmenuopen}>
	<div class="wrapper">
		<div class="menu_left">
			<!-- <Button
				disabled={$spellListEmpty}
				on:click={download}
				href=""
				type="fill"
				icon="ri-download-line"
				text="Download"
			/>x
			<Button
				on:click={() => {
					fileinput.click();
				}}
				href=""
				type="fill"
				icon="ri-upload-line"
				text="Import"
			/> -->
			<Button
				on:click={() => {$modalCall = 'options'; topMenuOpenClose()}}
				type="fill"
				icon="ri-settings-line"
				text="Options"
			/>
			<Button
				disabled={$spellListEmpty}
				on:click={() => {shareBook(); topMenuOpenClose()}}
				type="fill mobile"
				icon="ri-share-line"
				text="Share"
			/>
			<Button
				<Button
				on:click={() => {newBook(); topMenuOpenClose()}}
				type="fill mobile"
				icon="ri-health-book-line"
				text="New"
			/>
			<Button
				disabled={$spellListEmpty}
				on:click={() => {handleSave(); topMenuOpenClose()}}
				type="fill mobile"
				icon="ri-save-3-line"
				text="Save"
			/>
			<Button
				on:click={() => {handleLoad(); topMenuOpenClose()}}
				type="fill mobile"
				icon="ri-folder-open-line"
				text="Open"
			/>
			<!-- <Button
				on:click={() => {
					fileinput.click();
				}}
				href=""
				type="fill"
				icon="ri-upload-line"
				text="Import"
			/> -->
			<!-- <input
				type="file"
				id="input-file"
				style="display: none"
				accept=".json"
				on:change={(e) => onFileSelected(e)}
				bind:this={fileinput}
			/> -->
			<!-- <Button
				disabled={$spellListEmpty}
				href=""
				type="fill"
				icon="ri-file-2-line"
				text="Export PDF"
				on:click={() => (exportpdf = true)}
			/> -->
			<Button
				disabled={$spellListEmpty}
				on:click={() => {empty(); topMenuOpenClose()}}
				href=""
				type="outline alt"
				icon="ri-delete-bin-line"
				text="Clear spellbook"
			/>
			<Button
				on:click={() => {$modalCall = 'submitspell'; topMenuOpenClose()}}
				href=""
				type="fill blue"
				icon="ri-file-search-line"
				text="Missing spell"
			/>
			<Button
				href="mailto:dev@semhak.dev?subject=Inky's Spellbook - bug/suggestion&body=In case of a bug, be as specific as possible with instructions how to reproduce the issue. Thank you for taking the time make Inky's Spellbook better!"
				type="fill alt"
				icon="ri-bug-line"
				text="Bug/suggestion"
				on:click={() => topMenuOpenClose()}
			/>
			<!-- <Button
				href=""
				type="fill"
				icon="ri-pantone-line"
				text="Theme"
			/> -->
			{#if $pagetitle === 'Home' || $pagetitle === 'My account'}
				<Button
					href="/browse"
					type="fill blue mobile"
					icon="ri-dashboard-fill"
					text="Premade"
					on:click={() => topMenuOpenClose()}
				/>
			{/if}
			{#if $currentUser && $pagetitle !== 'My account'}
				<Button
					type="fill mobile"
					icon="ri-contacts-book-2-line"
					text="Account"
					href="/account"
					on:click={() => topMenuOpenClose()}
				/>
			{:else if !$currentUser}
				<Button
					type="fill mobile"
					href="/account/login"
					icon="ri-login-circle-line"
					text="Log in"
					on:click={() => topMenuOpenClose()}
				/>
			{/if}
		</div>
		<div class="menu_right">
			<!-- <Button
				disabled={$spellListEmpty}
				on:click={refreshList}
				href=""
				type="subtle"
				icon="ri-refresh-line"
				text="Refresh list"
			/> -->
			<Button
				on:click={() => topMenuOpenClose()}
				type="outline alt"
				icon="ri-close-line"
				text="close"
			/>
		</div>
	</div>
</div>

<svelte:window on:keydown={(e) => (e.key == 'Escape' ? ($topmenuopen = false) : '')} />

<style lang="scss">
	.topmenu {
		background-color: var(--bg);
		position: relative;
		width: 100vw;
		background-position: center center;
		background-size: cover;
		transform: translateY(-100%);
		transition: transform 0.3s;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 3;
		height: 115px;
		@media only screen and (max-width: 1024px) {
			height: auto;
			top: auto;
			bottom: 0;
			transform: translateY(100%);
			transition: transform 0.3s;
		}
		.wrapper {
			padding: 2rem 2rem 1.3rem;
			width: 100%;
			display: flex;
			justify-content: space-between;
			@media only screen and (max-width: 1024px) {
				flex-wrap: wrap;
				justify-content: center;
				.menu_left {
					width: 100%;
					display: grid;
					max-width: 350px;
				}
				.menu_right {
					width: 100%;
					text-align: center;
					margin-top: 1rem;
				}
			}
		}
		&:before {
			position: absolute;
			content: '';
			height: 60px;
			width: 100%;
			left: 0;
			bottom: 0;
			// z-index: -1;
			background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
		}
		&.open {
			transform: translateY(0%);
		}
	}
</style>
