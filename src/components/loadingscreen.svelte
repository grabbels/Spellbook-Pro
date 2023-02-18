<script>
	import { fade } from "svelte/transition";
</script>
<div transition:fade={{duration:200}} class="loadingscreen outer">
	<div class="inner"><i class="ri-loader-5-line" /></div>
</div>

<style lang="scss">
	.outer {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--translucentdark);
		z-index: 99999;
		display: flex;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(7px);
		.inner {
			// height: 56px;
			// width: 56px;
			transform: rotate(0deg);
			animation: rotate 1.2s infinite ease-in-out;
			@keyframes rotate {
				to {
					transform: rotate(360deg);
				}
			}
			i {
				font-size: 3.5rem;
				color: var(--white);
				margin: 0;
			}
		}
	}
</style>
