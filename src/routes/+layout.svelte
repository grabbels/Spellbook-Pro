<script>
	import { Body } from 'svelte-body';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/db';
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
		quickQuery
	} from '../components/stores';
	import { retrieveSession } from '../components/globalfunctions.svelte';
	import { loggedIn, userNickname } from '../components/stores-persist';
	import bg from '../img/menu-bg.png';
	import bgalt from '../img/menu-bg-alt.png';
	import '@fontsource/kanit';
	import Modal from '../components/modal.svelte';
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
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	async function checkIfLoggedIn() {
		// if ($loggedIn === null) {
		const {
			data: { user }
		} = await supabaseClient.auth.getUser();
		if (user) {
			$loggedIn = true;
			$userNickname = user.user_metadata.nickname;
			console.log(user.user_metadata.nickname);
			console.log($loggedIn);
		} else {
			$userNickname = null;
			$loggedIn = false;
			console.log($loggedIn);
		}

		// }
	}
	if (!$session) {
		let promiseSession = retrieveSession();
		promiseSession.then((value) => {
			$session = value;
			// console.log($session);
		});
	} else {
		console.log($session);
	}
</script>

<Body class={$topmenuopen ? 'noscroll' : $sidemenuopen ? 'noscroll' : $modalCall ? 'noscroll' : ''} />

<div class="topmenu" style="background-image: url('{bgalt}')" class:open={$topmenuopen}>
	<TopMenu />
</div>

<div class="sidemenu" style="background-image: url('{bg}')" class:open={$sidemenuopen}>
	<AddSpells />
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div
	class="main_wrapper {$page.url.pathname.split('/').pop()}"
	class:sidemenuopen={$sidemenuopen}
	class:topmenuopen={$topmenuopen}
>
	<main>
		{#key $pagetitle}
			{#if $pagetitle != 'Login'}
				<div in:fade={{ duration: 300 }}>
					<Header />
				</div>
			{/if}
		{/key}
		{#key $pagetitle}
			<div in:fly={{ y: 10, duration: 300 }}>
				<slot />
			</div>
		{/key}
	</main>

	<div on:click={closeMenu} class="closemenu" />
</div>

{#if $notification}
	<div transition:fly={{ y: 10, duration: 300 }} class:show={$notification} class="notification">
		<div
			class="{$notification.split('#')[1].includes('error')
				? 'error'
				: $notification.split('#')[1].includes('alert')
				? 'alert'
				: $notification.split('#')[1].includes('info')
				? 'info'
				: ''} notification_inner"
		>
			<p>
				<i class="ri-error-warning-fill" /><i class="ri-alert-fill" /><i
					class="ri-information-line"
				/>
				{@html $notification.split('#')[0]}
			</p>
		</div>
	</div>
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
		&.browse {
			&::after {
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
		.notification_inner {
			padding: 0.8rem 3rem;
			background-color: var(--white);
			border-radius: 50vh;
			filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.6));

			p {
				color: var(--black);
				:global(a) {
					color: var(--bg);
					transition: 0.1s;
					&:hover {
						color: var(--accent);
					}
				}
				i {
					display: none;
					font-size: 1.5rem;
					vertical-align: -6px;
					// margin-right: .5rem;
				}
			}
			&.error {
				p {
					i.ri-error-warning-fill {
						display: inline;
						color: var(--secondary);
					}
				}
			}
			&.alert {
				p {
					i.ri-alert-fill {
						display: inline;
						color: var(--yellow);
					}
				}
			}
			&.info {
				p {
					i.ri-information-line {
						display: inline;
						color: var(--lightblue);
					}
				}
			}
		}
	}

	.topmenu {
		background-color: var(--bg);
		position: relative;
		width: 100vw;
		background-position: center center;
		background-size: cover;
		transform: translateY(-100%);
		transition: transform 0.3s;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 3;
		height: 115px;
		&:before {
			position: absolute;
			content: '';
			height: 60px;
			width: 100%;
			left: 0;
			bottom: 0;
			// z-index: -1;
			background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
		}
		&.open {
			transform: translateY(0%);
		}
	}

	.sidemenu {
		position: fixed;
		left: 0;
		top: 0;
		height: 100vh;
		width: 400px;
		background-position: top center;
		background-size: cover;
		transform: translateX(-100%);
		transition: transform 0.3s;
		z-index: 3;
		&.open {
			transform: translateX(0%);
		}
		&:before {
			position: absolute;
			content: '';
			height: 100%;
			width: 60px;
			right: 0;
			top: 0;
			z-index: -1;
			background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
		}
	}
</style>
