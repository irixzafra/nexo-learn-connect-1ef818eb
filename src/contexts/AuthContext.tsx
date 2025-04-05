
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRoleType } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  userRole: UserRoleType | null;
  effectiveRole: UserRoleType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setEffectiveRole: (role: UserRoleType | null) => void;
  profile: any; // For simplicity in this example
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  effectiveRole: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  signUp: async () => {},
  resetPassword: async () => {},
  setEffectiveRole: () => {},
  profile: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRoleType | null>(null);
  const [effectiveRole, setEffectiveRole] = useState<UserRoleType | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Mock authentication for demo purposes
  useEffect(() => {
    // Simulate checking for saved session
    const checkSession = async () => {
      try {
        // In a real app, this would be an API call
        const savedUser = localStorage.getItem('user');
        
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setUserRole(parsedUser.role);
          setEffectiveRole(parsedUser.role);
          
          // Mock profile data
          setProfile({ 
            displayName: parsedUser.displayName || 'User',
            avatar: parsedUser.avatar || 'https://via.placeholder.com/150'
          });
        } else {
          // For demo, create a mock user
          const mockUser: User = {
            id: '1',
            email: 'demo@example.com',
            role: 'admin',
            displayName: 'Demo Admin',
            emailVerified: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          setUser(mockUser);
          setUserRole(mockUser.role);
          setEffectiveRole(mockUser.role);
          
          // Save to localStorage for persistence
          localStorage.setItem('user', JSON.stringify(mockUser));
          
          // Mock profile
          setProfile({
            displayName: mockUser.displayName,
            avatar: 'https://via.placeholder.com/150'
          });
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    try {
      setIsLoading(true);
      
      // Mock successful login
      const mockUser: User = {
        id: '1',
        email,
        role: email.includes('admin') ? 'admin' : 
              email.includes('instructor') ? 'instructor' : 'student',
        displayName: email.split('@')[0],
        emailVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setUser(mockUser);
      setUserRole(mockUser.role);
      setEffectiveRole(mockUser.role);
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Mock profile
      setProfile({
        displayName: mockUser.displayName,
        avatar: 'https://via.placeholder.com/150'
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Clear user data
      setUser(null);
      setUserRole(null);
      setEffectiveRole(null);
      setProfile(null);
      
      // Remove from localStorage
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    // Similar to login but would create a new user in a real app
    try {
      setIsLoading(true);
      
      // Mock signup
      const mockUser: User = {
        id: Math.random().toString(36).substring(2),
        email,
        role: 'student', // Default role for new users
        displayName: email.split('@')[0],
        emailVerified: false, // New users need to verify email
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setUser(mockUser);
      setUserRole(mockUser.role);
      setEffectiveRole(mockUser.role);
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Mock profile
      setProfile({
        displayName: mockUser.displayName,
        avatar: 'https://via.placeholder.com/150'
      });
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    // In a real app, this would send a password reset email
    console.log(`Password reset requested for ${email}`);
    // Implementation would depend on authentication provider
  };

  const value = {
    user,
    userRole,
    effectiveRole,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signUp,
    resetPassword,
    setEffectiveRole,
    profile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
