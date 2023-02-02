<script>
	export let name;
</script>

<section class={name}>
	<div class="section_inner">
		<slot />
	</div>
</section>

<style lang="scss">
	section {
		width: 100%;
		display: flex;
		justify-content: center;
		padding-bottom: 1rem;
		position: relative;
			.section_inner {
				// max-width: none;
                width: 100%;
                padding: 0 40px;
                max-width: 1800px;
				position: relative;
				@media screen and (max-width: 1500px) {
                    max-width: 1500px;
				}
				@media screen and (max-width: 1170px) {
                    max-width: 1050px;
				}
				@media screen and (max-width: 1024px) {
                   padding: 0 2vw;
				}
				@media screen and (max-width: 820px) {
                    max-width: 650px;
				}
			}
		
	}
</style>
