
import { useContext } from 'react';
import { useAuth as useAuthContext } from '@/contexts/auth/AuthContext';
import { AuthContextType } from '@/contexts/auth/types';

export const useAuth = (): AuthContextType => {
  const context = useAuthContext();
  
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
};
