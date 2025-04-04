
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AuthContext } from '@/contexts/auth/AuthContext';
import { UserRoleType } from '@/types/auth';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { AuthContextType } from '@/contexts/auth/types';

// Default auth context that fully implements AuthContextType
const defaultAuthContext: AuthContextType = {
  isLoading: false,
  isAuthenticated: false,
  isInitialized: true,
  user: null,
  session: null,
  userProfile: null,
  profile: null,
  userRole: null,
  simulatedRole: null,
  effectiveRole: 'student',
  isViewingAsOtherRole: false,
  login: vi.fn().mockResolvedValue({ success: true }),
  logout: vi.fn().mockResolvedValue(undefined),
  signup: vi.fn().mockResolvedValue({ success: true }),
  updateProfile: vi.fn().mockResolvedValue({ success: true }),
  updatePassword: vi.fn().mockResolvedValue({ success: true }),
  forceUpdateRole: vi.fn().mockResolvedValue({ success: true }),
  setSimulatedRole: vi.fn(),
  resetToOriginalRole: vi.fn()
};

// Wrapper component that provides auth context and router
interface AllProvidersProps {
  children: React.ReactNode;
  authValue?: Partial<AuthContextType>;
}

export const AllProviders = ({
  children,
  authValue = {}
}: AllProvidersProps) => {
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ ...defaultAuthContext, ...authValue }}>
        {children}
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

// Render function with the wrapper
export const renderWithAuth = (
  ui: ReactElement,
  authValue: Partial<AuthContextType> = {},
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, {
    wrapper: (props) => <AllProviders {...props} authValue={authValue} />,
    ...options
  });
};
