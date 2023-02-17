<script>
	import { onMount } from 'svelte';
	import { sidemenuopen, topmenuopen, spellListEmpty } from './stores/stores';
	export let text;
	export let icon = '';
	export let type;
	export let href = '';
	export let disabled = false;
	export let loading = '';
	// import ''
	// const handleMouseEnter = (event) => {
	// 	event.target.children[0].className = event.target.children[0].className.replace('line', 'fill');
	// };
	// const handleMouseLeave = (event) => {
	// 	event.target.children[0].className = event.target.children[0].className.replace('fill', 'line');
	// };
	onMount(() => {
		loading = false;
	});
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
	<!-- {:else if text === 'Import'}
	<label role="button" for="input-file" on:keydown on:click class="{type} button" class:disabled
		>{#if icon}<i class={icon} />{/if}{text}<input
			type="file"
			id="input-file"
			style="display: none"
			accept=".json"
		/></label
	> -->
{:else if href}
	<a {href} class="button {type}" on:click class:disabled
		>{#if icon}<i class={icon} />{/if}{text}</a
	>
{:else}
	{#key loading}
		<button type="button" on:click class={type} class:disabled class:loading
			>{#if icon}<i class={icon} />{/if}{text}{#if loading}<div class="loader">
					<i class="ri-loader-5-line" />
				</div>{/if}</button
		>
	{/key}
{/if}

<style lang="scss" global>
	button,
	.button,
	label.button {
		text-align: center;
		text-decoration: none;
		display: inline-block;
		user-select: none;
		cursor: pointer;
		padding: 0.35rem 1rem;
		// margin-right: 0.4rem;
		// margin-bottom: 0.4rem;
		margin: 0 0 0.4rem;
		font-size: 1rem;
		border-radius: 6px;
		font-weight: 500;
		transition: 0.1s;
		min-height: 46.4px;
		position: relative;
		&:first-child {
			margin-left: 0;
		}
		&:last-child {
			margin-right: 0;
		}
		&.mobile {
			display: none;
		}
		@media only screen and (max-width: 1024px) {
			&.desktop {
				display: none;
			}
			&.mobile {
				display: inline-block;
			}
		}
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
							filter: drop-shadow(0 0 15px rgba(var(--accentrgb), 0));
						}
						50% {
							filter: drop-shadow(0 0 15px rgba(var(--accentrgb), 1));
						}
						100% {
							filter: drop-shadow(0 0 15px rgba(var(--accentrgb), 0));
						}
					}
					&:hover {
						animation-name: none;
					}
				}
				&:hover {
					background-color: var(--accent);
					border-color: var(--accent);
					filter: drop-shadow(0 0 5px rgba(var(--accentrgb), 0.8));
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
		&.subtle {
			background-color: var(--moretranslucent);
			border-color: var(--moretranslucent);
			color: var(--white);
			&:hover {
				background-color: var(--primary);
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
				color: var(--white);
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
			&.blue {
				border-color: var(--lightblue);
				color: var(--white);
				&:hover {
					background-color: var(--lightblue);
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
		div.loader {
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
			color: transparent !important;
			div.loader {
				display: block;
			}
		}
	}
</style>
