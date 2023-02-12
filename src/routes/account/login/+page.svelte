<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Section from '../../../components/section.svelte';
	import Button from '../../../components/button.svelte';
	import {
		pagetitle,
		notification,
		session,
		modalCall,
		userEmail,
		userId,
		userNickname
	} from '../../../components/stores/stores';
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/supabaseClient';
	let showRegister;
	let showLogin;
	let registerForm;
	let newUrl;
	let registerNickname;
	let registerEmail;
	let registerPassword;
	let registerPasswordConfirm;
	let loginEmail;
	let loginPassword;
	let loadingLogin;
	let loadingRegister;
	let registerPanel;
	let loginPanel;
	let windowHeight;
	$pagetitle = 'Login';
	onMount(() => {
		if ($page.url.searchParams.get('register')) {
			showRegister = 'show';
			showLogin = '';
			// registerForm.removeAttribute('novalidate')
		} else {
			showLogin = 'show';
			showRegister = '';
		}
	});
	function handleShowRegister(e) {
		e.preventDefault;
		const newUrl = new URL($page.url);
		newUrl?.searchParams?.set('register', 'true');
		goto(newUrl);
		showRegister = 'show';
		showLogin = '';
		// registerPanel.scrollIntoView({ behavior: 'smooth' }, true);
		// registerForm.removeAttribute('novalidate')
	}
	function handleShowLogin(e) {
		e.preventDefault;
		const newUrl = new URL($page.url);
		newUrl?.searchParams?.delete('register');
		goto(newUrl);
		showRegister = '';
		showLogin = 'show';
		// loginPanel.scrollIntoView({ behavior: 'smooth' }, true);
		// registerForm.setAttribute('novalidate', 'novalidate')
	}
	async function handleRegister() {
		loadingRegister = true;
		$notification = '';
		if (registerPassword.length > 5) {
			console.log(registerNickname);
			if (registerPassword === registerPasswordConfirm) {
				const { data, error } = await supabaseClient
					.from('nicknames')
					.insert([{ user_nickname: registerNickname }])
					.select();
				if (error) {
					if (error.code == 23505) {
						console.log(error);
						$notification = 'The nickname is already in use, try another one!#error';
						loadingRegister = false;
					} else {
						console.log(error);
						$notification = 'Oops, an error occurred. Error code: ' + error.code + '#error';
						loadingRegister = false;
					}
				} else if (data) {
					const { data, error } = await supabaseClient.auth.signUp({
						email: registerEmail,
						password: registerPassword,
						options: {
							data: {
								nickname: registerNickname
							}
						}
					});
					if (error) {
						console.log(error);
						$notification = 'Oops, an error occurred. Error code: ' + error.code + '#error';
						loadingRegister = false;
					} else if (data) {
						console.log(data);
						if (data.user === null) {
							$notification =
								"An account using your email address already exists. <a href='/account/update-reset'>Forgot password?</a>#error";
							loadingRegister = false;
						} else {
							$notification =
								"Registered succesfully! Please confirm your email address using the email you'll receive shortly. No email? Check your spam-folder or try again.#info";
							registerForm.reset();
							loadingRegister = false;
							handleShowLogin();
						}
					} else {
						console.log('nothing');
					}
				}
			} else {
				$notification = 'The passwords do not match#error';
				loadingRegister = false;
			}
		} else {
			$notification = 'Password should be at least 6 characters long#error';
			loadingRegister = false;
		}
	}

	async function handleLogin() {
		loadingLogin = true;
		const { data, error } = await supabaseClient.auth.signInWithPassword({
			email: loginEmail,
			password: loginPassword
		});
		if (data) {
			if (data.session === null) {
				$notification =
					'This email and/or password combination is not recognized. Try again?#alert';
				loadingLogin = false;
			} else if (data) {
				$session = data.session;
				$userId = $session.user.id;
				$userNickname = $session.user.user_metadata.nickname;
				$userEmail = $session.user.email;
				checkUserNickname();
				goto('/account');
			} else if (error) {
				console.log(error);
				loadingLogin = false;
				$notification = 'Oops, an error occurred. Error code: ' + error.code + '#error';
			}
		}
	}
	async function checkUserNickname() {
		const { data, error } = await supabaseClient
			.from('nicknames')
			.select()
			.eq('user_nickname', $userNickname);
		if (data) {
			console.log(data);
			if (data.user_id != $userId) {
				const {} = await supabaseClient
					.from('nicknames')
					.update({ user_id: $userId })
					.eq('user_nickname', $userNickname);
			}
		}
	}
</script>

<Section name="login">
	<div class="grid">
		<div bind:this={registerPanel} class="register section {showRegister}">
			<div class="panel_inner">
				<div class="register_form">
					<h2>Register</h2>
					<form
						bind:this={registerForm}
						on:submit={(e) => {
							e.preventDefault, handleRegister();
						}}
					>
						<input bind:value={registerNickname} type="text" placeholder="Nickname" required />
						<input bind:value={registerEmail} type="email" placeholder="E-Mail" required />
						<input
							bind:value={registerPassword}
							type="password"
							autocomplete="new-password"
							placeholder="Password"
							required
						/>
						<input
							bind:value={registerPasswordConfirm}
							type="password"
							placeholder="Password (again)"
							required
						/>
						<input type="checkbox" name="termsconditions" id="termsconditions" required />
						<label for="termsconditions"
							>I agree to the <button class="inline" on:click={() => ($modalCall = 'terms')}
								>terms and conditions</button
							>.</label
						><br />
						<button class="{loadingRegister ? 'loading' : ''} button fill accent" type="submit"
							>Register
							<div><i class="ri-loader-5-line" /></div></button
						>
						<p>
							Already have an account? <button on:click={(e) => handleShowLogin(e)}
								>Click here</button
							> to log in.
						</p>
					</form>
				</div>
			</div>
		</div>
		<div bind:this={loginPanel} id="login" class="login section {showLogin}">
			<div class="panel_inner">
				<Button text="back" href="/" type="outline" icon="ri-arrow-left-s-line" />
				<div class="login_form">
					<h2>Login</h2>
					<form
						action="login"
						on:submit={(e) => {
							e.preventDefault, handleLogin();
						}}
					>
						<input bind:value={loginEmail} type="email" placeholder="E-Mail" required />
						<input bind:value={loginPassword} type="password" placeholder="Password" required />
						<button class="{loadingLogin ? 'loading' : ''} button fill accent" type="submit"
							>Login
							<div><i class="ri-loader-5-line" /></div></button
						>
					</form>
					<p style="margin-bottom: 2rem">
						Forgot your password? <button
							on:click={() => ($modalCall = 'resetpassword')}
							class="inline">Reset it here</button
						>!
					</p>

					<p>No account yet? Create one to:</p>
					<ul>
						<li>Manage your spellsheets from anywhere</li>
						<li>Save and sync your spellsheets across devices</li>
						<li>Save multiple spellsheets</li>
						<li>Manage your spellsheets in your account</li>
					</ul>
					<Button
						on:click={(e) => handleShowRegister(e)}
						href=""
						type="fill"
						icon=""
						text="Register"
					/>
				</div>
			</div>
		</div>
	</div>
</Section>

<svelte:window bind:innerHeight={windowHeight} />

<style lang="scss">
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		min-height: 100vh;
		padding-top: 2rem;
		@media only screen and (max-width: 1024px) {
			grid-template-columns: 1fr;
		}
		.section {
			overflow: hidden;
			opacity: 0.3;
			pointer-events: none;
			transition: opacity 0.2s;
			display: flex;
			align-items: center;
			justify-content: center;
			&.show {
				opacity: 1;
				pointer-events: all;
			}
			.panel_inner {
				h2 {
					margin-bottom: 0.5rem;
				}
			}
			&.register {
				border-right: 1px solid var(--moretranslucent);
				@media only screen and (max-width: 1024px) {
					border: none;
					display: flex;
					align-items: center;
				}
				// .panel_inner {
				// 	.register_form {
				// 		button.inline {
				// 			all: unset;
				// 			display: inline-block;
				// 			cursor: pointer;
				// 			text-decoration: underline;
				// 		}
				// 	}
				// }
			}
			&.login {
				border-left: 1px solid var(--moretranslucent);
				@media only screen and (max-width: 1024px) {
					border: none;
				}
			}
			@media only screen and (max-width: 1024px) {
				height: 0;
				display: block;
				&.show {
					height: auto;
				}
			}
		}
	}
	form {
		max-width: 400px;
		input#termsconditions {
			display: inline-block;
			margin-right: 0.3rem;
			width: auto;
		}
		label {
			color: var(--white);
			display: inline-block;
		}
		button[type='submit'] {
			div {
				position: absolute;
				display: none;
				animation-name: rotate;
				animation-iteration-count: infinite;
				animation-timing-function: linear;
				animation-duration: 0.6s;
				top: -3px;
				width: 100%;
				text-align: center;
				left: 0;
				i {
					font-size: 2rem;
					color: var(--bg);
				}
				@keyframes rotate {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(360deg);
					}
				}
			}
			&.loading {
				color: var(--accent);
				div {
					display: block;
				}
			}
		}
	}
	p {
		margin-top: 0.5rem;
		font-size: 0.95rem;
		button {
			all: unset;
			cursor: pointer;
			text-decoration: underline;
		}
	}
	ul {
		// font-family: 'Roboto';
		font-size: 0.95rem;
		margin-top: 0.5rem;
		list-style: disc;
		color: var(--white);
		font-weight: 400;
		padding-left: 1rem;
		margin-bottom: 1rem;
		li {
			line-height: 1.3;
		}
	}
</style>
