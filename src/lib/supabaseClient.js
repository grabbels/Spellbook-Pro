import { createClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/dynamic/public';

const supabaseUrl = env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.PUBLIC_SUPABASE_ANON_KEY;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);