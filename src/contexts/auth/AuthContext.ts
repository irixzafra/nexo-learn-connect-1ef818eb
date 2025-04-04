
import { createContext } from 'react';
import { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  session: null,
  userProfile: null,
  profile: null,
  userRole: null,
  simulatedRole: null,
  effectiveRole: null,
  isViewingAsOtherRole: false,
  login: async () => ({ success: false }),
  logout: async () => {},
  signup: async () => ({ success: false }),
  updateProfile: async () => ({ success: false }),
  updatePassword: async () => ({ success: false }),
  forceUpdateRole: async () => ({ success: false }),
  setSimulatedRole: () => {},
  resetToOriginalRole: () => {},
});
