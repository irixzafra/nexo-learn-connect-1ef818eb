
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// We need proper environment variables for Supabase to work correctly
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check for missing environment variables
if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase environment variables');
  console.log('Please connect your Supabase project in the Lovable interface');
  console.log('Click on the Supabase icon in the top menu and follow the instructions');
}

// Always create a client, but it will only work with proper credentials
export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseKey || 'placeholder-key'
);
