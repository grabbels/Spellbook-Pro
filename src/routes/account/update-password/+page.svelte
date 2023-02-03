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
	} from '../../../components/stores';
	import { supabaseClient } from '$lib/supabaseClient';
	$pagetitle = 'Password reset';
	let loading = false;
	let registerPassword;
	let registerPasswordConfirm;
	let loadingRegister;
	async function handlePassword() {
		$notification = '';
		if (registerPassword.length > 5) {
			if (registerPassword === registerPasswordConfirm) {
				loading = true;
				const { data, error } = await supabaseClient.auth.updateUser({
					password: registerPassword
				});
				if (data.user == null) {
					loading = false;
					$notification = 'This password reset link is invalid or has expired.#error';
				} else if (data) {
					loading = false;
					$notification = 'Password changes succesfully#positive';
					console.log(data);
					goto('/account/login');
				} else if (error) {
					loading = false;
					console.log(error);
					$notification = 'Oops, an error occurred. Error code: ' + error.code + '#error';
				}
			} else {
				loading = false;
				$notification = 'The passwords do not match#error';
			}
		} else {
			$notification = 'Password should be at least 6 characters long#error';
		}
	}
</script>

<Section name="login">
	<div class="grid">
		<div class="register section">
			<div class="panel_inner">
				<div class="register_form">
					<h2 style="margin-bottom: 1rem">Update password</h2>
					<form
						on:submit={(e) => {
							e.preventDefault, handlePassword();
						}}
					>
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
						<button class="{loading ? 'loading' : ''} button fill accent" type="submit"
							>Change password
							<div><i class="ri-loader-5-line" /></div></button
						>
					</form>
				</div>
			</div>
		</div>
	</div>
</Section>

<style lang="scss">
	.grid {
		margin-top: 4rem;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60vh;
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
	}
</style>
