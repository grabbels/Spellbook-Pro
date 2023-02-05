<button on:click class="close"><i class="ri-close-line" /></button>

<style lang="scss">
	button.close {
		all: unset;
		cursor: pointer;
		position: absolute;
		top: 18px;
		right: 26px;
		// display: none;
		pointer-events: all;
		z-index: 10;
		right: -40px;
		background-color: var(--red);
		height: 40px;
		width: 40px;
		z-index: -1;
		border-radius: 0 6px 6px 0;
		top: 39px;
		text-align: center;
		i {
			font-size: 2rem;
			color: var(--translucent);
			transition: 0.1s;
			margin: 0;
			text-align: center;
			vertical-align: middle;
			line-height: 40px;
		}
		@media only screen and (max-width: 1024px) {
			background-color: transparent;
			top: 1rem;
			right: 1rem;
			z-index: 1;
		}
		&:hover {
			i {
				color: var(--white);
			}
		}
	}
</style>
