<script>
	import { editPassword } from '../functions/globalfunctions.svelte';

	let email;
	let loading = false;
</script>

<h2>Password reset</h2>
<form on:submit|preventDefault={editPassword(email)}>
	<label style="margin-bottom: .5rem; display: block" for="email">Email address</label>
	<input bind:value={email} type="email" name="email" />
	<button
		on:click={() => (loading = true)}
		class="{loading ? 'loading' : ''} button fill accent"
		type="submit"
		>Change password
		<div><i class="ri-loader-5-line" /></div></button
	>
</form>

<style>
	form {
		max-width: 400px;
	}
</style>
