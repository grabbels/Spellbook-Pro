import { createClient } from '@supabase/supabase-js';

export const supabaseClient = createClient(
	'https://gpciwfqwgaphkdqlqutq.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2l3ZnF3Z2FwaGtkcWxxdXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM3MzA5OTksImV4cCI6MTk4OTMwNjk5OX0.j4ZXU5w3u_5vG9D_WA0DrObEX0sfeMVlnfS5-pcH24w'
);
