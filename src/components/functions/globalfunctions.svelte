<script context="module">
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
		lookupBook,
		loadingScreen,
		shareBookId,
		loadingBook
	} from '../stores/stores';
	import { activeSpells, activeTab, loggedIn, openSpellbooks } from '../stores/stores-persist';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { spells } from '../data/spells';
	import { currentUser, pb } from '$lib/pocketbase';

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
	let siteUrl = 'https://spellbook.pro';

	export function addSpell(spell) {
		let currentSpells = get(activeSpells);
		notification.set('');
		if (currentSpells.filter((e) => e.name === spell.name).length > 0) {
			notification.set('This spell is already in your spellbook.#error');
		} else {
			spell.display = true;
			currentSpells.push(spell);
			notification.set('Spell added.#info');
			activeSpells.set(currentSpells);
			let index = get(activeTab);
			let openBooks = get(openSpellbooks);
			openBooks[index].list = currentSpells;
			openSpellbooks.set(openBooks);
			setUnsaved();
			// activeTab.set(currentTab);
			// console.log(get(openSpellbooks));
			// console.log(get(activeTab));
		}
	}

	export function scrollToTop() {
		document.body.scrollIntoView()
	}

	export const moveItem = (array, to, from) => {
		const item = array[from];
		array.splice(from, 1);
		array.splice(to, 0, item);
		return array;
	};

	activeSpells.subscribe((data) => {
		if (!data || data.length === 0) {
			spellListEmpty.set(true);
		} else {
			spellListEmpty.set(false);
		}
	});

	export const topMenuOpenClose = () => {
		console.log('topmenu');
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

	export async function getUserId() {}

	export async function handleLogOut() {
		currentUser.set('');
	}

	export async function retrieveSession() {}

	export async function loadSpellsheetsByUserId(id) {
		id = get(userId);
		try {
			const records = await pb.collection('spellbooks').getFullList(200 /* batch size */, {
				sort: '-created',
				filter: `user_id = "${id}"`
			});
			if (records) {
				// console.log(records);

				let placeholderSlots = 7 - records.length;
				let retrievedSaves = records;
				retrievedSaves.push({ id: 'add' });
				for (let i = 0; i < placeholderSlots; i++) {
					retrievedSaves.push({});
				}
				savedSpellSheets.set(retrievedSaves);
				// console.log(get(savedSpellSheets));
			}
		} catch (err) {
			console.log(err.data);
		}
	}

	export const reverseString = (str) => [...str].reverse().join('');

	export async function refreshSession() {}

	export async function setUserData() {
		let user = get(currentUser);
		if (user) {
			userId.set(user.id);
			userNickname.set(user.username);
			userEmail.set(user.email);
		}
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
			setUnsaved();
			// $notification = 'Spellbook has been cleared';
		}
	}

	export function setUnsaved() {
		let index = get(activeTab);
		let openBooks = get(openSpellbooks);
		openBooks[index].unsaved = true;
		openSpellbooks.set(openBooks);
	}

	export function closeTab(closingTabIndex) {
		let openBooks = get(openSpellbooks);
		let openTabIndex = get(activeTab);
		if (!openBooks[openTabIndex + 1] && openBooks[openTabIndex - 1]) {
			openTabIndex--;
			close();
		} else if (openBooks.length == 1) {
			openTabIndex = -1;
			close();
		} else {
			close();
		}
		function close() {
			if (
				openBooks[closingTabIndex].unsaved == true &&
				openBooks[closingTabIndex].list &&
				openBooks[closingTabIndex].list.length > 0
			) {
				if (
					confirm(
						'This spellbook has unsaved changes. Are you sure you want to close this book?'
					) == true
				) {
					openBooks.splice(closingTabIndex, 1);
					activeTab.set(openTabIndex);
					openSpellbooks.set(openBooks);
				} else {
					return;
				}
			} else {
				openBooks.splice(closingTabIndex, 1);
				activeTab.set(openTabIndex);
				openSpellbooks.set(openBooks);
			}
		}
		// console.log(index);
		// console.log(get(openSpellbooks));
		// let allTabs = get(openSpellbooks);
		// let currentTab = get(activeTab);
		// if (
		// 	allTabs[index] &&
		// 	allTabs[index].unsaved === true &&
		// 	allTabs[index].list &&
		// 	allTabs[index].list.length > 0
		// ) {
		// 	if (
		// 		confirm('This spellbook has unsaved changes. Are you sure you want to close this book?') ==
		// 		true
		// 	) {
		// 		close();
		// 	}
		// } else {
		// 	close();
		// }
		// function close() {
		// 	if (currentTab.id == allTabs[index].id) {
		// 		if (allTabs[index + 1]) {
		// 			console.log('Selecting one tab up boss');
		// 			activeTab.set(allTabs[index + 1]);
		// 			activeSpells.set(allTabs[index + 1].list);
		// 		} else if (allTabs[index - 1]) {
		// 			console.log('Selecting one tab down boss');
		// 			activeTab.set(allTabs[index - 1]);
		// 			activeSpells.set(allTabs[index - 1].list);
		// 		}
		// 		let openSpellbooksSplice = get(openSpellbooks);
		// 		openSpellbooksSplice.splice(index, 1);
		// 		openSpellbooks.set(openSpellbooksSplice);
		// 		if (openSpellbooksSplice.length < 1) {
		// 			activeSpells.set([]);
		// 		}
		// 	} else if (!allTabs[index - 1] && !allTabs[index - 1]) {
		// 		console.log('that was the last one boss');
		// 		openSpellbooks.set([])
		// 		activeTab.set('');
		// 		activeSpells.set([]);
		// 	}
		// }
	}

	export async function removeBook(id) {
		// let toBeRemovedFrom = get(savedSpellSheets);
		if (confirm('Are you sure you want to delete this spellbook?') == true) {
			try {
				await pb.collection('spellbooks').delete(id);
				let spellbooks = get(openSpellbooks);
				for (let index = 0; index < spellbooks.length; index++) {
					if (spellbooks[index].id == id) {
						closeTab(index);
					}
				}
				modalCall.set('');

				loadSpellsheetsByUserId(get(userId));
			} catch (err) {
				console.log(err.data);
				notification.set(err.data.message + '#error');
			}
		}
	}
	export async function editBook(id) {
		try {
			const record = await pb.collection('spellbooks').getOne(id, {});
			if (record) {
				bookToEdit.set(record);
				modalCall.set('edit');
			}
		} catch (err) {
			console.log(err.data);
			notification.set(err.data.message + ' Error code: ' + err.data.code + '#error');
		}
	}

	export async function loadBook(id) {
		loadingBook.set(true);
		modalCall.set('');
		topmenuopen.set(false);
		try {
			const record = await pb.collection('spellbooks').getOne(id);
			if (record) {
				let openSpellbooksMutate = get(openSpellbooks);
				let openedBook = record;
				if (!openSpellbooksMutate.filter((e) => e.id == record.id).length > 0) {
					if (openedBook.share !== true) {
						openedBook.unsaved = false;
						openedBook.from_load = true;
					} else {
						openedBook.unsaved = true;
						openedBook.share = false;
					}
					// console.log(openedBook);
					openSpellbooksMutate.push(openedBook);
					openSpellbooks.set(openSpellbooksMutate);
					activeTab.set(openSpellbooksMutate.length - 1);			
				} else {
					console.log('already open!');
					let index = openSpellbooksMutate.findIndex((item) => item.id === record.id);
					activeTab.set(index);
					loadingBook.set(false);
				}
				// console.log(get(openSpellbooks));
				refreshList();

				// $modalCall = $modalCall;

				goto('/');
			}
		} catch (err) {
			console.log(err);
			// notification.set(err.data.message + ' Error code: ' + err.data.code + '#error');
		}
	}
	// export async function loadBook(id) {
	// 	try {
	// 		const record = await pb.collection('spellbooks').getOne(id);
	// 		if (record) {
	// 			let newArray = get(openSpellbooks);
	// 			let openedBook = record;
	// 			if (!get(openSpellbooks).filter((e) => e.id == record.id).length > 0) {
	// 				if (!openedBook.share === true) {
	// 					openedBook.from_load = true;
	// 				} else {
	// 					openedBook.unsaved = true;
	// 					openedBook.share = false;
	// 				}
	// 				console.log(openedBook);
	// 				newArray.push(openedBook);
	// 				openSpellbooks.set(newArray);
	// 				activeSpells.set(openedBook.list);
	// 				activeTab.set(openedBook);
	// 			} else {
	// 				console.log('already open!');
	// 				activeTab.set(record);
	// 				activeSpells.set(record.list);
	// 				console.log(get(activeTab));
	// 			}
	// 			// console.log(get(openSpellbooks));
	// 			refreshList();
	// 			modalCall.set('');
	// 			// $modalCall = $modalCall;
	// 			topmenuopen.set(false);
	// 			goto('/');
	// 		}
	// 	} catch (err) {
	// 		console.log(err);
	// 		// notification.set(err.data.message + ' Error code: ' + err.data.code + '#error');
	// 	}
	// }

	export async function importBook(book) {
		modalCall.set('save');
		bookToEdit.set(book);
	}

	export async function publishBook(id) {
		const data = {
			published: true
		};
		try {
			const record = await pb.collection('spellbooks').update(id, data);
			if (record) {
				if (get(pagetitle) == 'My account') {
					loadSpellsheetsByUserId(get(userId));
					var setPublishedBook = get(lookupBook);
					setPublishedBook.published = true;
					lookupBook.set(setPublishedBook);
					notification.set('Spellbook published!#positive');
				}
			}
		} catch (err) {
			console.log(err.data);
			notification.set(err.data.message + ' Error code: ' + err.data.code + '#error');
		}
	}

	export async function unpublishBook(id) {
		const data = {
			published: false
		};
		try {
			const record = await pb.collection('spellbooks').update(id, data);
			if (record) {
				loadSpellsheetsByUserId(get(userId));
				var setUnpublishedBook = get(lookupBook);
				setUnpublishedBook.published = false;
				lookupBook.set(setUnpublishedBook);
				notification.set('Spellbook made private.#info');
			}
		} catch (err) {
			console.log(err.data);
			notification.set(err.data.message + ' Error code: ' + err.data.code + '#error');
		}
	}
	export async function editPassword(email) {
		await pb.collection('users').requestPasswordReset(email);
		notification.set(
			'An email has been sent to your registered email address with instructions on how to change your password#info'
		);
	}

	export async function getUserProfile() {
		try {
			const records = await pb.collection('spellbooks').getFullList(200 /* batch size */, {
				filter: `user_id = "${get(profileUser)}"`,
				published: true
			});
			if (records) {
				userProfile.set(records);
			}
		} catch (err) {
			console.log(err);
		}
	}

	async function getUsername() {
		const record = await pb.collection('users').getOne(get(profileUser), {});
		console.log(record);
	}

	export function newBook() {
		let booksArray = get(openSpellbooks);
		const d = new Date();
		let time = d.getTime();
		let emptyBook = {
			id: 'temp' + time,
			name: 'Untitled spellbook',
			open_tab: true,
			unsaved: false,
			color: 'var(--white)'
		};
		booksArray.push(emptyBook);
		openSpellbooks.set(booksArray);
		activeTab.set(booksArray.length - 1);
		activeSpells.set([]);
	}

	export async function updateBook(id, type, newname) {
		let openBooks = get(openSpellbooks);
		let index = get(activeTab);
		const data = {};
		if (type == 'list') {
			let newList = openBooks[index].list;
			notification.set('Saving spellsheet...#loading');
			data.list = newList;
			update();
		} else if (type == 'name') {
			if (openBooks[index].unsaved === false) {
				notification.set('Saving spellsheet...#loading');
			}
			data.name = newname;
			openBooks[index].name = newname;
			openSpellbooks.set(openBooks);
			update();
		}
		async function update() {
			try {
				const record = await pb.collection('spellbooks').update(id, data);
				if (record) {
					console.log(record);
					loadSpellsheetsByUserId(get(userId));
					setTimeout(() => {
						notification.set('Spellbook saved!#positive');
						return 'done';
					}, 500);
				}
			} catch (err) {
				console.log(err.data);
				notification.set(err.data.message + ' Error code: ' + err.data.code + '#error');
			}
		}
	}

	export function handleSave(id) {
		let index = get(activeTab);
		let openBooks = get(openSpellbooks);
		if (!get(currentUser)) {
			notification.set('You need to <a href="/account/login">log in</a> to save spellbooks#alert');
		} else {
			if (openBooks[index].from_load === true) {
				updateBook(id, 'list');
			} else {
				modalCall.set('save');
			}
		}
	}

	export function handleLoad() {
		if (get(currentUser)) {
			modalCall.set('load');
		} else {
			notification.set('You need to <a href="/account/login">log in</a> to open spellbooks#alert');
		}
	}

	export async function shareBook() {
		let index = get(activeTab);
		let openBooks = get(openSpellbooks);
		if (openBooks[index].unsaved === true) {
			loadingScreen.set(true);
			console.log(
				"We're going to save this spellbook as a shareable book with minimal info which does not appear in the user's profile like a regular saved spellbook"
			);
			const data = {
				name: openBooks[index].name,
				list: get(activeSpells),
				user_id: 'share',
				share: true
			};
			try {
				const record = await pb.collection('spellbooks').create(data);
				if (record) {
					console.log(record.id);
					loadingScreen.set(false);
					shareBookId.set(record.id);
					modalCall.set('share');
				}
			} catch (err) {
				console.log(err);
				notification.set(err.data.message + ' Error code: ' + err.data.code + '#error');
			}
		} else {
			console.log(
				"We can simply share the saved spellbook's ID because it is already in the system"
			);
			shareBookId.set(openBooks[index].id);
			modalCall.set('share');
		}
	}
</script>
