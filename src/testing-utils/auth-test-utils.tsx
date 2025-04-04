
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AuthContext } from '@/contexts/auth/AuthContext';
import { UserRoleType } from '@/types/auth';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { AuthContextType } from '@/contexts/auth/types';

// Tipo para los valores del contexto de autenticación que respeta AuthContextType
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

// Componente wrapper que proporciona el contexto de autenticación y BrowserRouter
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

// Función de renderizado con el wrapper
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
