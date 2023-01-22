<script context="module">
	import { supabaseClient } from '$lib/db';
	import { topmenuopen, sidemenuopen, spellListEmpty } from './stores';
	import { activeSpells, loggedIn } from './stores-persist';
	import { get } from 'svelte/store';

	export const moveItem = (array, to, from) => {
		const item = array[from];
		array.splice(from, 1);
		array.splice(to, 0, item);
		return array;
	};

	activeSpells.subscribe((data) => {
		if (data.length === 0) {
			spellListEmpty.set(true);
		} else {
			spellListEmpty.set(false);
		}
	});

	export const topMenuOpenClose = () => {
		if (get(topmenuopen) === false) {
			topmenuopen.set(true);
		} else {
			topmenuopen.set(false);
		}
	};

	export const sideMenuOpenClose = () => {
		if (get(sidemenuopen) === false) {
			sidemenuopen.set(true);
		} else {
			sidemenuopen.set(false);
		}
	};

	export async function getUserId() {
		const {
			data: { user }
		} = await supabaseClient.auth.getUser();
		if (user) {
			console.log(user.id);
			return user.id;
		}
	}

	export async function handleLogOut() {
		console.log('test');
		const { error } = await supabaseClient.auth.signOut();
		if (error) {
			console.log(error);
		} else {
			loggedIn.set(false);
			console.log(loggedIn);
		}
	}

	// async function loadPremades() {
	// 	const { data, error } = await supabaseClient.from('spellbooks').select();
	// 	if (data) {
	// 		console.log(data);
	// 	}
	// }
	export async function loadSpellsheetsByUserId(id) {
		const { data, error } = await supabaseClient
			.from('spellbooks')
			.select()
			.eq('list_creatorid', id);
		if (data) {
			console.log(data);
		}
	}
</script>
