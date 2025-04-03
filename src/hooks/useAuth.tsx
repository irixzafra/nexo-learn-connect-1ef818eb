
import { useAuth as useAuthContext } from '@/contexts/auth';

// Re-export the auth hook with all expected properties
export const useAuth = () => {
  const auth = useAuthContext();
  
  // Make sure all required properties are available
  return {
    ...auth,
    profile: auth.profile || null,
    userRole: auth.userRole || null,
    logout: auth.logout || auth.signOut || (() => console.warn('logout not implemented')),
    isAuthenticated: auth.isAuthenticated || false
  };
};

// Also export as default for backward compatibility
export default useAuth;
