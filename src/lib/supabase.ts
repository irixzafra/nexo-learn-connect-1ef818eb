
import { createClient } from '@supabase/supabase-js';

// Set default values for local development to ensure the client can initialize
// These should be overridden by the actual environment variables in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yydtceuhpvfsenlwuvmn.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5ZHRjZXVocHZmc2VubHd1dm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNDk3MTYsImV4cCI6MjA1ODgyNTcxNn0.Dy5AwXr1EWD5D-Ymj09mhFYD9ah9YJodmRdberEdOP4';

// For development environments, add a mock sign-in function
export const mockSignIn = async (email: string, password: string) => {
  console.log('Mock sign in with:', email, password);
  // Return a fake successful response for development
  return { error: null, data: { user: { email }, session: { access_token: 'fake-token' } } };
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
