import { writable } from 'svelte-local-storage-store';

export const activeSpells = writable('activeSpells', []);
export const loggedIn = writable('loggedIn', false);
export const userNickname = writable('userNickname', null);
export const firstVisitB = writable('firstVisitB', true);
export const openTabs = writable('openTabs', []);
export const openSpellbooks = writable('openSpellbooks', []);
export const tabs = writable('tabs', []);
export const activeTab = writable('activeTab', []);
export const userPrefs = writable('userPrefs', {
	filters: true,
	bookmarks: true,
	tabs: true,
	quicksearch: true,
	theme: 'Abyss',
	casting_time: true,
	range: true,
	duration: true,
	school: true,
	save: true,
	attack: true,
    description: true,
    icon: true
});
