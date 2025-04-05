
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRoleType } from '@/types/auth';

// Mock data for auth
interface User {
  id: string;
  email: string;
  role: UserRoleType;
  avatar?: string;
}

interface Session {
  access_token: string;
  expires_at: number;
  user: User;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  userRole: UserRoleType | null;
  effectiveRole: UserRoleType | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setEffectiveRole: (role: UserRoleType) => void;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [effectiveRole, setEffectiveRoleState] = useState<UserRoleType | null>(null);

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
      const mockUser: User = {
        id: '1',
        email,
        role: 'student',
        avatar: ''
      };

      const mockSession: Session = {
        access_token: 'mock_token',
        expires_at: Date.now() + 3600 * 1000, // 1 hour
        user: mockUser
      };
      
      setUser(mockUser);
      setSession(mockSession);
      setEffectiveRoleState(mockUser.role);
      
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

  // Context value
  const value = {
    user,
    session,
    isAuthenticated: !!user,
    isLoading,
    isInitialized,
    userRole: user?.role || null,
    effectiveRole,
    login,
    logout,
    setEffectiveRole
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
