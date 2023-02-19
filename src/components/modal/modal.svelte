<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import {
		modalCall,
		quickQuery,
		lookupSpell,
		lookupBook,
		profileUser,
		userProfile,
		bookToEdit,
		userId,
		pagetitle
	} from '../stores/stores';
	import {
		loadBook,
		getUserProfile,
		editBook,
		publishBook,
		unpublishBook,
		removeBook
	} from '../functions/globalfunctions.svelte';
	import Pill from '../pill.svelte';
	import Button from '../button.svelte';
	import Close from '../close.svelte';
	import SchoolIcon from '../schoolicon.svelte';
	import PrivacyPolicy from './privacy-policy.svelte';
	import Submitspells from './submitspells.svelte';
	import Saveslot from '../saveslot.svelte';
	import Welcome from './welcome.svelte';
	import Saveloadedit from './saveloadedit.svelte';
	import Passwordreset from './passwordreset.svelte';
	import Lookup from './lookup.svelte';
	import Spell from './spell.svelte';
	import Options from './options.svelte';
	import { pb } from '$lib/pocketbase';
	import Prompt from './confirm-email-change.svelte';
	import ConfirmEmailChange from './confirm-email-change.svelte';
	import ConfirmPasswordReset from './confirm-password-reset.svelte';
	import Spellbook from './spellbook.svelte';
	import Share from './share.svelte';
	import Tutorial from './tutorial.svelte';
	export let modal;
	let levelList = [];
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
	let saveColor;
	let publishloading = false;
	let unpublishloading = false;
	let removeloading = false;
	$: saveColor = $bookToEdit ? $bookToEdit.color : 'var(--purple)';

	let showModal = false;

	$: $lookupBook, (publishloading = false), (unpublishloading = false);

	$: $modalCall, showModalFunction(), console.log($modalCall);

	function showModalFunction() {
		if (showModal == false && $modalCall) {
			showModal = true;
		}
	}

	// $: if ($modalCall == '' && $modalCall == 'lookup') {
	// 	$quickQuery = '';
	// }

	function closeModal() {
		$modalCall = '';
		$quickQuery = '';
		$lookupSpell = '';
		showModal = false;
	}

	function handleKeyDown(e) {
		closeModal();
	}

	$: console.log($modalCall);
	$: console.log($lookupBook);

	$: if ($profileUser) {
		getUserProfile();
	}

	function transition(node, options) {
		if ($modalCall != 'lookup') {
			return options.fn(node, options);
		}
	}
</script>

<!-- {#if $modalCall == 'save'} -->
{#if showModal == true}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="modal_wrapper"
		bind:this={modal}
		in:transition={{ fn: fly, duration: 250 }}
		out:fade={{ duration: 100, delay: 0 }}
		on:click|self={() => closeModal()}
		role="button"
	>
		<div class="modal {$modalCall}" in:transition={{ fn: fly, duration: 200, y: 20, delay: 50 }}>
			<Close
				on:click={() => {
					closeModal();
				}}
			/>
			{#if $modalCall.includes('welcome')}
				<div class="modal_inner">
					<Welcome />
				</div>
			{:else if $modalCall.includes('save') || $modalCall.includes('load') || $modalCall.includes('edit')}
				<div class="modal_inner">
					<div class="bookmark_decal">
						<i class="ri-bookmark-fill" style={$bookToEdit.color ? 'color: ' + saveColor : ''} />
					</div>
					<Saveloadedit />
				</div>
			{:else if $modalCall.includes('terms')}
				<div class="modal_inner">
					<PrivacyPolicy />
				</div>
			{:else if $modalCall.includes('resetpassword')}
				<div class="modal_inner">
					<Passwordreset />
				</div>
			{:else if $modalCall.includes('lookup')}
				<div class="modal_inner">
					<Lookup />
				</div>
			{:else if $modalCall.includes('share')}
				<div class="modal_inner">
					<Share />
				</div>
			{:else if $modalCall.includes('tutorial')}
				<div class="modal_inner">
					<Tutorial />
				</div>
			{:else if $modalCall.includes('confirm-email-change')}
				<div class="modal_inner">
					<ConfirmEmailChange />
				</div>
			{:else if $modalCall.includes('confirm-password-reset')}
				<div class="modal_inner">
					<ConfirmPasswordReset />
				</div>
			{:else if $modalCall == 'spell' || $modalCall.includes('fromquicksearch')}
				<div class="modal_inner">
					<Spell />
				</div>
			{:else if $modalCall.includes('submitspell')}
				<div class="modal_inner">
					<Submitspells />
				</div>
			{:else if $modalCall.includes('profile')}
				<div class="modal_inner">
					{#if $userProfile}
						<h2>{$userProfile[0].creator}</h2>
						<h3 style="margin-bottom: 1rem">Published spellbooks</h3>
						<div class="grid">
							{#each $userProfile as spellbook}
								{#if spellbook.published === true}
									<Saveslot
										on:click={() => {
											($lookupBook = spellbook), ($modalCall = 'spellbook');
										}}
										type="large noedit"
										data={spellbook}
									/>
								{/if}
							{/each}
						</div>
					{/if}
				</div>
			{:else if $modalCall.includes('options')}
				<div class="modal_inner">
					<Options />
				</div>
			{:else if $modalCall.includes('spellbook')}
				<Spellbook />
			{/if}
		</div>
	</div>
{/if}
<svelte:window on:keydown={(e) => (e.key == 'Escape' ? handleKeyDown(e) : '')} />

<!-- {/if} -->
<style lang="scss" global>
	.modal_wrapper {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(7px);
		z-index: 998;
		display: flex;
		justify-content: center;
		align-items: center;
		.modal {
			height: auto;
			max-height: 100vh;
			width: 100%;
			max-width: 800px;
			box-shadow: 0 8px 20px rgba(8, 8, 8, 0.4);
			background-color: var(--spellbg);
			border-radius: 6px;
			position: relative;
			&.load {
				.slot:not(.taken) {
					display: none;
				}
			}
			.close_modal {
				position: fixed;
				width: 100vw;
				height: 100vh;
				left: 0;
				top: 0;
				z-index: -1;
			}
			.modal_inner {
				height: 100%;
				padding: 2rem;
				background-color: var(--spellbg);
				border-radius: 6px;
				max-height: 90vh;
				overflow-y: auto;
				@media only screen and (max-width: 1023px) {
					max-height: 100vh;
					width: 100%;
					padding: 5vw;
					padding-top: 2.5rem;
				}
				.bookmark_decal {
					transform: rotate(90deg);
					position: absolute;
					left: -47px;
					z-index: -1;
					top: 0px;
					i {
						font-size: 5rem;
						color: var(--yellow);
					}
				}
			}
			&.profile {
				.grid {
					display: grid;
					gap: 0.5rem;
					grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
				}
			}
			&.lookup {
				background-color: rgba(0, 0, 0, 0.5);
				// backdrop-filter: blur(10px);
				min-height: 0;
				align-self: flex-start;
				margin-top: 10vh;
				max-width: 600px;
				@media only screen and (max-width: 1024px) {
					margin-top: 0;
				}
				.modal_inner {
					// background-color: transparent;
					@media only screen and (max-width: 1023px) {
						padding: 0.5rem;
					}
				}
			}
			&.spell {
				min-height: 0;
				max-height: 100vh;
				max-width: 600px;
				@media only screen and (max-width: 1024px) {
					max-width: none;
				}
			}
			&.spellbook {
				h2 {
					i {
						vertical-align: sub;
						font-size: 2rem;
					}
				}
			}
			&.share {
				max-width: 600px;
				// padding-top: .4rem;
			}
		}
		.card {
			width: 100%;
			cursor: auto;
			&:hover {
				.card_inner {
					border-color: var(--accent) !important;
				}
			}
			* {
				pointer-events: all;
			}
			.card_inner {
				padding: 0;
				box-shadow: none;
				border-width: 0px;
				pointer-events: unset;
				@media only screen and (max-width: 1023px) {
					padding: 0 !important;
				}
				.block {
					pointer-events: unset;
					&.pills {
						margin-top: 0.5rem;
					}
					&.title {
						h2 {
							width: 100%;
						}
					}
					&.description {
						height: auto;
						p {
							font-size: 1rem;
						}
						mask-image: none !important;
					}
					&.buttons {
						margin-top: 1rem;
						display: flex;
						gap: 0.3rem;
					}
					&.spells {
						display: block;
						h3 {
							margin-top: 1rem;
							margin-bottom: -1rem;
						}
						p.level {
							margin-top: 1rem;
						}
						ul {
							display: grid;
							grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
							gap: 0 1rem;
							li {
								p {
									font-size: 0.9rem;
									margin-bottom: 0;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
