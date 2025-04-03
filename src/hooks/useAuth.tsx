
import { useAuth as useAuthContext } from '@/contexts/auth';

// Re-export the auth hook with all expected properties
export const useAuth = () => {
  return useAuthContext();
};

// Also export as default for backward compatibility
export default useAuth;
