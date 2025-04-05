
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRoleType, AuthUser, AuthSession, UserProfile } from '@/types/auth';

interface AuthContextType {
  user: AuthUser | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  userRole: UserRoleType | null;
  effectiveRole: UserRoleType | null;
  userProfile: UserProfile | null;
  profile: UserProfile | null;
  simulatedRole: UserRoleType | null;
  isViewingAsOtherRole: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setEffectiveRole: (role: UserRoleType) => void;
  forceUpdateRole: (email: string, roleToSet: UserRoleType) => Promise<{ success: boolean; error?: any }>;
  setSimulatedRole: (role: UserRoleType | null) => void;
  resetToOriginalRole: () => void;
  signup: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [effectiveRole, setEffectiveRoleState] = useState<UserRoleType | null>(null);
  const [simulatedRole, setSimulatedRoleState] = useState<UserRoleType | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Computed properties
  const isViewingAsOtherRole = simulatedRole !== null;

  // Simulate initialization
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Simulate API call
        const storedUser = localStorage.getItem('user');
        const storedSession = localStorage.getItem('session');
        
        if (storedUser && storedSession) {
          const user = JSON.parse(storedUser);
          const session = JSON.parse(storedSession);
          setUser(user);
          setSession(session);
          setEffectiveRoleState(user.role);

          // Set user profile
          setUserProfile({
            id: user.id,
            email: user.email,
            role: user.role,
            displayName: user.email.split('@')[0],
            avatar: 'https://via.placeholder.com/150'
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initAuth();
  }, []);

  // Simulated login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: AuthUser = {
        id: '1',
        email,
        role: email.includes('admin') ? 'admin' : 
              email.includes('instructor') ? 'instructor' : 'student',
        avatar: '',
        displayName: email.split('@')[0]
      };

      const mockSession: AuthSession = {
        access_token: 'mock_token',
        expires_at: Date.now() + 3600 * 1000, // 1 hour
        user: mockUser
      };
      
      setUser(mockUser);
      setSession(mockSession);
      setEffectiveRoleState(mockUser.role);
      
      // Set user profile
      const mockProfile: UserProfile = {
        id: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
        displayName: mockUser.email.split('@')[0],
        avatar: 'https://via.placeholder.com/150'
      };
      setUserProfile(mockProfile);
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('session', JSON.stringify(mockSession));
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated logout
  const logout = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear data
      setUser(null);
      setSession(null);
      setEffectiveRoleState(null);
      setSimulatedRoleState(null);
      setUserProfile(null);
      
      // Remove from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('session');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Set effective role (for role simulation)
  const setEffectiveRole = (role: UserRoleType) => {
    setEffectiveRoleState(role);
  };

  // Set simulated role
  const setSimulatedRole = (role: UserRoleType | null) => {
    setSimulatedRoleState(role);
  };

  // Reset to original role
  const resetToOriginalRole = () => {
    setSimulatedRoleState(null);
  };

  // Force update role
  const forceUpdateRole = async (email: string, roleToSet: UserRoleType) => {
    try {
      // In a real implementation, this would make an API call
      console.log(`Forcing role update for ${email} to ${roleToSet}`);
      
      // If this is the current user, update locally
      if (user && user.email === email) {
        const updatedUser = { ...user, role: roleToSet };
        setUser(updatedUser);
        setEffectiveRoleState(roleToSet);
        
        if (userProfile) {
          setUserProfile({ ...userProfile, role: roleToSet });
        }
        
        // Update in localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return { success: true };
    } catch (error: any) {
      console.error('Error updating role:', error);
      return { success: false, error: error.message };
    }
  };

  // Simulated signup
  const signup = async (email: string, password: string) => {
    // Implementation similar to login but would create a new account
    await login(email, password); // For demo, just login
  };

  // Simulated password reset
  const resetPassword = async (email: string) => {
    // Mock implementation
    console.log(`Password reset requested for ${email}`);
  };

  // Context value
  const value: AuthContextType = {
    user,
    session,
    isAuthenticated: !!user,
    isLoading,
    isInitialized,
    userRole: user?.role || null,
    effectiveRole,
    userProfile,
    profile: userProfile, // Alias for backward compatibility
    simulatedRole,
    isViewingAsOtherRole,
    login,
    logout,
    setEffectiveRole,
    forceUpdateRole,
    setSimulatedRole,
    resetToOriginalRole,
    signup,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook for using auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
