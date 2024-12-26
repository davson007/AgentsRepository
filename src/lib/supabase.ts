import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'agents-repository-auth',
    storage: window.localStorage
  },
  global: {
    headers: {
      'x-application-name': 'agents-repository'
    }
  },
  db: {
    schema: 'public'
  }
});

// Connection state management
let isConnected = false;
let connectionError: Error | null = null;

// Lightweight connection check
const checkConnection = async () => {
  try {
    await supabase.from('ai_personas').select('count').single();
    isConnected = true;
    connectionError = null;
    console.log('Supabase connection established');
  } catch (error) {
    isConnected = false;
    connectionError = error as Error;
    console.error('Supabase connection error:', error);
  }
};

// Initial connection check
checkConnection();

// Export utilities
export const getConnectionStatus = () => ({
  isConnected,
  error: connectionError
});

// Handle auth state changes
supabase.auth.onAuthStateChange((event, _session) => {
  if (event === 'SIGNED_OUT') {
    // Clear any cached data
    localStorage.removeItem('agents-repository-auth');
  }
});