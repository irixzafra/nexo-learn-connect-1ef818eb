
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { UserRole } from '@/types/auth';

interface AuthContextType {
  isLoading: boolean;
  user: User | null;
  userRole: UserRole | null;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  
  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        
        // If we have a user, try to determine their role
        if (session?.user) {
          const metadata = session.user.user_metadata;
          if (metadata && metadata.role) {
            setUserRole(metadata.role as UserRole);
          } else {
            // Default to student if no role is specified
            setUserRole('student');
          }
        } else {
          setUserRole(null);
        }
        
        setIsLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const metadata = session.user.user_metadata;
        if (metadata && metadata.role) {
          setUserRole(metadata.role as UserRole);
        } else {
          setUserRole('student');
        }
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        userRole,
        isAuthenticated: !!user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
