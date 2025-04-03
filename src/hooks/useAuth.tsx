
import { useAuth as useAuthContext } from '@/contexts/auth';

// Re-export the auth hook with all expected properties
export const useAuth = () => {
  const auth = useAuthContext();
  
  // If there's an error, it means the original context is missing properties
  // This serves as a compatibility layer for components expecting these properties
  return {
    ...auth,
    // Add any missing properties that components might be expecting
    profile: auth.profile || null,
    userRole: auth.userRole || null,
    logout: auth.logout || (() => console.warn('logout not implemented')),
    isAuthenticated: auth.isAuthenticated || false
  };
};

// Also export as default for backward compatibility
export default useAuth;
