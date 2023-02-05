<script>
	import Pill from "../pill.svelte";
	import Schoolicon from "../schoolicon.svelte";
	import { lookupSpell } from "../stores/stores";


    
</script>

{#if $lookupSpell}
<div
	data-name={$lookupSpell.name}
	class="card item"
	data-castingtime={$lookupSpell.casting_time}
	data-range={$lookupSpell.range}
>
	<div class="card_inner">
		<div class="block">
			<h3>
				<Schoolicon school={$lookupSpell.school} />
				<span style="margin-left: .3rem">{$lookupSpell.name}</span>
			</h3>
		</div>
		<div class="block pills">
			<Pill
				label="Casting time"
				text={$lookupSpell.casting_time}
				size="large"
				icon="ri-flashlight-line"
			/>
			<Pill
				label="Range or target"
				text={$lookupSpell.range}
				size="large"
				icon="ri-arrow-right-up-line"
			/>
			<Pill label="Duration" text={$lookupSpell.duration} size="large" icon="ri-time-line" />
		</div>
		<div class="block pills">
			<Pill label="School of magic" text={$lookupSpell.school} size="small" icon="ri-book-2-line" />

			{#if $lookupSpell.description.toLowerCase().includes('make a ranged spell attack')}
				<Pill label="Spell attack" text="Ranged spell attack" size="small" icon="ri-sword-line" />
			{:else if $lookupSpell.description.toLowerCase().includes('make a melee spell attack')}
				<Pill label="Spell attack" text="Melee spell attack" size="small" icon="ri-sword-line" />
			{:else if $lookupSpell.description.toLowerCase().includes('make a spell attack')}
				<Pill label="Spell attack" text="Spell attack" size="small" icon="ri-sword-line" />
			{:else if $lookupSpell.save}
				<Pill label="Saving throw" text={$lookupSpell.save} size="small" icon="ri-lifebuoy-line" />
			{/if}
		</div>
		<div class="block description">
			<p>{@html $lookupSpell.description}</p>
		</div>
	</div>
</div>
{/if}
<style lang="scss">
    .card {
		width: 100%;
		cursor: auto;
		&:hover {
			.card_inner {
				border-color: var(--accent) !important;
			}
		}
		.card_inner {
			padding: 0;
			box-shadow: none;
			border-width: 0px;
			pointer-events: unset;
			.block {
				pointer-events: unset;
				&.description {
					height: auto;
					p {
						font-size: 1rem;
					}
					&:after {
						display: none;
					}
				}
			}
		}
	}
</style>