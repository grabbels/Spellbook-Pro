<script>
	import { activeSpells } from './stores-persist';
	import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.js';
	import { get } from 'svelte/store';
	import Pill from './pill.svelte';
	import SchoolIcon from './schoolicon.svelte';
	import { activeLevels } from './stores';
	const levels = [
		'cantrips',
		'level 1',
		'level 2',
		'level 3',
		'level 4',
		'level 5',
		'level 6',
		'level 7',
		'level 8',
		'level 9'
	];
	let printWindow;
	let allSpells = get(activeSpells);
	// let working = false;
	export let working;
	$: working === true ? exportAsPDF() : '';
	function exportAsPDF() {
		console.log('test');
        setTimeout(() => {
            // html2pdffunction()
            console.log(printWindow)
        }, 200);
		
	}

	function html2pdffunction() {
		//
		var opt = {
			margin: 0,
			filename: 'spellbook.pdf',
			image: { type: 'jpeg', quality: 98 },
			html2canvas: { scale: 1, y: 0, x: 0, windowWidth: 1200, windowHeight: 950 },
			jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
			pagebreak: { mode: 'legacy' }
		};
		html2pdf()
			.set(opt)
			.from(printWindow)
			.save()
			.then(() => {
				//
				// window.printLayoutWindow.remove();
				// window.blocker.remove();
				// document.documentElement.style.fontSize = '16px';
				// document.documentElement.classList = themeSelect.value;
			});
	}
</script>

{#if working === true}
	<div class="print_window" bind:this={printWindow}>
		{#each $activeLevels as level}
			<div class="grid_wrapper panel" id={level}>
				<h2>{levels[level]}</h2>
				<div class="grid">
					{#each $activeSpells as spell}
                    {#if spell.level == level}
						{@const spellDescription = spell.description.toLowerCase()}
						<div class="card item print">
							<div class="card_inner">
								<div class="block">
									<h3>
										<SchoolIcon print="true" school={spell.school} />
										<span style="margin-left: .3rem">{spell.name}</span>
									</h3>
								</div>
								<div class="block pills">
									<Pill
										text={spell.casting_time}
										size="large"
										print="true"
										icon="ri-flashlight-line"
									/>
									<Pill
										text={spell.range}
										size="large"
										print="true"
										icon="ri-arrow-right-up-line"
									/>
									<Pill text={spell.duration} size="large" print="true" icon="ri-time-line" />
								</div>
								<div class="block pills">
									<Pill text={spell.school} size="small" icon="ri-book-2-line" print="true" />

									{#if spellDescription.includes('make a ranged spell attack')}
										<Pill
											text="Ranged spell attack"
											size="small"
											icon="ri-sword-line"
											print="true"
										/>
									{:else if spellDescription.includes('make a melee spell attack')}
										<Pill
											text="Melee spell attack"
											size="small"
											icon="ri-sword-line"
											print="true"
										/>
									{:else if spellDescription.includes('make a spell attack')}
										<Pill print="true" text="Spell attack" size="small" icon="ri-sword-line" />
									{:else if spell.save}
										<Pill print="true" text={spell.save} size="small" icon="ri-lifebuoy-line" />
									{/if}
								</div>
								<div class="block description">
									<p>{@html spell.description}</p>
								</div>
							</div>
						</div>
                        {/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.print_window {
		position: absolute;
		top: 0;
		left: 0;
		width: 1200px;
		aspect-ratio: 1 / 1.414;
		z-index: 9999;
		background-color: white;
        h2 {
            font-size: 2rem;
            background-color: black;
            color: white;
            opacity: 1;
            padding: .2rem .8rem;
            display: inline-block;
            width: 50%;
            margin-left: 0;
        }
	}
    .grid_wrapper {
        gap: 3rem;
		padding: 3rem;
    }
	.grid {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
        gap: 2rem;
		
	}
	.item.print {
		pointer-events: none;
		background-color: transparent;
		height: auto;
		h3 {
			font-weight: 700;
			font-size: 1.8rem;
			color: black;
			:global(i) {
				color: black;
				font-size: 1.9rem;
			}
		}
		.card_inner {
			background-color: transparent;
			box-shadow: none;
			height: auto;
			padding: 0;
			.block {
				&.description {
					* {
						color: black;
					}
					&:after {
						display: none;
					}
				}
			}
		}
	}
</style>
