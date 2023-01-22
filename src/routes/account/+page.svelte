<script>
	import { pagetitle, userId } from '../../components/stores';
	import { fade } from 'svelte/transition';
	import { userNickname } from '../../components/stores-persist';
	import Section from '../../components/section.svelte';
	import { supabaseClient } from '$lib/db';
	import Pill from '../../components/pill.svelte';
	import Button from '../../components/button.svelte';
	let savedSpellSheets = [];
	let openCard = null;
	let spellsheet;
	$pagetitle = 'My account';
	if (!$userId) {
		getUserId();
	} else {
		loadSpellsheetsByUserId();
	}
	console.log($userId);
	async function getUserId() {
		const {
			data: { user }
		} = await supabaseClient.auth.getUser();
		if (user) {
			userId.set(user.id);
			loadSpellsheetsByUserId();
			// console.log($userId)
		}
	}
	async function loadSpellsheetsByUserId() {
		const { data, error } = await supabaseClient
			.from('spellbooks')
			.select()
			.eq('creatorid', $userId);
		if (data) {
			// console.log(data)
			savedSpellSheets = data;
		}
	}
	function openClickedCard(event, spellsheet) {
		if (savedSpellSheets.length > 2) {
			openCard === spellsheet ? (openCard = null) : (openCard = spellsheet);
		} else {
			console.log(event.target.classList);
			event.target.classList.contains('open') ? (openCard = null) : (openCard = spellsheet);
			console.log(openCard);
		}
	}
	function editDetails() {
		
	}
</script>

<Section name="my-account">
	<div class="panel">
		<h2>My Account</h2>
		<h1>Hi, {$userNickname}!</h1>
	</div>
	<div class="grid">
		<div class="panel spellsheets">
			<h2>Saved spellbooks</h2>
			<div class="grid">
			{#each savedSpellSheets as spellsheet}
				
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="card spellbook {openCard === spellsheet ? 'open' : ''}"
						on:click|self={() => {
							openCard = spellsheet;
						}}
						in:fade={{ duration: 200 }}
					>
						<div class="card_inner">
							<button class="close" on:click={() => (openCard = null)}
								><i class="ri-close-line" /></button
							>
							<div class="wrapper_preview">
								<div class="block">
									<h3><i class="enchantment ri-magic-line s-6GsIJKAX4rVG" /> {spellsheet.name}</h3>
								</div>
								<div class="block">
									<Pill
										label="Class"
										text={spellsheet.class}
										size="large"
										icon="ri-contacts-line"
									/>
									<Pill
										label="Character level"
										text="Level {spellsheet.level}"
										size="large"
										icon="ri-user-star-line"
									/>
								</div>
								<div class="block">
									<p style="margin-top: 1rem">{spellsheet.description}</p>
								</div>
							</div>
							<div class="wrapper_extended">
								<Button text="Load spellbook" type="fill accent" icon="ri-folder-open-line" />
								<Button text="Publish spellbook" type="fill blue" icon="ri-share-line" />
								<Button on:click{editDetails} text="Edit details" type="fill" icon="ri-edit-line" />
								<Button text="Delete spellbook" type="fill alt" icon="ri-delete-bin-line" />
							</div>
						</div>
						<button class="close_veil" on:click={() => (openCard = null)} />
					</div>
				
			{/each}
			</div>
		</div>
		<div class="panel details">
			<h2>Acccount information</h2>
		</div>
	</div>
</Section>

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: 1fr 400px;
		grid-gap: 2rem;
		.panel {
			h2 {
				opacity: 0.85;
			}
			.grid {
				grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
				grid-gap: 1rem;
				.card {
					// height: 200px;
					.card_inner {
						height: 100%;
						width: 100%;
						display: table;
						z-index: 1;
						// transition: 0.3s;
						.wrapper_extended {
							position: absolute;
							margin-top: 1rem;
							width: 100%;
							pointer-events: none;
							height: 0;
							overflow-y: hidden;
							width: 400px;
						}
					}
					&.open {
						.card_inner {
							position: absolute;
							top: 0;
							left: 0;
							max-width: 400px;
							transform: scale(1.02);
							z-index: 2;
							pointer-events: all;
							border-color: transparent !important;
							cursor: auto;
							.wrapper_extended {
								position: relative;
								pointer-events: all;
								height: auto;
								overflow-y: visible;
							}
						}
						.close {
							display: block;
						}
					}
				}
			}
		}
	}
</style>
