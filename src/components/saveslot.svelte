<script>
	import { fade } from 'svelte/transition';
	import Pill from './pill.svelte';
	import { modalCall, pagetitle } from './stores';
	export let data = null;
	// export let type = '';
</script>

{#if data.name}
	<button
		style="background-color: {data ? data.color : ''}"
		transition:fade={{ duration: 100 }}
		data-id={data ? data.id : ''}
		class="slot {data.name ? 'taken' : ''} {$pagetitle == 'My account' ? 'shadow' : ''}"
		on:click
	>
		<h3>{data.name}</h3>
		<Pill text={data.class} size="small" icon="ri-contacts-line" />
		<Pill text="Level {data.level}" size="small" icon="ri-user-star-line" />
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
		padding: 0.5rem;
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
