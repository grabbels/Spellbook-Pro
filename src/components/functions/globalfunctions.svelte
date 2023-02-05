<script context="module">
	import { supabaseClient } from '$lib/supabaseClient';
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
		saveFilter,
		filters,
		modalCall,
		savePrompt,
		bookToEdit,
		userId,
		userEmail,
		userNickname,
		profileUser,
		userProfile,
		pagetitle,
		lookupBook
	} from '../stores/stores';
	import { activeSpells, loggedIn } from '../stores/stores-persist';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { spells } from '../data/spells';
	export let classOptions =
		'<option value="" disabled selected hidden>Select class</option><option value="Artificer">Artificer</option><option value="Barbarian">Barbarian</option><option value="Bard">Bard</option><option value="Cleric">Cleric</option><option value="Druid">Druid</option><option value="Fighter">Fighter</option><option value="Monk">Monk</option><option value="Paladin">Paladin</option><option value="Ranger">Ranger</option><option value="Rogue">Rogue</option><option value="Sorcerer">Sorcerer</option><option value="Warlock">Warlock</option><option value="Wizard">Wizard</option>';
	export let classes = [
		'Artificer',
		'Barbarian',
		'Bard',
		'Cleric',
		'Druid',
		'Fighter',
		'Monk',
		'Paladin',
		'Ranger',
		'Rogue',
		'Sorcerer',
		'Warlock',
		'Wizard'
	];
	let siteUrl = 'http://localhost:5173';

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
			session.set('');
			userEmail.set('');
			userId.set('');
			userNickname.set('');
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

	export async function loadSpellsheetsByUserId(id) {
		if (!id) {
			const {
				data: { user }
			} = await supabaseClient.auth.getUser();
			if (user) {
				id = user.id;
				handleLoad();
			}
		} else {
			handleLoad();
		}
		async function handleLoad() {
			const { data, error } = await supabaseClient
				.from('spellbooks')
				.select()
				.eq('user_id', id)
				.order('created', { ascending: false });
			if (data) {
				console.log(data);
				if (data.length < 1) {
					savedSpellSheets.set('none');
				} else {
					let placeholderSlots = 7 - data.length;
					let retrievedSaves = data;
					retrievedSaves.push({ id: 'add' });
					for (let i = 0; i < placeholderSlots; i++) {
						retrievedSaves.push({});
					}
					savedSpellSheets.set(retrievedSaves);
				}

				console.log('getting saved books');
			} else if (error) {
				notification.set('Oops, an error occurred. Error code: ' + error.code + '#error');
			}
		}
	}

	export async function refreshSession() {
		() => {
			const {
				data: { subscription }
			} = supabaseClient.auth.onAuthStateChange(() => {
				invalidate('supabase:auth');
			});

			return () => {
				subscription.unsubscribe();
			};
		};
		setUserData();
	}

	export async function setUserData() {
		let promiseSession = retrieveSession();
		promiseSession.then((value) => {
			if (value) {
				session.set(value);
				userId.set(value.user.id);
				userNickname.set(value.user.user_metadata.nickname);
				userEmail.set(value.user.email);
			}
		});
	}

	export function removeFilters() {
		actionFilter.set('');
		rangeFilter.set('');
		searchFilter.set('');
		saveFilter.set('');
	}

	export function refreshList() {
		let staleList = get(activeSpells);
		let freshList = [];
		for (let i = 0; i < staleList.length; i++) {
			freshList.push(spells.filter((o) => o.name == staleList[i].name).pop());
		}
		activeSpells.set(freshList.sort((a, b) => a.level - b.level));
		// notification.set('Spellbook refreshed#positive')
	}

	export function empty() {
		let text = 'Are you sure you want to remove all your saved spells?';
		if (confirm(text) == true) {
			activeSpells.set([]);
			filters.set(false);
			removeFilters();
			topMenuOpenClose();
			notification.set('Spellbook has been cleared#alert');
			// $notification = 'Spellbook has been cleared';
		}
	}

	export async function removeBook(id) {
		let toBeRemovedFrom = get(savedSpellSheets);
		if (confirm('Are you sure you want to delete this spellbook?') == true) {
			const { error } = await supabaseClient
				.from('spellbooks')
				.delete()
				.eq('id', id)
				.then(
					toBeRemovedFrom.splice(
						toBeRemovedFrom.findIndex(function (i) {
							return i.id === id;
						}),
						1
					)
				);
			if (error) {
				notification.set('Oops, an error occurred. Error code: ' + error.code + '#error');
			} else {

				savedSpellSheets.set(toBeRemovedFrom);
				return 'deleted';
			}
		}
	}
	export async function editBook(id) {
		const { data, error } = await supabaseClient.from('spellbooks').select().eq('id', id);
		if (error) {
			console.log(error);
			notification.set('Oops, an error occurred. Error code: ' + error.code + '#error');
		} else if (data) {
			bookToEdit.set(data[0]);
			modalCall.set('edit');
		}
	}

	export async function loadBook(id) {
		if (
			confirm(
				'This will wipe your current spellbook, you can save your current spellbook before loading another one.'
			) == true
		) {
			const { data, error } = await supabaseClient.from('spellbooks').select().eq('id', id);
			if (error) {
				console.log(error);
				notification.set('Oops, an error occurred. Error code: ' + error.code + '#error');
			} else if (data) {
				activeSpells.set(data[0].list);
				refreshList();
				modalCall.set('');
				// $modalCall = $modalCall;
				topmenuopen.set(false);
				goto('/');
			}
		} else {
			console.log('nope');
			modalCall.set('save');
		}
	}

	export async function importBook(book) {
		modalCall.set('save');
		bookToEdit.set(book);
	}

	export async function publishBook(id) {
		const { error } = await supabaseClient
			.from('spellbooks')
			.update({ published: true })
			.eq('id', id);
		if (error) {
			console.log(error);
			notification.set('Oops, an error occurred. Error code: ' + error.code + '#error');
		} else {
			if (get(pagetitle) == 'My account') {
				loadSpellsheetsByUserId(get(userId));
				var setPublishedBook = get(lookupBook);
				setPublishedBook.published = true;
				lookupBook.set(setPublishedBook);
				notification.set('Spellbook published!#positive');
			}
		}
	}

	export async function unpublishBook(id) {
		const { error } = await supabaseClient
			.from('spellbooks')
			.update({ published: false })
			.eq('id', id);
		if (error) {
			console.log(error);
			notification.set('Oops, an error occurred. Error code: ' + error.code + '#error');
		} else {
			loadSpellsheetsByUserId(get(userId));
			var setUnpublishedBook = get(lookupBook);
			setUnpublishedBook.published = false;
			lookupBook.set(setUnpublishedBook);
			notification.set('Spellbook made private.#info');
		}
	}
	export async function editPassword(email) {
		const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, {
			redirectTo: siteUrl + '/account/update-password'
		});
		if (data) {
			console.log(data);
			notification.set(
				'An email has been sent to your registered email address with instructions on how to change your password#info'
			);
			modalCall.set('');
		} else if (error) {
			console.log(error);
			notification.set('Oops, an error occurred. Error code: ' + error.code + '#error');
		}
	}

	export async function getUserProfile() {
		const { data, error } = await supabaseClient
			.from('spellbooks')
			.select()
			.eq('user_id', get(profileUser));
		if (data) {
			userProfile.set(data);
		}
	}
</script>
