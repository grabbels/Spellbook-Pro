<script>
	import { modalCall } from './stores/stores';
	let scrollY;

	function convertRemToPixels(rem) {
		return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
	}
</script>

<div class="mobile_header" class:scrolled={scrollY >= convertRemToPixels(1)}>
	<input
		readonly
		type="text"
		placeholder="Quick spell lookup..."
		on:focus={() => ($modalCall = 'lookup')}
	/>
</div>

<svelte:window bind:scrollY />

<style lang="scss">
	.mobile_header {
		position: sticky;
		top: -1rem;
		padding: calc(2rem + env(safe-area-inset-top)) .3rem 1rem;
		transition: 0.2s;
		background-color: transparent;
		&.scrolled {
			box-shadow: 0 0px 10px rgba(10, 10, 10, 0.4);
			background-color: var(--spellbg);
			padding: max(calc(env(safe-area-inset-top) + 1rem), 2rem) 1rem 1rem;
			&:before,&:after {
				opacity: 1;
			}
		}
		input {
			margin: 0;
		}
		z-index: 10;
	}
</style>
