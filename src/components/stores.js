import { writable } from 'svelte/store';

export const notification = writable('');
export const pagetitle = writable('');
export const sidemenuopen = writable(false);
export const topmenuopen = writable(false);
export const spellListEmpty = writable(false);
export const userId = writable('')
export const userNickname = writable('')
export const session = writable('')
export const modalCall = writable('')
export const savedSpellSheets = writable([])
export const filters = writable(false)
export const actionFilter = writable('')
export const rangeFilter = writable('')
export const searchFilter = writable('')
export const saveFilter = writable('')
export const activeLevels = writable('')
export const quickQuery = writable('');
export const lookupSpell = writable('');
export const savePrompt = writable(false)