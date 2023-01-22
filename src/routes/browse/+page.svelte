<script>
	import { pagetitle } from '../../components/stores.js';
    import { getUserId } from '../../components/globalfunctions.svelte';
	import { activeSpells, userNickname } from '../../components/stores-persist.js';
	import { supabaseClient } from '$lib/db';
    import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://gpciwfqwgaphkdqlqutq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2l3ZnF3Z2FwaGtkcWxxdXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM3MzA5OTksImV4cCI6MTk4OTMwNjk5OX0.j4ZXU5w3u_5vG9D_WA0DrObEX0sfeMVlnfS5-pcH24w')

	$pagetitle = 'Premade spellbooks';
	async function loadPremades() {
		const { data, error } = await supabaseClient.from('premade_lists').select();
		if (data) {
			console.log(data);
		}
	}
	async function publishSpellsheet() {
		const { error } = await supabase.from('premade_lists').insert([
			{
				list_creator: $userNickname,
				list_name: 'Awesome spellbook',
				list_class: 'Wizard',
				list_level: 10,
				list_description: 'Just a very awesome spellbook for an avarage wizard!',
				list: $activeSpells
			},
		]);
	}
	// publishSpellsheet();
   
    getUserId()
    // console.log()
</script>

<style>
</style>
