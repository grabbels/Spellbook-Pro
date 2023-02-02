<script>
	import {
		bookmarksOpen,
		modalCall,
		notification,
		pagetitle,
		lookupBook
	} from '../../components/stores.js';
	import { getUserId } from '../../components/globalfunctions.svelte';
	import { activeSpells, userNickname } from '../../components/stores-persist.js';
	import { supabaseClient } from '$lib/db';
	import { createClient } from '@supabase/supabase-js';
	import Section from '../../components/section.svelte';
	import { fade } from 'svelte/transition';
	import Close from '../../components/close.svelte';
	import { onMount } from 'svelte';
	import Grid from '../../components/grid.svelte';
	import Filters from '../../components/filters.svelte';
	import Pill from '../../components/pill.svelte';
	import Loading from '../../components/loading.svelte';

	$pagetitle = 'Premade spellbooks';
	let openBook = null;
	let publishedBooks = [];

	onMount(() => {
		loadPremades();
	});
	async function loadPremades() {
		const { data, error } = await supabaseClient.from('spellbooks').select().eq('published', true);
		if (data) {
			console.log(data);
			publishedBooks = data;
		} else if (error) {
			console.log(error);
			$notification = 'Oops, an error occurred. Error code: ' + error.code + '#error';
		}
	}
</script>

<!-- <Section name="filters">
	{#if $activeSpells.length > 0}
		<Filters />
	{/if}
</Section> -->
<Section name="premades">
	<div class="panel">
		{#if publishedBooks.length}
			<Grid>
				{#each publishedBooks as book}
					<!-- {#if spell.display === true} -->
					{@const bookDescription = book.description.toLowerCase()}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="card item {openBook === null ? '' : openBook === book ? 'open' : 'not-open'}"
						on:click={() => {
							$modalCall = 'spellbook';
							$lookupBook = book;
						}}
						in:fade={{ duration: 200 }}
						role="button"
						data-class={book.class}
						data-level={book.level}
						data-name={book.name}
						data-id={book.id}
					>
						<div class="card_inner" style="border-color: {book.color}">
							{#if openBook === book}
								<Close on:click={() => (openBook = null)} />
							{/if}
							<div class="block title">
								<h2>
									<!-- <SchoolIcon school={book.school} /> -->
									<i style="color: {book.color}" class="ri-book-mark-line" />
									{book.name}
								</h2>
								<br />
								<p style="color: {book.color}">created by <strong>{book.creator}</strong></p>
							</div>
							<div class="block pills">
								<Pill
									label="Character level"
									text="Level {book.level}"
									size="large"
									icon="ri-numbers-line"
								/>
								<Pill label="Character class" text={book.class} size="large" icon="ri-sword-line" />
							</div>
							<div class="block description">
								<p>{@html book.description}</p>
							</div>
							<button class="fold" on:click={() => openBook}
								><i class="ri-arrow-down-s-line fold" /></button
							>
						</div>
						<div class="close_veil" on:click={() => (openBook = null)} />
					</div>
					<!-- {/if} -->
				{/each}
			</Grid>
		{:else}
			<Loading />
		{/if}
	</div>
</Section>

<style lang="scss">
	.panel {
		.card {
			.card_inner {
				transform-origin: bottom;
				border: 2px solid var(--primary);
				padding-top: 1.5rem;
				.block.title {
					h2 {
						opacity: 1;
						text-transform: none;
						margin: 0;
						font-size: 1.6rem;
						line-height: 1.2;
						margin-bottom: 0.5rem;
						i {
							vertical-align: bottom;
						}
					}
					p {
						width: 100%;
					}
				}
				.block.description {
					p {
						font-size: 0.95rem;
					}
				}
			}
			i.fold {
				font-size: 2.5rem;
				color: var(--moretranslucent);
				margin: 0;
				transition: 0.1s;
			}
			button.fold {
				all: unset;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: -0.2rem;
				cursor: pointer;
			}
			&:hover {
				i.fold {
					color: var(--accent);
				}
			}
			&:global(.open) {
				z-index: 2;

				.card_inner {
					pointer-events: all;
					position: absolute;
					top: 0;
					left: 0;
					display: table;
					z-index: 1;
					padding-bottom: 3rem;
					border-color: transparent !important;
					transform: scale(1.02);
					cursor: auto;
					.block.description {
						opacity: 1;
						&:after {
							opacity: 0;
						}
					}
				}
				button.fold {
					transform: translateX(-50%) rotate(180deg);
					i {
						color: var(--moretranslucent) !important;
					}
				}
			}
			&.not-open {
				opacity: 0.7;
			}
		}
	}
</style>
