
import { useAuth as useAuthContext } from '@/contexts/auth/AuthContext';
import { AuthContextType } from '@/contexts/auth/types';

export const useAuth = (): AuthContextType => {
  return useAuthContext();
};
