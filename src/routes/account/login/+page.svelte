<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Section from '../../../components/section.svelte';
	import Button from '../../../components/button.svelte';
	import { pagetitle, notification } from '../../../components/stores';
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/db';
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
	function handleShowRegister() {
		const newUrl = new URL($page.url);
		newUrl?.searchParams?.set('register', 'true');
		goto(newUrl);
		showRegister = 'show';
		showLogin = '';
		// registerForm.removeAttribute('novalidate')
	}
	function handleShowLogin() {
		const newUrl = new URL($page.url);
		newUrl?.searchParams?.delete('register');
		goto(newUrl);
		showRegister = '';
		showLogin = 'show';
		// registerForm.setAttribute('novalidate', 'novalidate')
	}
	async function handleRegister() {
		console.log('test');
		if (registerPassword === registerPasswordConfirm) {
			const { data, error } = await supabaseClient.auth
				.signUp({
					email: registerEmail,
					password: registerPassword,
					options: {
						data: {
							nickname: registerNickname
						}
					}
				})
				.then(() => {
					$notification =
						"Registered succesfully! Please confirm your email address using the email you'll receive shortly.#info";
					registerForm.reset();
					handleShowLogin();
				})
				.catch(() => console.log(error));
		} else {
			$notification = 'The passwords do not match#error';
		}
	}

	async function handleLogin() {
		console.log('test')
		const { data, error } = await supabaseClient.auth.signInWithPassword({
			email: loginEmail,
			password: loginPassword
		});
		if (data) {
			console.log(data)
		} else if (error) {
			console.log(error)
		}
	}
</script>

<Section name="login">
	<div class="grid">
		<div class="register section {showRegister}">
			<div class="panel_inner">
				<div class="register_form">
					<h2>Register</h2>
					<form
						bind:this={registerForm}
						on:submit={(e) => {
							e.preventDefault, handleRegister;
						}}
					>
						<input bind:value={registerNickname} type="text" placeholder="Nickname" required />
						<input bind:value={registerEmail} type="email" placeholder="E-Mail" required />
						<input bind:value={registerPassword} type="password" placeholder="Password" required />
						<input
							bind:value={registerPasswordConfirm}
							type="password"
							placeholder="Password (again)"
							required
						/>
						<input type="checkbox" name="termsconditions" id="termsconditions" required />
						<label for="termsconditions"
							>I agree to the <a href="/termsconditions" target="_blank">terms and conditions</a
							>.</label
						><br />
						<input class="button fill accent" type="submit" value="Register" />
						<p>
							Already have an account? <button on:click={handleShowLogin}>Click here</button> to log
							in.
						</p>
					</form>
				</div>
			</div>
		</div>
		<div class="login section {showLogin}">
			<div class="panel_inner">
				<Button text="back" href="/" type="outline" icon="ri-arrow-left-s-line" />
				<div class="login_form">
					<h2>Login</h2>
					<form action="login"
						on:submit={(e) => {
							e.preventDefault, handleLogin;
						}}>
						<input bind:value={loginEmail} type="email" placeholder="E-Mail" required />
						<input bind:value={loginPassword} type="password" placeholder="Password" required />
						<input class="button fill accent" type="submit" value="Login"/>
					</form>
					<p>No account yet? Create one to:</p>
					<ul>
						<li>Manage your spellsheets from anywhere</li>
						<li>Save and sync your spellsheets across devices</li>
						<li>Save multiple spellsheets</li>
						<li>Manage your spellsheets in your account</li>
					</ul>
					<Button on:click={handleShowRegister} href="" type="fill" icon="" text="Register" />
				</div>
			</div>
		</div>
	</div>
</Section>

<style lang="scss">
	.grid {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr minmax(auto, 600px);
		grid-template-rows: 1fr;
		min-height: 100vh;
		align-items: center;
		.section {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: flex-start;
			height: 600px;
			margin-top: 2rem;
			.panel_inner {
				padding: 2rem;
				max-width: 450px;
				// background-color: purple;
				width: 100%;
				h2 {
					margin-bottom: 0.5rem;
				}
			}
			&.register {
				justify-content: flex-end;
				padding-right: 4rem;

				.panel_inner {
					.register_form {
						opacity: 0;
						transform: translateX(40px);
						transition: 0.3s;
					}
				}
				&.show {
					.panel_inner {
						.register_form {
							opacity: 1;
							transform: translateX(0);
						}
					}
				}
			}
			&.login {
				border-left: 1px solid var(--moretranslucent);

				.panel_inner {
					max-width: 450px;
					.login_form {
						margin-top: 2rem;
						opacity: 0.4;
						pointer-events: none;
						transition: 0.2s;
					}
				}
				&.show {
					.login_form {
						opacity: 1;
						pointer-events: all;
					}
				}
			}
		}
	}
	form {
		input.button {
			max-width: 100px;
			height: 46.4px;
		}
		input#termsconditions {
			display: inline-block;
			margin-right: 0.3rem;
			width: auto;
		}
		label {
			color: var(--white);
			display: inline-block;
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
	}
</style>
