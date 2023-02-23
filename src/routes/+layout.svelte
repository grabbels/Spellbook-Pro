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
	import Inky from '$lib/inky-small.png';
	import {
		sidemenuopen,
		topmenuopen,
		notification,
		pagetitle,
		session,
		modalCall,
		userNickname,
		editingTitle,
		loadingScreen,
		bookmarksOpen,
		filtersOpen,
		tabsPanelOpen
	} from '../components/stores/stores';
	import {
		retrieveSession,
		refreshSession,
		setUserData,
		reverseString,
		loadBook,
		topMenuOpenClose,
		closeTab
	} from '../components/functions/globalfunctions.svelte';
	import {
		loggedIn,
		firstVisitB,
		userPrefs,
		activeTab,
		openSpellbooks,
		activeSpells
	} from '../components/stores/stores-persist';
	import '@fontsource/kanit';
	import Modal from '../components/modal/modal.svelte';
	import Pdf from '../components/functions/pdf.svelte';
	import { currentUser, pb } from '$lib/pocketbase';
	import Section from '../components/section.svelte';
	import Loadingscreen from '../components/loadingscreen.svelte';
	import Footer from '../components/footer.svelte';
	import { dummyList } from '../components/data/spells';
	import TabBar from '../components/mobile-tabbar.svelte';
	import MobileHeader from '../components/mobile-header.svelte';
	import MobileTabbar from '../components/mobile-tabbar.svelte';
	let tutorial = '';
	let innerWidth;
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

	// $modalCall = 'tutorial'

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

	console.log($userNickname);

	$: $notification,
		clearTimeout(),
		showNotification(),
		$notification === '#tutorial' ? doTutorial() : '';

	function showNotification() {
		if ($notification) {
			$notification.includes('tutorial')
				? (timeOut = 0)
				: $notification.length > 120
				? (timeOut = 8000)
				: $notification.length > 80
				? (timeOut = 6500)
				: $notification.length > 60
				? (timeOut = 5000)
				: (timeOut = 4000);
			if (timeOut > 0) {
				setTimeout(() => {
					$notification = '';
				}, timeOut);
			}
		}
	}

	function getScrollBarWidth() {
		let el = document.createElement('div');
		el.style.cssText = 'overflow:scroll; visibility:hidden; position:absolute;';
		document.body.appendChild(el);
		let width = el.offsetWidth - el.clientWidth;
		el.remove();
		return width;
	}

	onMount(() => {
		var r = document.querySelector(':root');
		r.style.setProperty('--scrollbarwidth', getScrollBarWidth() + 'px');
		refreshSession();
	});

	$: $pagetitle, ($topmenuopen = false);

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
			!tutorial &&
			document.activeElement.id != 'spellbooksearch'
		) {
			if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)) {
				$modalCall = 'lookup';
				// $quickQuery = e.key;
			}
		} else if (e.key == 'Escape') {
			$notification = '';
			if (tutorial.includes('tut') && tutPage > 0) {
				closeTab($activeTab);
				tutorial = '';
				tutPage = 0;
			}
		} else if (tutorial.includes('tut')) {
			console.log(e.key);
			if (e.key == 'ArrowLeft') {
				tutPage--;
				doTutorial();
			} else if (e.key == 'ArrowRight') {
				tutPage++;
				doTutorial();
			}
		}
	}
	// let previousSpellbooks;
	// let previousActiveTab;
	// let previousActiveSpells;
	let tutPage = 0;
	$: tutPage, ($modalCall = '');
	// doTutorial();
	console.log($activeTab);
	function doTutorial() {
		//implement set dummy spelllist
		switch (tutPage) {
			case 0:
				tutorial = 'tut';
				$notification =
					'Welcome to Spellbook Pro! This tutorial will take you through the basics of the app.#tutorial';
				break;
			case 1:
				const d = new Date();
				let time = d.getTime();
				let dummyTab = {};
				dummyTab.id = 'tutorial' + time;
				dummyTab.list = dummyList;
				dummyTab.name = 'Epic spellbook';
				dummyTab.color = 'var(--lightblue)';
				$activeTab = dummyTab;
				$openSpellbooks.push(dummyTab);
				if (!$activeTab || $activeTab == -1) {
					$activeTab = 0;
				} else {
					$activeTab = $openSpellbooks.length - 1;
				}
				$activeSpells = dummyList;
				tutorial = 'tut tut-spellsheet';
				// window.scrollTo(0,400)
				$notification =
					'<span>Spellsheet</span><br>This is the spellsheet. It displays all the spells in your open spellbook 📖#tutorial';
				break;
			case 2:
				tutorial = 'tut tut-spell';
				$notification =
					'<span>Spells</span><br>This is a spell card. You can click it to learn more about it! 🔍#tutorial';
				break;
			case 3:
				tutorial = 'tut tut-spell_controls';
				$filtersOpen = false;
				$notification =
					'<span>Spells</span><br>Use the controls on spells to remove them or move them up and down. 🕹️#tutorial';
				break;
			case 4:
				tutorial = 'tut tut-filters';
				$filtersOpen = true;
				$notification =
					'<span>Filters</span><br>This is the filters-bar. Here you can –wait for it– ...filter your spellbook! Quickly need a spell with a saving throw that BBEG is really bad at? We got you covered 😎#tutorial';
				break;
			case 5:
				$filtersOpen = false;
				$bookmarksOpen = false;
				tutorial = 'tut tut-tabs';
				$notification =
					'<span>Open spellbooks</span><br>This is the tab-bar. Like the tabs of your webbrowser you can use them to quickly switch between open spellbooks, which means you can have multiple spellbooks open at a time! I see you, Dungeon Masters 👀#tutorial';
				break;
			case 6:
				$bookmarksOpen = true;
				tutorial = 'tut tut-bookmarks';
				$notification =
					'<span>Bookmarks</span><br>These are bookmarks, use them to travel quickly between different levels of spells 🚂#tutorial';
				break;
			case 7:
				$bookmarksOpen = false;
				$topmenuopen = false;
				tutorial = 'tut tut-toolbar';
				$notification =
					"<span>Toolbar</span><br>This is the toolbar, here you'll find buttons to add spells, save, load and share spellbooks or create new ones 🪄#tutorial";
				//voor kleine schermen veranderen
				break;
			case 8:
				$notification =
					"<span>Menu</span><br>This is the menu where you'll find some more obscure buttons, but hey, the more you know! 🌈#tutorial";

				tutorial = 'tut tut-menu';
				$topmenuopen = true;

				break;
			case 9:
				$topmenuopen = false;

				tutorial = 'tut tut-quicksearch';
				$notification =
					"<span>Quick spell search</span><br>This is the quick spell lookup. You can either click it or just start typing whenever you're on this page to quickly find that one spell in the heat of battle, wether it is in your spellbook or not! 🔥#tutorial";

				break;
			case 10:
				if (innerWidth < 1025) {
					$topmenuopen = true;
				}

				if ($currentUser) {
					tutorial = 'tut tut-account';
					$notification =
						'<span>Account</span><br>On your account-page you can manage your saved spellbooks or change account information like your nickname or password. ✍️#tutorial';
					break;
				} else {
					tutorial = 'tut tut-login';
					$notification =
						'<span>Account</span><br>Login or register an account to save your spellbooks for later, access them from everywhere and share them with the world! 🌍#tutorial';
					break;
				}

			case 11:
				if (innerWidth < 1025) {
					$topmenuopen = true;
				}
				tutorial = 'tut tut-premade';
				$notification =
					'<span>Community spellbooks</span><br>On the Premade-page you can browse and open spellsbooks made by others in the community. You can publish your own spellbooks when saving or editing them. Sharing is caring! 💑#tutorial';
				break;
			case 12:
				$topmenuopen = false;
				tutorial = 'tut';
				$notification =
					"<span>It's a wrap!</span><br>That about sums it up! You can always start this tutorial again by using the questionmark in the top-right corner. Have fun, and don't let the byte-bugs bite! 🐛#tutorial";
				break;
			case 13:
				closeTab($activeTab);
				tutorial = '';
				$notification = '';
				tutPage = 0;
				break;
		}
	}
</script>

<Body
	bind:this={body}
	class="{$sidemenuopen
		? 'noscroll'
		: $modalCall
		? 'noscroll'
		: $tabsPanelOpen
		? 'noscroll'
		: $topmenuopen
		? 'noscroll'
		: ''} {$userPrefs.theme} {tutorial ? tutorial : ''}"
/>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div
	class="main_wrapper {$page.url.pathname.split('/').pop()}"
	class:sidemenuopen={$sidemenuopen}
	class:topmenuopen={$topmenuopen}
>
	<TopMenu />

	<AddSpells />
	<main>
		{#key $pagetitle}
			{#if $pagetitle != 'Login' && $pagetitle != 'Password reset' && innerWidth > 820}
				<Header />
			{/if}
		{/key}
		{#if innerWidth <= 820}
			<MobileHeader />
		{/if}
		<PageTransition pathname={data.pathname}><slot /></PageTransition>
	</main>

	<div on:click={closeMenu} class="closemenu" />

	{#if innerWidth <= 820 && $topmenuopen !== true}
		<MobileTabbar />
	{/if}

	<div
		class="background {$pagetitle.toLowerCase().includes('premade')
			? 'dark'
			: $pagetitle.toLowerCase().includes('account')
			? 'alt'
			: ''}"
	/>
	<Section name="footer">
		<Footer />
	</Section>
</div>

{#if $notification}
	{#key $notification}
		<button
			in:fly={{ y: 10, duration: 300, delay: 100 }}
			out:fly={{ y: 10, duration: 200 }}
			on:click={() => ($notification.includes('tutorial') ? '' : ($notification = ''))}
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
					: $notification.split('#')[1].includes('tutorial')
					? 'tutorial'
					: ''} notification_inner"
			>
				<div class="icon_container" in:scale={{ duration: 200 }}>
					<i class="ri-error-warning-fill" /><i class="ri-alert-fill" />
					<i class="ri-checkbox-circle-line" /><i class="ri-information-line" />
					<img src={Inky} alt="" />
					<div class="loading"><i class="ri-loader-5-line" /></div>
				</div>
				<div class="text_container">
					<p>
						{@html $notification.split('#')[0]}
					</p>
				</div>
				<div class="button_container">
					<button
						on:click|stopPropagation={() => {
							tutPage++;
							doTutorial();
						}}
						class="button outline accent">continue <i class="ri-arrow-right-s-line" /></button
					>
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
<svelte:window bind:innerWidth on:keydown={(e) => handleKeyDown(e)} />

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
			@media only screen and (max-width: 1024px) {
				display: none !important;
			}
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
				transform: unset;
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
		padding: 0 var(--padding);
		cursor: auto;
		.notification_inner {
			max-width: 900px;
			padding: 0.8rem 3rem;
			background-color: var(--white);
			border-radius: 50vh;
			display: grid;
			grid-template-columns: 34px 1fr;
			filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.6));
			div {
				display: flex;
				align-items: center;
			}
			@media only screen and (max-width: 1023px) {
				padding: 0.4rem 1rem;
				margin: 0 0.5rem;
			}
			p {
				text-align: left;
				color: var(--black);
				margin-bottom: 0;
				:global(span) {
					font-size: 1.6rem;
					font-weight: 500;
				}
				:global(a) {
					color: var(--bg);
					transition: 0.1s;
					&:hover {
						color: var(--accent);
					}
				}
			}
			.button_container {
				display: none;
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
			img {
				display: none;
			}
			&.tutorial {
				padding-left: 1rem;
				padding-right: 1.5rem;
				grid-template-columns: max-content 1fr;
				grid-template-rows: 1fr max-content;
				gap: 0 1rem;
				border-radius: 25px;
				@media only screen and (max-width: 1024px) {
					display: block;
					padding-right: 1rem;
				}
				p {
					padding-top: 0.3rem;
					padding-bottom: 0.3rem;
				}
				.text_container {
					@media only screen and (max-width: 1024px) {
						display: inline;
					}
				}
				.icon_container {
					display: block;
					grid-row: span 2;
					@media only screen and (max-width: 1024px) {
						float: left;
						margin: 0.7rem 0.4rem 0.2rem 0;
					}
				}
				img {
					display: block;
					width: 120px;
					height: auto;
					@media only screen and (max-width: 1024px) {
						width: 60px;
						// object-position: 0 1rem;
						// object-fit: contain;
						// float: left;
					}
				}
				.button_container {
					display: inline-block;
					text-align: left;
					margin-bottom: 0;
					grid-column-start: 2;
					button {
						display: inline-block;
						padding-right: 0.3rem;
						margin-bottom: 0;
						margin-top: 0.5rem;
						i {
							display: inline;
							vertical-align: -7.5px;
						}
					}
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
