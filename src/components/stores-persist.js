import { writable } from 'svelte-local-storage-store';

export const activeSpells = writable('activeSpells', []);
