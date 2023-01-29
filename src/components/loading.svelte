<script>
	import { fade } from 'svelte/transition';
</script>

<div class="loading_wrapper">
	<div class="loading"><i class="ri-loader-line" /></div>
</div>

<style lang="scss">
	.loading_wrapper {
		width: 100%;
		text-align: center;
		padding: 4rem 0;
		.loading {
			display: inline-block;
			@keyframes rotate {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(360deg);
				}
			}
			animation-name: rotate;
			animation-timing-function: linear;
			animation-duration: 2s;
			animation-iteration-count: infinite;
			i {
				color: white;
				font-size: 3rem;
			}
		}
	}
</style>
