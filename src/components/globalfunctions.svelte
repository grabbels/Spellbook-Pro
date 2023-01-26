<script context="module">
	import { supabaseClient } from '$lib/db';
	import {
		topmenuopen,
		sidemenuopen,
		spellListEmpty,
		session,
		notification,
		savedSpellSheets,
		actionFilter,
		rangeFilter,
		searchFilter,
		saveFilter
	} from './stores';
	import { activeSpells, loggedIn } from './stores-persist';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import {spells} from './spells';
	export let classOptions =
		'<option value="" disabled selected hidden>Select class</option><option value="Artificer">Artificer</option><option value="Barbarian">Barbarian</option><option value="Bard">Bard</option><option value="Cleric">Cleric</option><option value="Druid">Druid</option><option value="Fighter">Fighter</option><option value="Monk">Monk</option><option value="Paladin">Paladin</option><option value="Ranger">Ranger</option><option value="Rogue">Rogue</option><option value="Sorcerer">Sorcerer</option><option value="Warlock">Warlock</option><option value="Wizard">Wizard</option>';

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
		console.log('test');
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
		const { error } = await supabaseClient.auth.signOut();
		if (error) {
			console.log(error);
		} else {
			session.set(false);
			goto('/');
			notification.set("You've been logged out.#info");
		}
	}

	export async function retrieveSession() {
		const {
			data: { session }
		} = await supabaseClient.auth.getSession();
		return session;
	}

	// async function loadPremades() {
	// 	const { data, error } = await supabaseClient.from('spellbooks').select();
	// 	if (data) {
	// 		console.log(data);
	// 	}
	// }
	// export async function loadSpellsheetsByUserId(id) {
	// 	const { data, error } = await supabaseClient
	// 		.from('spellbooks')
	// 		.select()
	// 		.eq('list_creatorid', id);
	// 	if (data) {
	// 		console.log(data);
	// 	}
	// }

	export async function loadSpellsheetsByUserId(id) {
		const { data, error } = await supabaseClient.from('spellbooks').select().eq('user_id', id);
		if (data) {
			savedSpellSheets.set(data);
		}
	}

	export function removeFilters() {
		actionFilter.set('');
		rangeFilter.set('');
		searchFilter.set('');
		saveFilter.set('');
	}

	export function refreshList() {
		let staleList = get(activeSpells)
		let freshList = []
		for (let i = 0; i < staleList.length; i++) {
			freshList.push(spells.filter((o) => o.name == staleList[i].name).pop());
			
		}
		activeSpells.set(freshList)
	}
</script>
