
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// We need proper environment variables for Supabase to work correctly
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yydtceuhpvfsenlwuvmn.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5ZHRjZXVocHZmc2VubHd1dm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNDk3MTYsImV4cCI6MjA1ODgyNTcxNn0.Dy5AwXr1EWD5D-Ymj09mhFYD9ah9YJodmRdberEdOP4';

// Check for missing environment variables
if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing Supabase environment variables');
  console.log('Please connect your Supabase project in the Lovable interface');
  console.log('Click on the Supabase icon in the top menu and follow the instructions');
}

// Always create a client, but it will only work with proper credentials
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseKey
);
