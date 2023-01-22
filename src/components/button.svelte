<script>
	import { sidemenuopen, topmenuopen, spellListEmpty } from '../components/stores';

	export let text;
	export let icon = '';
	export let type;
	export let href = '';
	export let disabled = false;
	// import ''
	// const handleMouseEnter = (event) => {
	// 	event.target.children[0].className = event.target.children[0].className.replace('line', 'fill');
	// };
	// const handleMouseLeave = (event) => {
	// 	event.target.children[0].className = event.target.children[0].className.replace('fill', 'line');
	// };
</script>

{#if text === 'Add spells'}
	<button
		on:click
		class:menuopen={$sidemenuopen}
		class:spellListEmpty={$spellListEmpty}
		class:disabled
		class={type}
		><div>
			{#if icon}<i class={icon} />{/if}
		</div>
		{#if $sidemenuopen === false}Add spells{:else}Close panel{/if}</button
	>
{:else if text === 'menu'}
	<button on:click class:topmenuopen={$topmenuopen} class:disabled class={type}
		><div>
			{#if icon}<i class={$topmenuopen ? 'ri-close-line' : 'ri-menu-2-line'} />{/if}
		</div>
		{#if $topmenuopen === false}menu{:else}close{/if}</button
	>
{:else if text === 'Import'}
	<label role="button" for="input-file" on:keydown on:click class="{type} button" class:disabled
		>{#if icon}<i class={icon} />{/if}{text}<input
			type="file"
			id="input-file"
			style="display: none"
			accept=".json"
		/></label
	>
{:else if href}
	<a {href} class="button {type}" class:disabled
		>{#if icon}<i class={icon} />{/if}{text}</a
	>
{:else}
	<button on:click class={type} class:disabled
		>{#if icon}<i class={icon} />{/if}{text}</button
	>
{/if}

<style lang="scss" global>

	button,
	.button,
	label.button {
		text-decoration: none;
		display: inline-block;
		user-select: none;
		cursor: pointer;
		padding: 0.35rem 1rem;
		margin-right: 0.2rem;
		margin-bottom: .4rem;
		font-size: 1rem;
		border-radius: 6px;
		font-weight: 500;
		transition: 0.1s;
		min-height: 46.4px;
		position: relative;
		&.fill {
			color: var(--white);
			background-color: var(--translucent);
			border: 2px solid transparent;
			&.alt {
				background-color: var(--secondary);
				border-color: var(--secondary);
				&:hover {
					filter: brightness(0.9) contrast(1.5) saturate(0.8);
					background-color: var(--secondary);
					border-color: var(--secondary);
					color: var(--white);
				}
			}
			&.accent {
				background-color: var(--accent);
				border-color: var(--accent);
				color: var(--bg);
				&.spellListEmpty {
					animation-name: glowing;
					animation-iteration-count: infinite;
					animation-duration: 2s;
					@keyframes glowing {
						0% {
							filter: drop-shadow(0 0 15px rgba(0, 204, 157, 0));
						}
						50% {
							filter: drop-shadow(0 0 15px rgba(0, 204, 157, 1));
						}
						100% {
							filter: drop-shadow(0 0 15px rgba(0, 204, 157, 0));
						}
					}
					&:hover {
						animation-name: none;
					}
				}
				&:hover {
					background-color: var(--accent);
					border-color: var(--accent);
					filter: drop-shadow(0 0 5px rgba(0, 204, 157, 0.8));
				}
			}
			&.blue {
				background-color: var(--lightblue);
				border-color: var(--lightblue);
				&:hover {
					filter: drop-shadow(0 0 5px rgba(0, 170, 204, 0.8));
					border-color: var(--lightblue);
					background-color: var(--lightblue);
				}
			}
			&:hover {
				// filter: brightness(0.9) contrast(1.5) saturate(0.8);
				background-color: var(--primary);
				border-color: var(--primary);
			}
			&.menuopen {
				background-color: var(--secondary);
				border-color: var(--secondary);
				color: var(--white);
				z-index: 11;
				animation: none;
				&:hover {
					filter: brightness(0.9) contrast(1.5) saturate(0.8);
					background-color: var(--secondary);
					border-color: var(--secondary);
					color: var(--white);
				}
				div {
					transform: translateY(1px) rotate(45deg);
				}
			}
			&.topmenuopen {
				background-color: var(--secondary);
				border-color: var(--secondary);
				color: var(--white);
				z-index: 11;
				&:hover {
					filter: brightness(0.9) contrast(1.5) saturate(0.8);
					background-color: var(--secondary);
					border-color: var(--secondary);
					color: var(--white);
				}
				div {
					transform: translateY(1px);
				}
			}
		}
		&.outline {
			background-color: transparent;
			color: var(--white);
			border: 2px solid var(--white);
			&:hover {
				background-color: var(--primary);
				color: var(--white);
			}
			&.alt {
				border-color: var(--secondary);
				color: white;
				&:hover {
					background-color: var(--secondary);
					color: var(--white);
				}
			}
			&.accent {
				border-color: var(--accent);
				color: var(--accent);
				&:hover {
					background-color: var(--accent);
					color: var(--white);
				}
			}
		}
		&.naked {
			color: var(--white);
			border: 2px solid transparent;
			margin: 0;
			&.alt {
				color: var(--secondary);
				&:hover {
					background-color: var(--secondary);
				}
			}
			&:hover {
				color: var(--white);
				background-color: var(--primary);
				filter: brightness(0.9) contrast(1.5) saturate(0.8);
			}
		}
		&.dark-mode {
			background-color: var(--black);
			border-color: var(--black);
		}
		div {
			display: inline-block;
		}
		i {
			font-size: 1.3rem;
			font-weight: 500;
			vertical-align: -5px;
			margin-right: 0.3rem;
			pointer-events: none;
		}
		&.disabled {
			opacity: 0.3;
			pointer-events: none;
		}
	}
</style>
