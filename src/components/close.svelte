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
		i {
			font-size: 2rem;
			color: var(--translucent);
			transition: 0.1s;
		}

		&:hover {
			i {
				color: var(--accent);
			}
		}
	}
</style>
