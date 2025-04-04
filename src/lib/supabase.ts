
import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase (using the actual values)
const supabaseUrl = 'https://yydtceuhpvfsenlwuvmn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5ZHRjZXVocHZmc2VubHd1dm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNDk3MTYsImV4cCI6MjA1ODgyNTcxNn0.Dy5AwXr1EWD5D-Ymj09mhFYD9ah9YJodmRdberEdOP4';

// Create a single instance of the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    detectSessionInUrl: true
  }
});

// Helper to check database connection
export const checkDatabaseConnection = async () => {
  try {
    // Use a more reliable query to check connection - using a known table
    const { error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Database connection error:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Failed to check database connection:', err);
    return false;
  }
};
