<script>
	import { goto } from '$app/navigation';
	let newPassword, newPasswordConfirm;
	let loading = false;
	import { page } from '$app/stores';
	import { currentUser, pb } from '$lib/pocketbase';
	import { modalCall, notification } from '../stores/stores';
	async function handleSubmit() {
		loading = true;
		const token = $page.url.searchParams.get('confirm-password-reset');
		if (newPassword === newPasswordConfirm) {
			try {
				await pb.collection('users').confirmPasswordReset(token, newPassword, newPasswordConfirm);
				loading = false;
				$notification = 'Your password has been changed succesfully.#positive';
				$modalCall = '';
				$currentUser = '';
				goto('/account/login');
			} catch (err) {
				loading = false;
				console.log(err);
				$notification = err.data.message + '#error';
				$modalCall = '';
				goto('/');
			}
		} else {
			$notification = 'The passwords do not match.#error';
		}
	}
</script>

<h2>Password reset</h2>
<form on:submit|preventDefault={handleSubmit}>
	<label style="margin-bottom: .5rem; display: block" for="password">New password</label>
	<input bind:value={newPassword} type="password" name="confirmpassword" />
	<label style="margin-bottom: .5rem; display: block" for="password">Confirm password</label>
	<input bind:value={newPasswordConfirm} type="password" name="confirmpassword" />
	<button
		on:click={() => (loading = true)}
		class="{loading ? 'loading' : ''} button fill accent"
		type="submit"
		>Confirm
		<div><i class="ri-loader-5-line" /></div></button
	>
</form>

<style>
	form {
		max-width: 400px;
	}
</style>
