<script>
	import { onMount } from 'svelte';
	import Button from '../button.svelte';
	import {
		loadBook,
		publishBook,
		removeBook,
		unpublishBook
	} from '../functions/globalfunctions.svelte';
	import Pill from '../pill.svelte';
	import SchoolIcon from '../schoolicon.svelte';
	import {
		bookToEdit,
		lookupBook,
		lookupSpell,
		modalCall,
		pagetitle,
		profileUser,
		quickQuery
	} from '../stores/stores';

	let levelList = [];
	const levels = [
		'cantrips',
		'level 1',
		'level 2',
		'level 3',
		'level 4',
		'level 5',
		'level 6',
		'level 7',
		'level 8',
		'level 9'
	];
	let publishloading = false;
	let unpublishloading = false;
	function closeModal() {
		$modalCall = '';
		$quickQuery = '';
		$lookupSpell = '';
		showModal = false;
	}
    function setLevels() {
		for (let i = 0; i < levelList.length; i++) {
			if (!levelList[i].querySelector('ul').children.length) {
				levelList[i].style.display = 'none';
			}
		}
	}
	// $: $modalCall, setLevels();

	onMount(() => {
		setLevels();
	});
</script>

<div class="modal_inner">
	<div class="bookmark_decal">
		<i class="ri-bookmark-fill" style={$lookupBook.color ? 'color: ' + $lookupBook.color : ''} />
	</div>
	<div class="card">
		<div class="card_inner">
			<div class="block title">
				<h2>
					<!-- <SchoolIcon school={book.school} /> -->
					<i style="color: {$lookupBook.color}" class="ri-book-mark-line" />
					{$lookupBook.name}
				</h2>
				<br />
				{#if $pagetitle != 'My account'}
					<p style="color: {$lookupBook.color}">
						created by <a
							on:click|preventDefault={() => {
								$modalCall = 'profile';
								$quickQuery = '';
								$lookupSpell = '';
								$profileUser = $lookupBook.user_id;
							}}
							style="color: {$lookupBook.color}"
							href="/"><strong>{$lookupBook.creator}</strong></a
						>
					</p>
				{/if}
			</div>
			<div class="block pills">
				<Pill
					label="Character level"
					text="Level {$lookupBook.level}"
					size="large"
					icon="ri-numbers-line"
				/>
				<Pill label="Character class" text={$lookupBook.class} size="large" icon="ri-sword-line" />
			</div>
			<div class="block description">
				<p>{@html $lookupBook.description}</p>
			</div>
			<div class="block buttons">
				<Button
					on:click={() => {
						loadBook($lookupBook.id);
					}}
					text="Open"
					icon="ri-book-open-line"
					type="fill accent"
				/>
				{#if $pagetitle == 'My account'}
					<Button
						icon="ri-edit-line"
						type="fill"
						text="Edit details"
						on:click={() => {
							console.log($lookupBook);
							$bookToEdit = $lookupBook;
							modalCall.set('edit');
							// editBook($lookupBook.id);
						}}
					/>
					{#if $lookupBook.published === false}
						<Button
							icon="ri-upload-cloud-2-line"
							type="fill blue"
							text="Publish spellbook"
							loading={publishloading}
							on:click={() => {
								publishBook($lookupBook.id);
								publishloading = true;
							}}
						/>
					{:else if $lookupBook.published === true}
						<Button
							icon="ri-lock-line"
							type="outline blue"
							text="Make private"
							loading={unpublishloading}
							on:click={() => {
								unpublishBook($lookupBook.id);
								unpublishloading = true;
							}}
						/>
					{/if}
					<Button
						icon="ri-delete-bin-line"
						type="outline alt"
						text="Delete spellbook"
						on:click={() => {
							let promise = removeBook($lookupBook.id);
							promise.then((value) => {
								if (value) {
									closeModal();
								}
							});
						}}
					/>
				{/if}
			</div>
			<div class="block spells">
				<h3>Spells</h3>
				{#each levels as level, i}
					<div bind:this={levelList[i]}>
						<p class="level"><strong>{levels[i]}</strong></p>
						<ul>
							{#each $lookupBook.list as spell}
								{#if level.includes(spell.level) || (level == 'cantrips' && spell.level == 0)}
									<li>
										<p><SchoolIcon type="small" school={spell.school} /> {spell.name}</p>
									</li>
								{/if}
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.spellbook {
		h2 {
			i {
				vertical-align: sub;
				font-size: 2rem;
			}
		}
        .card {
            .card_inner {
                box-shadow: none;
                border: none!important;
                pointer-events: all;
                cursor: auto;
            }
        }
	}
</style>
