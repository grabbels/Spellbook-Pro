<script>
	let open = false;
</script>

<div class="folder">
	<button on:click={() => (open = !open)} class:open class="fill toggle"
		><div><i class="ri-menu-2-line" /></div>
		{#if open === false}menu{:else}close{/if}</button
	>
	<div class="sub" class:open><slot /></div>
</div>

<style lang="scss">
	.folder {
		vertical-align: bottom;
		overflow: hidden;
		cursor: pointer;
		display: inline-block;
		margin-left: 0.2rem;
		position: relative;
		button.toggle {
			z-index: 2;
			position: relative;
            transition: .1;
			div {
				display: inline-block;
				transition: 0.3s;
			}
			&.open {
				border-radius: 6px 0 0 6px;
				filter: brightness(0.9) contrast(1.5) saturate(0.8);
				div {
					transform: scaleX(-1) translateX(8px);
				}
			}
		}
		.sub {
			transform: translateX(-120%);
			display: inline-block;
			background-color: var(--bg);
			position: relative;
			height: calc(100% + 2px);
			width: auto;
			padding-left: 111px;
			margin-left: -107px;
			z-index: 1;
			border-radius: 6px;
			transition: 0.3s;
			&.open {
				transform: translateX(0%);
				width: auto;
			}
		}
	}
</style>
