<script>
	import { fade, fly, slide } from "svelte/transition";


	export let icon;
	export let color = '';
</script>

<!-- <button on:click class={color}> -->
<button in:fly={{delay: 201, duration: 200, y: 15}} out:fly={{duration: 200, y: 15}} on:click class={color}>
	<div>
		<i class={icon} />
		<span><slot /></span>
	</div>
</button>

<style lang="scss">
	button {
		all: unset;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		background-color: transparent;
		flex-wrap: wrap;
        margin-top: 6px;
        cursor: pointer;
		div {
			text-align: center;
			height: 47.85px;
			i {
				font-size: 1.7rem;
				height: 31.2833px;
				line-height: 1.15;
				margin: 0;
				display: inline-block;
				&.ri-add-line {
					transform-origin: center;
					transform: scale(1.2) translateY(-1px);
				}
				&.ri-arrow-down-s-line {
					font-size: 2.5rem;
                    margin-top: .1rem;
                    opacity: .3;
				}
			}
			span {
				width: 100%;
				font-size: 0.9rem;
				display: block;
				line-height: 1.15;
			}
			i,
			span {
				color: var(--white);
			}
		}
	}
</style>
