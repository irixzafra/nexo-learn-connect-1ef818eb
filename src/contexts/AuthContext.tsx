
import React, { createContext } from 'react';
import { useAuthState } from './auth/useAuthState';
import { AuthContextType } from './auth/types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authState = useAuthState();
  
  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};
