
import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase (using the actual values)
const supabaseUrl = 'https://yydtceuhpvfsenlwuvmn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5ZHRjZXVocHZmc2VubHd1dm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNDk3MTYsImV4cCI6MjA1ODgyNTcxNn0.Dy5AwXr1EWD5D-Ymj09mhFYD9ah9YJodmRdberEdOP4';

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

// Helper to check database connection
export const checkDatabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('_view_database_info').select('*').limit(1);
    
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
