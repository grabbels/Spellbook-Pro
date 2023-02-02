import { createClient } from '@supabase/auth-helpers-sveltekit'
import { env } from '$env/dynamic/public'

const supabaseUrl = 'https://gpciwfqwgaphkdqlqutq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwY2l3ZnF3Z2FwaGtkcWxxdXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM3MzA5OTksImV4cCI6MTk4OTMwNjk5OX0.j4ZXU5w3u_5vG9D_WA0DrObEX0sfeMVlnfS5-pcH24w'

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)