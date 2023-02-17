<script>
	import { activeSpells } from './stores/stores-persist';
	// import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.js';
	import { get } from 'svelte/store';
	import Pill from './pill.svelte';
	import SchoolIcon from './schoolicon.svelte';
	import { activeLevels } from './stores/stores';
	import { onMount, afterUpdate } from 'svelte';
	import { refreshList } from './functions/globalfunctions.svelte';
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
	// let spells = [];
	let allSpells = get(activeSpells);
	// let working = false;
	export let working;
	let spells = [];
	let grids = [];
	onMount(() => {
		// spells = document.querySelectorAll('.card.print')
	});

	// beforeUpdate(async () => {
	// console.log('the component is about to update');
	// await tick();

	// if (spells && working === true) {
	// 	exportAsPDF()
	// 	return;
	// }
	// });
	afterUpdate(() => {
		exportAsPDF();
	});

	// $: working === true ? exportAsPDF() : '';
	function exportAsPDF() {
		console.log('PDF');
		refreshList();

		grids = document.querySelectorAll('.print_window .grid');
		document.documentElement.style.fontSize = '10px';

		let columnHeight = 348.983;
		let largestOffset;
		for (let i = 0; i < grids.length; i++) {
			largestOffset = 0;
			let leftColumnOffset = grids[i].previousElementSibling.clientHeight;
			let rightColumnOffset = grids[i].previousElementSibling.clientHeight;
			let columnIteration = 0;
			spells = grids[i].querySelectorAll('.card.print');
			console.log(spells);
			for (let i = 0; i < spells.length; i++) {
				let thisSpellHeight = spells[i].clientHeight;
				spells[i].setAttribute('data-height', thisSpellHeight);
				if (spells[i + 2]) {
					if (columnIteration % 2 == 0 || columnIteration == 0) {
						if (columnHeight - thisSpellHeight > 0) {
							leftColumnOffset += columnHeight - thisSpellHeight;
							spells[i + 2].style.marginTop = leftColumnOffset * -1 + 50 + 'px';
						}
					} else {
						if (columnHeight - thisSpellHeight > 0) {
							rightColumnOffset += (columnHeight - thisSpellHeight);
							spells[i + 2].style.marginTop = rightColumnOffset * -1 + 50 + 'px';
						}
					}
				}
				console.log('left: ' + leftColumnOffset);
				console.log('right: ' + rightColumnOffset);
				console.log(columnIteration);
				columnIteration++;
			}
			// console.log('left: ' + leftColumnOffset);
			// console.log('right: ' + rightColumnOffset);
			if (rightColumnOffset > leftColumnOffset) {
				largestOffset = rightColumnOffset;
				// console.log(largestOffset);
			} else {
				largestOffset = leftColumnOffset;
				// console.log(largestOffset);
			}
			if (largestOffset && grids[i].nextElementSibling) {
				grids[i].nextElementSibling.style.marginTop = largestOffset * -1 + 20 + 'px';
			}
		}

		setTimeout(() => {
			// html2pdffunction()
		}, 200);
	}

	function html2pdffunction() {
		//
		var opt = {
			margin: 0,
			filename: 'spellbook.pdf',
			image: { type: 'jpeg', quality: 98 },
			html2canvas: { scale: 4, y: 0, x: 0, windowWidth: 600, windowHeight: 950 },
			jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
			pagebreak: { mode: 'legacy' }
		};
		html2pdf()
			.set(opt)
			.from(printWindow)
			.save()
			.then(() => {
				document.documentElement.style.fontSize = '16px';
				//
				// window.printLayoutWindow.remove();
				// window.blocker.remove();
				// document.documentElement.style.fontSize = '16px';
				// document.documentElement.classList = themeSelect.value;
			});
	}
</script>

<svelte:window on:load={() => exportAsPDF()} />

{#if working === true}
	<div class="print_window" bind:this={printWindow}>
		{#each $activeLevels as level}
			<!-- <div class="card level item print"> -->
			<h2>{levels[level]}</h2>
			<!-- </div> -->
			<div class="grid">
				{#each $activeSpells as spell, i}
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
								<div class="block description print">
									<p>{@html spell.description}</p>
								</div>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.print_window {
		position: relative;
		width: 210mm;
		aspect-ratio: 1 / 1.414;
		background-color: var(--white);
		padding: 8mm;
		&:before {
			position: absolute;
			left: 0;
			top: 0;
			content: '';
			width: 210mm;
			height: 297mm;
			border: 1px solid black;
		}
		h2 {
			font-size: 2rem;
			background-color: black;
			color: var(--white);
			opacity: 1;
			padding: 0.2rem 0.8rem;
			display: inline-block;
			width: 50%;
			margin-left: 0;
			height: 0;
			display: table;
			margin-bottom: 1rem;
		}
	}
	// .grid_wrapper {
	// 	gap: 3rem;
	// 	padding: 3rem;
	// 	margin: 0;
	// }
	.grid {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		// gap: 10mm;
		grid-auto-rows: 92.3333333333333mm;
	}
	.item.print {
		pointer-events: none;
		background-color: transparent;
		height: 40px;
		display: table;
		&:nth-child(odd) {
			margin-right: 4mm;
		}
		&:nth-child(even) {
			margin-left: 4mm;
		}
		&.level {
			grid-column-start: 1;
			grid-column-end: 3;
		}
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
			border: none;
			.block {
				&.description {
					&.print {
						:global(*) {
							color: var(--black) !important;
						}
					}
					p {
						color: black !important;
						p {
							color: black !important;
						}
					}
					&:after {
						display: none;
					}
				}
			}
		}
	}
</style>
