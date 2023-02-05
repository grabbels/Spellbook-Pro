<script>
	export let icon;
	export let text;
	export let size;
	export let label = '';
	export let print = false
</script>

<div class="pill {size} {print ? 'print' : ''} {icon === 'ri-checkbox-blank-circle-fill' ? 'placeholder' : ''}">
	<i class={icon} /><span>{text}</span>
	{#if label}<div class="pill {size} label"><i class={icon} />{label}</div>{/if}
</div>

<style lang="scss">
	div {
		border-radius: 50vh;
		display: inline-block;
		// margin: 0.5rem 0.4rem 0 0;
		padding: 0.2rem 0.8rem 0.2rem 0.6rem;
		font-size: 1rem;
		font-weight: 400;
		user-select: none;
		position: relative;
		
		i {
			font-size: 1.2rem;
			vertical-align: -4.5px;
			margin-right: 0.3rem;
		}
		&.small {
			color: var(--white);
			background-color: var(--translucent);
			font-size: 0.9rem;
			// margin: 0.5rem 0.4rem 0 0;
			border-radius: 50vh;
			// &:first-child {
			//     border-radius: 50vh 0 0 50vh;
			// }
			// &:last-child {
			//     border-radius: 0 50vh 50vh 0;
			// }
			// &:only-child {
			// 	border-radius: 50vh;
			// }
			.label {
				background-color: #5c5375;
			}
			i {
				font-size: 1rem;
				vertical-align: -4px;
			}
		}
		&.large {
			background-color: var(--accent);
			color: var(--bg);
			&:nth-of-type(2) {
				background-color: var(--lightblue);
			}
			&:nth-of-type(3) {
				background-color: var(--yellow);
			}
		}
		.label {
			all: inherit;
			position: absolute;
			left: 0;
			top: 0;
			// height: 100%;
			margin: 0;
			// padding: .3rem 1rem;
			min-width: 100%;
			width: max-content;
			z-index: 2;
			display: none;
			box-shadow: 0 3px 10px rgba(19, 19, 19, 0.4);
		}
		&:hover {
			.label {
				display: block;
			}
		}
		&.placeholder {
			background-color: var(--white) !important;
			color: transparent;
		}
		&.print {
			background-color: black!important;
			color: white!important;
			i {
				color: white!important;
			}
		}
	}
</style>
