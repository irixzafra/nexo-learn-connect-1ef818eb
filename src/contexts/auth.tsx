
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { UserRoleType, User, UserProfile } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: UserRoleType | null;
  effectiveRole: UserRoleType | null;
  simulatedRole: UserRoleType | null;
  userProfile: UserProfile | null;
  profile: UserProfile | null; // Alias for backward compatibility
  isViewingAsOtherRole: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setSimulatedRole: (role: UserRoleType | null) => void;
  resetToOriginalRole: () => void;
  forceUpdateRole: (email: string, role: UserRoleType) => Promise<{success: boolean; error?: any}>;
  register?: (email: string, password: string, name: string) => Promise<void>;
  resetPassword?: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<UserRoleType | null>(null);
  const [simulatedRole, setSimulatedRoleState] = useState<UserRoleType | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Derived state
  const effectiveRole = simulatedRole || userRole;
  const isViewingAsOtherRole = !!simulatedRole;
  const isAuthenticated = !!user && !!session;
  
  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('user');
    const storedSession = localStorage.getItem('session');
    
    if (storedUser && storedSession) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser as User);
        setSession(JSON.parse(storedSession));
        setUserRole(parsedUser.role as UserRoleType || 'student');
        
        // Create a basic profile from user data
        setUserProfile({
          id: parsedUser.id,
          user_id: parsedUser.id,
          role: parsedUser.role as UserRoleType || 'student',
          full_name: parsedUser.user_metadata?.name || '',
          email: parsedUser.email
        });
        
        console.log("User restored from localStorage");
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem('user');
        localStorage.removeItem('session');
      }
    }
    
    setIsLoading(false);
    setIsInitialized(true);
  }, []);
  
  const login = async (email: string, password: string) => {
    // For demo/testing, create mock user and session
    const mockUser = { 
      id: '123', 
      email, 
      role: 'student' as UserRoleType,
      user_metadata: { name: 'Test User' },
      app_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString()
    } as User;
    
    const mockSession = {
      access_token: 'mock-token',
      refresh_token: 'mock-refresh',
      expires_at: Date.now() + 3600 * 1000,
      user: mockUser
    } as unknown as Session;
    
    // Store in state
    setUser(mockUser);
    setSession(mockSession);
    setUserRole('student');
    
    // Create a basic profile from user data
    const mockProfile = {
      id: mockUser.id,
      user_id: mockUser.id,
      role: 'student' as UserRoleType,
      full_name: mockUser.user_metadata?.name || '',
      email: mockUser.email
    };
    setUserProfile(mockProfile);
    
    // Store in localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('session', JSON.stringify(mockSession));
    
    console.log("User logged in:", email);
    return Promise.resolve();
  };
  
  const logout = async () => {
    setUser(null);
    setSession(null);
    setUserRole(null);
    setUserProfile(null);
    setSimulatedRoleState(null);
    
    localStorage.removeItem('user');
    localStorage.removeItem('session');
    localStorage.removeItem('viewAsRole');
    
    return Promise.resolve();
  };
  
  const setSimulatedRole = (role: UserRoleType | null) => {
    setSimulatedRoleState(role);
    if (role) {
      localStorage.setItem('viewAsRole', role);
    } else {
      localStorage.removeItem('viewAsRole');
    }
  };
  
  const resetToOriginalRole = () => {
    setSimulatedRoleState(null);
    localStorage.removeItem('viewAsRole');
  };
  
  const forceUpdateRole = async (email: string, role: UserRoleType) => {
    // In a real app, this would make an API call to update the user's role
    if (user && user.email === email) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      setUserRole(role);
      
      if (userProfile) {
        const updatedProfile = { ...userProfile, role };
        setUserProfile(updatedProfile);
      }
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { success: true };
    }
    
    // For demo purposes, pretend it succeeded even for other emails
    console.log(`Role for ${email} updated to ${role}`);
    return { success: true };
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      session,
      userRole,
      effectiveRole,
      simulatedRole,
      userProfile,
      profile: userProfile, // Add alias for backward compatibility
      isViewingAsOtherRole,
      isAuthenticated,
      isLoading,
      isInitialized,
      login,
      logout,
      setSimulatedRole,
      resetToOriginalRole,
      forceUpdateRole
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
