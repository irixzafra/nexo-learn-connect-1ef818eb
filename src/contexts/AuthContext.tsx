
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { UserRole } from '@/types/auth';

interface Profile {
  id: string;
  full_name: string | null;
  role: UserRole | null;
}

interface AuthContextType {
  isLoading: boolean;
  user: User | null;
  profile: Profile | null;
  userRole: UserRole | null;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  
  // Función para obtener el perfil del usuario
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };
  
  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log('Auth state changed:', _event, session?.user?.id);
        setUser(session?.user ?? null);
        
        // If we have a user, try to determine their role and fetch profile
        if (session?.user) {
          const metadata = session.user.user_metadata;
          console.log('User metadata:', metadata);
          
          if (metadata && metadata.role) {
            console.log('Setting user role from metadata:', metadata.role);
            setUserRole(metadata.role as UserRole);
          } else {
            // Default to student if no role is specified
            console.log('No role in metadata, defaulting to student');
            setUserRole('student');
          }
          
          // Fetch user profile
          const profileData = await fetchUserProfile(session.user.id);
          console.log('Fetched profile data:', profileData);
          setProfile(profileData);
        } else {
          setUserRole(null);
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const metadata = session.user.user_metadata;
        console.log('Initial user metadata:', metadata);
        
        if (metadata && metadata.role) {
          console.log('Setting initial user role from metadata:', metadata.role);
          setUserRole(metadata.role as UserRole);
        } else {
          console.log('No initial role in metadata, defaulting to student');
          setUserRole('student');
        }
        
        // Fetch user profile
        const profileData = await fetchUserProfile(session.user.id);
        console.log('Initial profile data:', profileData);
        setProfile(profileData);
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
    setProfile(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        profile,
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
