<script>
	export let collapse = false;
</script>

<div class="grid" class:collapse={collapse}><slot /></div>

<style lang="scss">
	.grid {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-auto-rows: 325px;
		grid-gap: 1rem;
		position: relative;
		&.collapse {
			grid-auto-rows: 105px;
		}
		@media only screen and (max-width: 1500px) {
			grid-template-columns: 1fr 1fr 1fr;
		}
		@media only screen and (max-width: 1170px) {
			grid-template-columns: 1fr 1fr;
		}
		@media only screen and (max-width: 1024px) {
			grid-template-columns: 1fr 1fr 1fr;
		}
		@media only screen and (max-width: 1023px) {
			grid-template-columns: 1fr 1fr;
		}
		@media only screen and (max-width: 820px) {
			grid-template-columns: 1fr;
		}
	}
</style>
