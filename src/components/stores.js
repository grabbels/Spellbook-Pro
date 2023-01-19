import { writable } from 'svelte/store';

export const notification = writable('');
export const pagetitle = writable('');
export const sidemenuopen = writable(false);
export const topmenuopen = writable(false);
export const spellListEmpty = writable(false);
export const loggedIn = writable(false);
