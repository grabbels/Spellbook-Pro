import { createClient } from '@supabase/auth-helpers-sveltekit'
import { env } from '$env/dynamic/public'

const supabaseUrl = env.VITE_PUBLIC_SUPABASE_URL
const supabaseAnonKey = env.VITE_PUBLIC_SUPABASE_ANON_KEY

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)