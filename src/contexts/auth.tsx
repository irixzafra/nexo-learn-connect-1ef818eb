
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { UserRoleType, User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: UserRoleType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<UserRoleType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('user');
    const storedSession = localStorage.getItem('session');
    
    if (storedUser && storedSession) {
      setUser(JSON.parse(storedUser));
      setSession(JSON.parse(storedSession));
      setUserRole('student'); // Default role
      console.log("User restored from localStorage");
    }
    
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    // For demo/testing, create mock user and session
    const mockUser = { 
      id: '123', 
      email, 
      role: 'student' as UserRoleType,
      user_metadata: { name: 'Test User' }
    };
    
    const mockSession = {
      access_token: 'mock-token',
      refresh_token: 'mock-refresh',
      expires_at: Date.now() + 3600 * 1000,
      user: mockUser
    };
    
    // Store in state and localStorage
    setUser(mockUser);
    setSession(mockSession as unknown as Session);
    setUserRole('student');
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('session', JSON.stringify(mockSession));
    
    console.log("User logged in:", email);
    return Promise.resolve();
  };
  
  const logout = async () => {
    setUser(null);
    setSession(null);
    setUserRole(null);
    
    localStorage.removeItem('user');
    localStorage.removeItem('session');
    
    return Promise.resolve();
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      session,
      userRole,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
