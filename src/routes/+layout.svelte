<script>
	import PageTransition from '../components/PageTransition.svelte';
	/** @type {import('./$types').LayoutData} */
	export let data;
	import { Body } from 'svelte-body';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/supabaseClient';
	import { page } from '$app/stores';
	import { invalidate } from '$app/navigation';
	import Header from '../components/header.svelte';
	import AddSpells from '../components/addspells.svelte';
	import TopMenu from '../components/topmenu.svelte';
	import {
		sidemenuopen,
		topmenuopen,
		notification,
		pagetitle,
		session,
		modalCall,
		quickQuery,
		userId,
		userEmail,
		userNickname
	} from '../components/stores';
	import { retrieveSession, refreshSession, setUserData } from '../components/globalfunctions.svelte';
	import { loggedIn, firstVisit } from '../components/stores-persist';

	import '@fontsource/kanit';
	import Modal from '../components/modal.svelte';
	import Pdf from '../components/pdf.svelte';
	let timeOut = 3000;
	export const closeMenu = () => {
		if ($sidemenuopen === true || $topmenuopen === true) {
			sidemenuopen.set(false);
			topmenuopen.set(false);
		}
	};
	$: if ($notification) {
		$notification.split('#')[1].includes('info') ? (timeOut = 10000) : 10000;
		setTimeout(() => {
			$notification = '';
		}, timeOut);
	}
	onMount(() => {
		refreshSession();
	});

	async function checkIfLoggedIn() {
		// if ($loggedIn === null) {
		const {
			data: { user }
		} = await supabaseClient.auth.getUser();
		if (user) {
			$loggedIn = true;
			$userNickname = user.user_metadata.nickname;
		} else {
			$userNickname = null;
			$loggedIn = false;
		}

		// }
	}
	if (!$session) {
		let promiseSession = retrieveSession();
		promiseSession.then((value) => {
			$session = value;
			setUserData();
			// $userId = value.user.id
		});
	} else {
		// $userId = $session.user.id
	}
	console.log;
	let body;
	let scrollTop;
	console.log($firstVisit);
	if ($firstVisit == true) {
		$modalCall = 'welcome';
		$firstVisit = false;
	} else {
		$modalCall = '';
	}
</script>

<Body
	bind:this={body}
	class={$topmenuopen ? 'noscroll' : $sidemenuopen ? 'noscroll' : $modalCall ? 'noscroll' : ''}
/>

<TopMenu />

<AddSpells />

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div
	class="main_wrapper {$page.url.pathname.split('/').pop()}"
	class:sidemenuopen={$sidemenuopen}
	class:topmenuopen={$topmenuopen}
>
	<main>
		{#key $pagetitle}
			{#if $pagetitle != 'Login' && $pagetitle != 'Password reset'}
				<div>
					<Header />
				</div>
			{/if}
		{/key}
		<!-- {#key $pagetitle} -->
		<!-- <div in:fly={{ y: 10, duration: 300 }}> -->
		<PageTransition pathname={data.pathname}><slot /></PageTransition>
		<!-- {/key} -->
	</main>

	<div on:click={closeMenu} class="closemenu" />
</div>

{#if $notification}
	<button
		transition:fly={{ y: 10, duration: 300 }}
		on:click={() => ($notification = '')}
		class:show={$notification}
		class="notification"
	>
		<div
			class="{$notification.split('#')[1].includes('error')
				? 'error'
				: $notification.split('#')[1].includes('alert')
				? 'alert'
				: $notification.split('#')[1].includes('positive')
				? 'positive'
				: $notification.split('#')[1].includes('info')
				? 'info'
				: ''} notification_inner"
		>
			<div>
				<i class="ri-error-warning-fill" /><i class="ri-alert-fill" />
				<i class="ri-checkbox-circle-line" /> <i class="ri-information-line" />
			</div>
			<div>
				<p>
					{@html $notification.split('#')[0]}
				</p>
			</div>
		</div>
	</button>
{/if}

{#if ($modalCall && $modalCall != 'lookup') || ($modalCall && $quickQuery)}
	{#key $modalCall}
		<Modal />
	{/key}
{/if}

<style lang="scss">
	@import '../../node_modules/remixicon/fonts/remixicon.css';
	:global {
		@import '../../static/reset';
		@import '../global.scss';
	}
	main {
		min-height: 100vh;
	}

	.main_wrapper {
		height: 100%;
		width: 100%;
		position: relative;
		transition: transform 0.3s;
		background: background 2s;
		background: linear-gradient(238deg, rgba(101, 40, 143, 1) 0%, rgba(46, 35, 112, 1) 100%);
		z-index: 1;
		// overflow-y: auto;
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(238deg, rgb(62, 35, 112) 0%, rgb(34, 18, 59) 100%);
			z-index: -1;
			transition: 0.5s;
			opacity: 0;
		}
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(238deg, rgb(77, 35, 112) 0%, rgb(35, 14, 75) 100%);
			z-index: -1;
			transition: 0.5s;
			opacity: 0;
		}
		&.browse {
			&::after {
				opacity: 1;
			}
		}
		&.account {
			&::before {
				opacity: 1;
			}
		}
		.closemenu {
			position: fixed;
			left: 0;
			top: 0;
			height: 100vh;
			width: 100%;
			background-color: transparent;
			display: none;
			z-index: 10;
		}
		&.sidemenuopen {
			transform: translateX(400px);
			.closemenu {
				display: block;
			}
		}
		&.topmenuopen {
			transform: translateY(115px);
			@media only screen and (max-width: 1024px) {
				transform: translateY(0px);
			}
			.closemenu {
				display: block;
			}
		}
	}

	.notification {
		position: fixed;
		bottom: 2rem;
		width: 100%;
		left: 0;
		z-index: 999;
		display: flex;
		justify-content: center;
		padding: 0;
		cursor: auto;
		.notification_inner {
			padding: 0.8rem 3rem;
			background-color: var(--white);
			border-radius: 50vh;
			display: grid;
			grid-template-columns: 34px 1fr;
			div {
				display: flex;
				align-items: center;
			}
			@media only screen and (max-width: 1024px) {
				padding: 0.4rem 1rem;
				margin: 0 0.5rem;
			}
			filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.6));
			p {
				text-align: left;
				color: var(--black);
				margin-bottom: 0;
				:global(a) {
					color: var(--bg);
					transition: 0.1s;
					&:hover {
						color: var(--accent);
					}
				}
			}
			i {
				display: none;
				font-size: 1.5rem;
				vertical-align: -6px;
				// margin-right: .5rem;
				@media only screen and (max-width: 1024px) {
					float: left;
				}
			}
			&.error {
				i.ri-error-warning-fill {
					display: inline;
					color: var(--secondary);
				}
			}
			&.alert {
				i.ri-alert-fill {
					display: inline;
					color: var(--yellow);
				}
			}
			&.info {
				i.ri-information-line {
					display: inline;
					color: var(--lightblue);
				}
			}
			&.positive {
				i.ri-checkbox-circle-line {
					display: inline;
					color: var(--lightgreen);
				}
			}
		}
	}
</style>
