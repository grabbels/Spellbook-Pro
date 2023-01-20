<script>
	import { pagetitle } from '../../components/stores';
	import { userNickname } from '../../components/stores-persist';
	$pagetitle = "My account";
	import Section from '../../components/section.svelte';
</script>

<Section name="my-account">
	<div class="panel">
		<h2>My Account</h2>
		<h1>Hi, {$userNickname}!</h1>
	</div>
</Section>
