<script>
	import PageTransition from '../components/functions/PageTransition.svelte';
	/** @type {import('./$types').LayoutData} */
	export let data;
	import { Body } from 'svelte-body';
	import { fly, fade, scale } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
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
		userNickname,
		editingTitle,
		loadingScreen
	} from '../components/stores/stores';
	import {
		retrieveSession,
		refreshSession,
		setUserData,
		reverseString,
		loadBook
	} from '../components/functions/globalfunctions.svelte';
	import { loggedIn, firstVisitB, userPrefs, activeTab } from '../components/stores/stores-persist';

	import '@fontsource/kanit';
	import Modal from '../components/modal/modal.svelte';
	import Pdf from '../components/pdf.svelte';
	import { pb } from '$lib/pocketbase';
	import Section from '../components/section.svelte';
	import Loadingscreen from '../components/loadingscreen.svelte';
	// refreshSession()
	if ($page.url.searchParams) {
		let urlParams = $page.url.searchParams;
		if (urlParams.has('confirm-verification')) {
			const token = urlParams.get('confirm-verification');
			verifyEmail(token);
		} else if (urlParams.has('confirm-password-reset')) {
			$modalCall = 'confirm-password-reset';
		} else if (urlParams.has('confirm-email-change')) {
			$modalCall = 'confirm-email-change';
		} else if (urlParams.has('book')) {
			const bookId = urlParams.get('book');
			console.log(bookId);
			loadBook(bookId);
		}
	}

	const token = $page.url.searchParams.get('confirm-verification');
	setUserData();
	if (token) {
		verifyEmail(token);
	}
	async function verifyEmail(token) {
		try {
			await pb.collection('users').confirmVerification(token);
		} catch (err) {
			console.log(err);
			$notification = err.data.message + ' Error code: ' + err.data.code + '#error';
		} finally {
			$notification =
				'Your email has been succesfully verified. You can now <a href="/account/login">log in</a>!#positive';
		}
	}

	let timeOut = 3000;
	export const closeMenu = () => {
		if ($sidemenuopen === true || $topmenuopen === true) {
			sidemenuopen.set(false);
			topmenuopen.set(false);
		}
	};

	$: $notification, clearTimeout(), showNotification();

	function showNotification() {
		if ($notification) {
			$notification.length > 120
				? (timeOut = 8000)
				: $notification.length > 80
				? (timeOut = 6500)
				: $notification.length > 60
				? (timeOut = 5000)
				: (timeOut = 4000);
			const destroy = setTimeout(() => {
				$notification = '';
			}, timeOut);
		}
	}
	onMount(() => {
		refreshSession();
	});

	$: $pagetitle, ($topmenuopen = false);

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

	let body;
	let scrollTop;
	if ($firstVisitB === true) {
		$modalCall = 'welcome';
		$firstVisitB = false;
	}
	function handleKeyDown(e) {
		if (
			!e.altKey &&
			!e.ctrlKey &&
			!e.metaKey &&
			$pagetitle == 'Home' &&
			!$sidemenuopen &&
			!$topmenuopen &&
			!$editingTitle &&
			!$modalCall &&
			document.activeElement.id != 'spellbooksearch'
		) {
			if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)) {
				$modalCall = 'lookup';
				// $quickQuery = e.key;
			}
		} else if (e.key == 'Escape') {
			$notification = '';
		}
	}
</script>

<Body
	bind:this={body}
	class="{$topmenuopen
		? 'noscroll'
		: $sidemenuopen
		? 'noscroll'
		: $modalCall
		? 'noscroll'
		: ''} {$userPrefs.theme}"
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
					<!-- {#if $pagetitle == 'Home'}
					<Section>
						<Tabs />
					</Section>
					{/if} -->

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

	<div
		class="background {$pagetitle.toLowerCase().includes('premade')
			? 'dark'
			: $pagetitle.toLowerCase().includes('account')
			? 'alt'
			: ''}"
	/>
	<Section name="footer">
		<p style="text-align:center; font-size: .9rem">
			Created by <a target="_blank" rel="noreferrer" href="https://semhak.com">Sem Hak</a>.
			<button
				class="naked"
				style="padding: 0; text-decoration: underline"
				on:click={() => ($modalCall = 'terms')}>Terms and conditions</button
			>
		</p>
		<p style="text-align:center; font-size: .9rem; opacity: .7">
			Spells and related content originating from the official D&D handbooks are the intellectual
			property of Wizards of the Coast LLC.
		</p>
		<p style="text-align:center; font-size: .9rem; opacity: .7">
			Check out the source code of this website on <a
				target="_blank"
				rel="noreferrer"
				href="https://github.com/grabbels/Spellbook-Pro">GitHub</a
			>.
		</p>
	</Section>
</div>

{#if $notification}
	{#key $notification}
		<button
			in:fly={{ y: 10, duration: 300, delay: 100 }}
			out:fly={{ y: 10, duration: 200 }}
			on:click={() => ($notification = '')}
			class:show={$notification}
			class="notification"
		>
			<div
				class="{$notification.split('#')[1].includes('error')
					? 'error'
					: $notification.split('#')[1].includes('alert')
					? 'alert'
					: $notification.split('#')[1].includes('loading')
					? 'loading'
					: $notification.split('#')[1].includes('positive')
					? 'positive'
					: $notification.split('#')[1].includes('info')
					? 'info'
					: ''} notification_inner"
			>
				<div in:scale={{ duration: 200 }}>
					<i class="ri-error-warning-fill" /><i class="ri-alert-fill" />
					<i class="ri-checkbox-circle-line" /><i class="ri-information-line" />
					<div class="loading"><i class="ri-loader-5-line" /></div>
				</div>
				<div>
					<p>
						{@html $notification.split('#')[0]}
					</p>
				</div>
			</div>
		</button>
	{/key}
{/if}

{#if $modalCall}
	<Modal />
{/if}

{#if $loadingScreen}
	<Loadingscreen />
{/if}
<svelte:window on:keydown={(e) => handleKeyDown(e)} />

<style lang="scss">
	@import '../../node_modules/remixicon/fonts/remixicon.css';
	:global {
		@import '../../static/reset';
		@import '../global.scss';
		@import '../themes.scss';
	}
	main {
		min-height: 100vh;
		height: 100%;
	}

	.main_wrapper {
		height: auto;
		width: 100%;
		position: relative;
		transition: transform 0.3s;
		z-index: 1;

		// overflow-y: auto;
		// &::after {
		// 	content: '';
		// 	position: absolute;
		// 	top: 0;
		// 	left: 0;
		// 	width: 100%;
		// 	height: 100%;
		// 	background: linear-gradient(238deg, rgb(62, 35, 112) 0%, rgb(34, 18, 59) 100%);
		// 	z-index: -1;
		// 	transition: 0.5s;
		// 	opacity: 0;
		// }
		// &::before {
		// 	content: '';
		// 	position: absolute;
		// 	top: 0;
		// 	left: 0;
		// 	width: 100%;
		// 	height: 100%;
		// 	background: linear-gradient(238deg, rgb(77, 35, 112) 0%, rgb(35, 14, 75) 100%);
		// 	z-index: -1;
		// 	transition: 0.5s;
		// 	opacity: 0;
		// }
		.background {
			background: var(--pagebg);
			transition: 0.3s;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			position: absolute;
			z-index: -1;
			transform: scaleY(-1);
			&.dark {
				filter: brightness(0.7);
			}
			&.alt {
				filter: hue-rotate(-7deg) brightness(0.9);
			}
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
			@media only screen and (max-width: 1023px) {
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
				@media only screen and (max-width: 1023px) {
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
			&.loading {
				.loading {
					// display: inline-flex;
					// justify-content: center;
					// align-items: center;
					animation: loading 1s cubic-bezier(0.5, 0.15, 0.5, 0.85) infinite;
					width: 35px;
					height: 35px;
					margin-left: -1rem;
					@media only screen and (max-width: 1023px) {
						margin-left: 0;
					}
					i {
						color: var(--lightblue);
						display: inline;
						margin: auto;
						margin-bottom: 2px;
					}
					@keyframes loading {
						to {
							transform: rotate(360deg);
						}
					}
				}
			}
		}
	}
</style>
