<script>
	import { goto } from '$app/navigation';
	let password;
	let loading = false;
	import { page } from '$app/stores';
	import { currentUser, pb } from '$lib/pocketbase';
	import { modalCall, notification } from '../stores/stores';
	async function handleSubmit() {
		loading = true;
		const token = $page.url.searchParams.get('confirm-email-change');
		try {
			await pb.collection('users').confirmEmailChange(token, password);
			loading = false;
			$notification = 'You email address has been changed succesfully.#positive';
			$modalCall = '';
			$currentUser = '';
			goto('/account/login')
		} catch (err) {
			console.log(err.data);
			loading = false;
			$notification = err.data.message + '#error'
			$modalCall = '';
			goto('/')
		}
	}
</script>

<h2>Confirm email change</h2>
<form on:submit|preventDefault={handleSubmit}>
	<label style="margin-bottom: .5rem; display: block" for="password"
		>Enter your password to confirm your email address change</label
	>
	<input bind:value={password} type="password" name="password" />
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
