
import { useAuth as useAuthContext } from '@/contexts/auth';

export const useAuth = () => {
  return useAuthContext();
};
