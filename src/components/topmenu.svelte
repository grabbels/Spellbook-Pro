<script>
	import Button from './button.svelte';
	import Section from './section.svelte';
	import { activeSpells } from './stores-persist';
	import { spellListEmpty, notification, modalCall, filters, session, topmenuopen } from './stores';
	import { topMenuOpenClose, removeFilters, refreshList, empty } from './globalfunctions.svelte';
	import Pdf from './pdf.svelte';
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
		if ($session) {
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

<Pdf working={exportpdf} />

<Section name="topmenu">
	<div class="wrapper">
		<div>
			<!-- <Button
				disabled={$spellListEmpty}
				on:click={download}
				href=""
				type="fill"
				icon="ri-download-line"
				text="Download"
			/>
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
				disabled={$spellListEmpty}
				on:click={save}
				href=""
				type="fill"
				icon="ri-save-3-line"
				text="Save"
			/>
			<Button on:click={load} href="" type="fill" icon="ri-folder-open-line" text="Load" />
			<!-- <Button
				on:click={() => {
					fileinput.click();
				}}
				href=""
				type="fill"
				icon="ri-upload-line"
				text="Import"
			/> -->
			<input
				type="file"
				id="input-file"
				style="display: none"
				accept=".json"
				on:change={(e) => onFileSelected(e)}
				bind:this={fileinput}
			/>
			<Button
				disabled={$spellListEmpty}
				href=""
				type="fill"
				icon="ri-file-2-line"
				text="Export PDF"
				on:click={()=>exportpdf = true}
			/>
			<Button
				disabled={$spellListEmpty}
				on:click={empty}
				href=""
				type="outline alt"
				icon="ri-delete-bin-line"
				text="Clear spellbook"
			/>
			<!-- <Button
				href=""
				type="fill"
				icon="ri-pantone-line"
				text="Theme"
			/> -->
		</div>
		<div>
			<Button
				disabled={$spellListEmpty}
				on:click={refreshList}
				href=""
				type="subtle"
				icon="ri-refresh-line"
				text="Refresh list"
			/>
			<Button on:click={topMenuOpenClose} type="outline alt" icon="ri-close-line" text="close" />
		</div>
	</div>
</Section>

<svelte:window on:keydown={(e) => (e.key == 'Escape' ? ($topmenuopen = false) : '')} />

<style lang="scss">
	.wrapper {
		padding: 2rem 0 1.3rem;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
</style>
