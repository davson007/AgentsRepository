import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Initializing Supabase with:', {
  url: supabaseUrl,
  keyLength: supabaseKey?.length || 0
});

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Test connection and RLS policies
supabase.from('ai_personas').select('count').single()
  .then(({ data, error }) => {
    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connection test successful, count:', data);
    }
  });

// Test RLS policies with a select query
supabase.from('ai_personas').select('*')
  .then(({ data, error }) => {
    if (error) {
      console.error('Supabase RLS test failed:', error);
    } else {
      console.log('Supabase RLS test successful, records:', data?.length || 0);
    }
  });