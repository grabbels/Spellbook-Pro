<script>
	import { fade } from 'svelte/transition';
	import Pill from './pill.svelte';
	import { modalCall, pagetitle } from './stores/stores';
	export let data = null;
	export let type = '';
</script>

{#if data.name}
	<button
		style="background-color: {data ? data.color : ''}"
		in:fade={{ duration: 100 }}
		data-id={data ? data.id : ''}
		class="slot {data.name ? 'taken' : ''} {$pagetitle == 'My account'
			? 'shadow account'
			: ''} {type}"
		on:click
	>
		<h3>{data.name}</h3>

		<div class="pills" style="width: 100%">
			<Pill text={data.class} size="small" icon="ri-contacts-line" />
			<Pill text="Level {data.level}" size="small" icon="ri-user-star-line" />
		</div>
		{#if $pagetitle == 'My account'}<div class="edithover"><i class="ri-edit-line" /></div>{/if} 
	</button>
{:else if data.id === 'add' && $modalCall === 'save'}
	<button class="slot" on:click>
		<i class="ri-add-line" />
	</button>
{:else if $modalCall === 'save'}
	<button class="slot placeholder" />
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
		&.noedit {
			border: 2px solid transparent;
			aspect-ratio: unset!important;
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
		.pills {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: .3rem;
		}
		.description {
			color: var(--white);
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
		&.large {
			aspect-ratio: unset;
		}
		&.account {
			aspect-ratio: unset;
			cursor: pointer !important;
			.edithover {
				position: absolute;
				right: 0.3rem;
				top: 0.3rem;
				height: 40px;
				width: 40px;
				opacity: .5;
				text-align: right;
				transition: .15s;
				i {
					color: var(--lesstranslucent);
					font-size: 1.8rem;
					display: inline;
					
				}
			}
			&:hover {
				.edithover {
					opacity: 1;
				}
			}
		}
	}
</style>
