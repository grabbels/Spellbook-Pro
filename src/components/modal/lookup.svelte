<!-- svelte-ignore a11y-autofocus -->
<script>
	import { onMount } from 'svelte';
	import Schoolicon from '../schoolicon.svelte';
	import { spells } from '../data/spells';
	import { lookupSpell, modalCall, quickQuery } from '../stores/stores';
	let quickInput;
	let results;
	let result = [];
	let resultNumber = -1;

	function handleKeyDown(e) {
		if (e.key == 'ArrowDown' && results) {
			e.preventDefault();
			resultNumber++;
			if (result[resultNumber]) {
				result[resultNumber].focus();
			} else {
				resultNumber--;
			}
		}
		if (e.key == 'ArrowUp' && results) {
			e.preventDefault();
			resultNumber--;
			if (result[resultNumber]) {
				result[resultNumber].focus();
			} else {
				quickInput.focus();
				resultNumber = -1;
			}
		}
	}
	$: if ($quickQuery.length > 0) {
		results = spells.filter((data) =>
			data?.name.toLowerCase()?.includes($quickQuery.toLowerCase())
		);
	} 
	onMount(() => {
		// setTimeout(() => {
			quickInput.focus();
		// }, 1);
	});
</script>

<input
	bind:this={quickInput}
	bind:value={$quickQuery}
	on:keydown={handleKeyDown}
	on:click={() => (resultNumber = -1)}
	type="text"
	placeholder="Quick spell lookup..."
/>
{#if results}
	<ul tabindex="-1">
		{#each results as spell, i}
			<li>
				<button
					on:click={() => {
						$lookupSpell = results[i];
						$quickQuery = '';
						$modalCall = 'spell fromquicksearch';
						
					}}
					on:keydown={handleKeyDown}
					bind:this={result[i]}
					tabindex="0"
				>
					<div>
						<Schoolicon school={spell.school} />
					</div>
					<div>
						<h3>{spell.name}</h3>
						<p>{spell.type}</p>
					</div>
				</button>
			</li>
		{/each}
	</ul>
{/if}
<svelte:window on:keydown={(e) => (e.key == 'Escape' ? handleKeyDown(e) : '')} />

<style lang="scss">
	input {
		height: 55px;
		margin: 0;
	}
	ul {
		height: 100%;
		width: 100%;
		margin-top: 0.8rem;
		overflow-x: hidden;
		overflow-y: auto;
		position: relative;
		transition: 0.2s;
		max-height: 60vh;
		scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
		@media only screen and (max-width: 1024px) {
			max-height: 100%;
		}
		// scrollbar-width:;

		li {
			border-bottom: 1px solid rgba(255, 255, 255, 0.15);
			cursor: pointer;
			position: relative;
			transition: 0.1s;
			p {
				font-weight: 400;
			}
			button {
				all: unset;
				padding: 0.35rem 0.8rem 0.5rem;
				width: 100%;
				height: 100%;
				display: grid;
				grid-template-columns: 40px 1fr;
				align-items: center;
				&:focus {
					background-color: rgba(255, 255, 255, 0.15) !important;
				}
			}
			&:hover {
				background-color: rgba(255, 255, 255, 0.15);
			}
			&.disabled {
				button {
					opacity: 0.3;
				}
			}
		}
	}
</style>
