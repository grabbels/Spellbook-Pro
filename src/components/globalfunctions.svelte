<script context="module">
	import { topmenuopen, sidemenuopen, spellListEmpty } from './stores';
	import { activeSpells } from './stores-persist';
	import { get } from 'svelte/store';

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
</script>
