<script>
	import { currentUser, pb } from '$lib/pocketbase';
	import { fly } from 'svelte/transition';
	import Button from '../button.svelte';
	import Colorpicker from '../colorpicker.svelte';

	import {
		classes,
		loadBook,
		loadSpellsheetsByUserId,
		retrieveSession
	} from '../functions/globalfunctions.svelte';
	import Loading from '../loading.svelte';
	import SaveSlot from '../saveslot.svelte';
	import {
		bookToEdit,
		lookupBook,
		modalCall,
		notification,
		savedSpellSheets,
		savePrompt,
		session,
		topmenuopen,
		userId
	} from '../stores/stores';

	import Filter from 'bad-words';
	let filter = new Filter();

	import { activeSpells, userNickname, activeTab, openSpellbooks } from '../stores/stores-persist';
	let saveColor = $bookToEdit ? $bookToEdit.color : 'var(--purple)';
	let loadingSave,
		colorPicker,
		form,
		saveName,
		saveClass,
		saveLevel,
		saveDescription,
		savePublish,
		overwriteId,
		tempColor;
	if ($bookToEdit.published == true) {
		savePublish = true;
	}
	$: if (saveColor) {
		colorPicker = false;
		console.log(saveColor);
	}
	console.log($savedSpellSheets);
	if ($modalCall == 'save' || 'load' || 'edit') {
		// if (!$userId || !$userNickname) {
		// 	if ($session) {
		// 		$userId = $session.user.id;
		// 		$userNickname = $session.user.user_metadata.nickname;
		// 		loadSpellsheetsByUserId($userId);
		// 	} else {
		// 		let promiseSession = retrieveSession();
		// 		promiseSession.then((value) => {
		// 			if (value) {
		// 				$session = value;
		// 				$userId = value.user.id;
		// 				$userNickname = value.user.user_metadata.nickname;
		// 				loadSpellsheetsByUserId($userId);
		// 			}
		// 		});
		// 	}
		// } else {
		loadSpellsheetsByUserId($userId);
		// }
	}

	async function handleSave() {
		console.log($userNickname)
		if ($bookToEdit) {
			overwriteId = $bookToEdit.id;
		}
		if (!saveName.value || !saveLevel.value || !saveClass.value) {
			$notification = 'Please fill in all the fields.#alert';
		} else if (
			(!saveDescription.value && !filter.clean(saveName.value).includes('*')) ||
			(!filter.clean(saveName.value).includes('*') &&
				!filter.clean(saveDescription.value).includes('*'))
		) {
			loadingSave = 'loading';
			$userNickname = $currentUser.username
			const data = {
				name: saveName.value,
				class: saveClass.value,
				level: saveLevel.value,
				description: saveDescription.value,
				list: $activeSpells,
				user_id: $userId,
				creator: $userNickname,
				color: saveColor,
				published: savePublish
			};
			if (overwriteId) {
				try {
					const record = await pb.collection('spellbooks').update(overwriteId, data);
					if (record) {
						overwriteId = '';
						loadSpellsheetsByUserId();
						$modalCall = '';
						$savePrompt = false;
						loadingSave = '';
						$openSpellbooks[$activeTab].unsaved = false;
						$openSpellbooks[$activeTab].from_load = true;
					}
				} catch (err) {
					console.log(err.data);
					$notification = err.data.message + ' Error code: ' + err.data.code + '#error';
				}
			} else {
				try {
					const record = await pb.collection('spellbooks').create(data);
					if (record) {
						// for (let i = 0; i < $openSpellbooks.length; i++) {
						// 	if ($openSpellbooks[i].open_tab === true) {
						// 		$openSpellbooks.splice(i, 1);
						// 	}
						// }
						let createdBook = record;
						createdBook.from_load = true;
						createdBook.unsaved = false;
						overwriteId = '';
						$savePrompt = false;
						$topmenuopen = false;
						$openSpellbooks[$activeTab] = createdBook;
						if ($bookToEdit) {
							$lookupBook = createdBook;
							$bookToEdit = '';
							$modalCall = 'spellbook';
							$savePrompt = false;
						} else {
							$modalCall = '';
						}
						$notification = 'Spellbook saved!#positive';
						loadSpellsheetsByUserId();
					}
				} catch (err) {
					console.log(err.data);
					$notification = err.data.message + ' Error code: ' + err.data.code + '#error';
				}
			}
		} else {
			$notification =
				'Your spellbook name or description contains profanity. Please correct these instances and try again.#alert';
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

{#if $modalCall !== 'edit'}
	{#if $savePrompt === false}
		<div style="min-height: 68px">
			{#if $modalCall == 'save'}
				<h2>Save</h2>
				<p>Select a slot to save your open spellbook in:</p>
			{/if}
			{#if $modalCall == 'load'}
				<h2>Open</h2>
				<p>Select which spellbook you would like to open.</p>
			{/if}
		</div>
		{#if $savedSpellSheets.length > 0}
			<div class="save_slots">
				{#if $modalCall === 'load' && $savedSpellSheets[0].id === 'add'}
					<p>You have no saved spellbooks.</p>
				{:else}
					{#each $savedSpellSheets as spellsheet}
						<SaveSlot data={spellsheet} on:click={() => handleClick(spellsheet.id)} />
					{/each}
				{/if}
			</div>
		{:else}
			<Loading />
		{/if}
	{/if}
{/if}
{#if $savePrompt === true || $modalCall === 'edit'}
	<!-- <div transition:fly={{ duration: 150, y: 10 }} class="new_save"> -->
	<div class="new_save" in:fly={{ y: 20, duration: 200 }}>
		<h2>{$modalCall == 'edit' ? 'Edit' : $savePrompt === true ? 'Save' : ''} spellbook</h2>
		<form on:submit|preventDefault={() => handleSave()} bind:this={form}>
			<div class="grid name-color">
				<div>
					<label for="name">Spellbook name</label>
					<input
						bind:this={saveName}
						value={$bookToEdit.name ? $bookToEdit.name : $openSpellbooks[$activeTab].name && $openSpellbooks[$activeTab].name != 'Untitled spellbook' ? $openSpellbooks[$activeTab].name : ''}
						name="name"
						type="text"
						maxlength="40"
					/>
				</div>
				<div>
					<label for="name">Color</label>
					<input
						type="checkbox"
						name="color"
						style="background-color: {saveColor}"
						on:click|stopPropagation={() => {
							// tempColor = saveColor;
							// saveColor = '';
							colorPicker = true;
						}}
					/>
					<!-- <button name="color" style="background-color: {saveColor}" on:click={() => (colorPicker = true)} /> -->
					{#if colorPicker}
						<div style="position: relative">
							<Colorpicker bind:selectedColor={saveColor} prevColor={tempColor} />
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
				rows="6"
				maxlength="300"
				value={$bookToEdit.description ? $bookToEdit.description : ''}
			/>
			<input bind:checked={savePublish} name="publish" id="publish" type="checkbox" />
			<label for="publish" style="display: inline"
				>Publish this spellbook to the premade spellbooks database so others can find it too.</label
			><br /><br />

			<button class="{loadingSave ? 'loading' : ''} button fill accent" type="submit"
				><i class="ri-save-3-line" />Save
				<div><i class="ri-loader-5-line" /></div></button
			>
			<Button
				on:click={(e) => {
					e.preventDefault;
					if ($modalCall === 'edit') {
						$bookToEdit = '';
						$modalCall = 'spellbook';
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

<style lang="scss">
	.save_slots {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		grid-gap: 0.5rem;
		margin-top: 1rem;
		position: relative;
		z-index: 1;
	}
	.new_save {
		height: auto;
		min-height: 100%;
		width: 100%;
		max-height: 100%;
		border-radius: 6px;
		background-color: var(--spellbg);
		h2 {
			margin-bottom: 0.5rem;
		}
		z-index: 1;
		@media only screen and (max-width: 1024px) {
			padding: 2rem 0 0;
		}
		form {
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
			input[type='checkbox'] {
				width: auto;
				display: inline;
				margin: 0 0.3rem 0 0;
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
</style>
