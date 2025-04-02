
import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase (fallback for dev environment)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: localStorage
  }
});

// Export a mock version for development without Supabase
export const mockSignIn = async (email: string, password: string) => {
  console.log('Mock sign in:', email, password);
  
  // Create a mock user 
  const mockUser = {
    id: '1',
    email,
    user_metadata: {
      name: email.split('@')[0]
    }
  };
  
  // Store in localStorage to mimic persistence
  localStorage.setItem('supabase.auth.token', JSON.stringify({
    user: mockUser,
    access_token: 'mock-token',
    refresh_token: 'mock-refresh-token'
  }));
  
  return { data: { user: mockUser }, error: null };
};
