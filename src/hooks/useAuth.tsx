
import { useAuth as useAuthContext } from '@/contexts/auth/AuthContext';

export const useAuth = () => {
  return useAuthContext();
};
