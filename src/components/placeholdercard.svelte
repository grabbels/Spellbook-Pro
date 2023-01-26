<script>
	import Pill from './pill.svelte';
	import SchoolIcon from './schoolicon.svelte';
</script>

<div class="card placeholder">
	<div class="card_inner">
		<div class="block">
			<h3>
				<SchoolIcon school="blank" />
				<span style="margin-left: .3rem">{'◼'.repeat(Math.floor(Math.random() * 6) + 4)}</span>
			</h3>
		</div>
		<div class="block pills">
			<Pill
				label="Casting time"
				text={'◼'.repeat(Math.floor(Math.random() * 8) + 6)}
				size="large"
				icon="ri-checkbox-blank-circle-fill"
			/>
			<Pill
				label="Range or target"
				text={'◼'.repeat(Math.floor(Math.random() * 8) + 6)}
				size="large"
				icon="ri-checkbox-blank-circle-fill"
			/>
			<Pill
				label="Duration"
				text={'◼'.repeat(Math.floor(Math.random() * 8) + 6)}
				size="large"
				icon="ri-checkbox-blank-circle-fill"
			/>
		</div>
		<div class="block pills">
			<Pill
				label="School of magic"
				text={'◼'.repeat(Math.floor(Math.random() * 8) + 6)}
				size="small"
				icon="ri-checkbox-blank-circle-fill"
			/>
		</div>
		<div class="block description">
			<p style="word-break: break-all;">
				{'◼'.repeat(Math.floor(Math.random() * 100) + 100)}
			</p>
		</div>
	</div>
</div>

<style lang="scss">
	.placeholder {
		opacity: 0.2;
		pointer-events: none !important;
        width: 100%;
		.card_inner {
			pointer-events: none !important;
			* {
				letter-spacing: -4px;
				opacity: 0.2;
				pointer-events: none !important;
			}
			h3 {
				opacity: 1;
				font-size: 2rem;
				span {
					opacity: 1;
					letter-spacing: -2.9px;
				}
			}
			p {
				line-height: 1.3;
				font-size: 1.8rem;
			}
			.block.description {
				&:after {
					display: none;
				}
			}
		}
	}
</style>
