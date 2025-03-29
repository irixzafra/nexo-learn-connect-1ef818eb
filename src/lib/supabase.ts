
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Valores predeterminados para entorno de desarrollo
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tu-url-de-supabase.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'tu-clave-anonima-de-supabase';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables. Using placeholder values for development only.');
  console.log('Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Supabase project settings.');
}

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseKey
);
