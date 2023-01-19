<script>
	export let icon;
	export let text;
	export let size;
</script>

<div class="pill {size}"><i class={icon} />{text}</div>

<style lang="scss">
	div {
		border-radius: 50vh;
		display: inline-block;
		margin: .5rem .4rem 0 0;
		padding: .2rem .8rem .2rem .6rem;
		font-size: 1rem;
		font-weight: 400;
        user-select: none;
		i {
			font-size: 1.2rem;
			vertical-align: -4.5px;
			margin-right: 0.3rem;
		}
		&.small {
			color: var(--white);
			background-color: var(--translucent);
            font-size: .9rem;
            margin: .5rem 0;
            border-radius: 0;
            &:first-child {
                border-radius: 50vh 0 0 50vh;
            }
            &:last-child {
                border-radius: 0 50vh 50vh 0;
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
	}
</style>
