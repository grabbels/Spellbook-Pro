import { writable } from 'svelte-local-storage-store';

export const activeSpells = writable('activeSpells', []);
export const loggedIn = writable('loggedIn', false);
export const userNickname = writable('userNickname', null);
export const firstVisit = writable('firstVisit', true);
