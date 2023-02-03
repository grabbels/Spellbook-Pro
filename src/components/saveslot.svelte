<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import Button from './button.svelte';
	import {
		editBook,
		loadBook,
		removeBook,
		publishBook,
		unpublishBook
	} from './globalfunctions.svelte';
	import Pill from './pill.svelte';
	import { modalCall, pagetitle } from './stores';
	export let data = null;
	export let type = '';
</script>

{#if data.name}
	<button
		style="background-color: {data ? data.color : ''}"
		transition:fade={{ duration: 100 }}
		data-id={data ? data.id : ''}
		class="slot {data.name ? 'taken' : ''} {$pagetitle == 'My account' ? 'shadow' : ''} {type}"
		on:click
	>
		<h3>{data.name}</h3>

		<div style="width: 100%">
			<Pill text={data.class} size="small" icon="ri-contacts-line" />
			<Pill text="Level {data.level}" size="small" icon="ri-user-star-line" />
		</div>
		{#if type.includes('large')}
			{#if !type.includes('noedit')}
				<div class="controls">
					<div>
						<Button
							icon="ri-edit-line"
							type="fill"
							text="Edit details"
							on:click={editBook(data.id)}
						/>
						<Button
							icon="ri-folder-open-line"
							type="fill blue"
							text="Open spellbook"
							on:click={loadBook(data.id)}
						/>
						{#if data.published === false}
							<Button
								icon="ri-upload-cloud-2-line"
								type="fill accent"
								text="Publish spellbook"
								on:click={publishBook(data.id)}
							/>
						{:else if data.published === true}
							<Button
								icon="ri-lock-line"
								type="outline accent"
								text="Make private"
								on:click={unpublishBook(data.id)}
							/>
						{/if}
						<Button
							icon="ri-delete-bin-line"
							type="fill alt"
							text="Delete spellbook"
							on:click={removeBook(data.id)}
						/>
						<!-- <button on:click={editBook(data.id)}> <i class="ri-edit-line" /> </button>
					<button on:click={loadBook(data.id)}> <i class="ri-folder-open-line" /> </button>
					<button on:click={publishBook(data.id)}> <i class="ri-upload-cloud-2-line" /> </button> -->
					</div>
					<!-- <button on:click={removeBook(data.id)}>  <i class="ri-delete-bin-line"></i>  </button> -->
				</div>
			{/if}
			<div class="description">{data.description}</div>
		{/if}
	</button>
{:else if data.id === 'add' && $modalCall === 'save'}
	<button transition:fade={{ duration: 100 }} class="slot" on:click>
		<i class="ri-add-line" />
	</button>
{:else if $modalCall === 'save'}
	<button transition:fade={{ duration: 100 }} class="slot placeholder" />
{/if}

<style lang="scss">
	.slot {
		background-color: var(--moretranslucent);
		border-radius: 6px;
		aspect-ratio: 1 / 1.15;
		position: relative;
		margin: 0;
		transition: 0.1s;
		border: 2px solid transparent;
		min-height: 200px;
		padding: 0.5rem;
		@media only screen and (max-width: 1024px) {
			aspect-ratio: unset;
		}
		&.large {
			aspect-ratio: unset;
			min-height: 250px;
			border-width: 0;
			padding: 2rem 1rem;
			&:hover {
				cursor: auto;
				.controls {
					opacity: 1;
					pointer-events: all;
				}
			}
		}
		&.noedit {
			border: 2px solid transparent;
			&:hover {
				cursor: pointer;
				border: 2px solid var(--accent);
			}
		}
		&.placeholder {
			pointer-events: none;
		}
		h3 {
			line-height: 1.3;
			margin-bottom: 0.5rem;
		}

		i {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			font-size: 3rem;
			color: var(--moretranslucent);
			transition: 0.1s;
		}
		.controls {
			opacity: 0;
			pointer-events: none;
			position: absolute;
			z-index: 2;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			padding: 2rem 1rem;
			border-radius: 6px;
			background-color: var(--spellbg);
			border-color: var(--spellbg);
			transition: 0.1s;
			display: flex;
			align-items: center;
			justify-content: center;
			div {
				display: flex;
				flex-wrap: wrap;
				flex-direction: column;
				max-width: 200px;
				margin-top: 0.4rem;
			}
		}
		.description {
			color: white;
			margin-top: 1rem;
			font-size: 0.95rem;
		}
		&:hover {
			background-color: rgba(255, 255, 255, 0.2);
			border-color: var(--accent);
			i {
				color: var(--translucent);
			}
		}
		&.shadow {
			box-shadow: 0 3px 10px rgba(20, 20, 20, 0.3);
		}
	}
</style>
