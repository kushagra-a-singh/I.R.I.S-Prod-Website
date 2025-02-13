import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true
    },
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'apikey': supabaseAnonKey
    }
});

export default supabase;
