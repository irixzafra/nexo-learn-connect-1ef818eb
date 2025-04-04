
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AuthContext } from '@/contexts/auth/AuthContext';
import { UserRoleType } from '@/types/auth';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Tipo para los valores del contexto de autenticación
interface AuthContextValue {
  isLoading?: boolean;
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user?: any;
  session?: any;
  userProfile?: any;
  profile?: any; // Adding profile explicitly to match AuthContextType
  userRole?: UserRoleType | null;
  simulatedRole?: UserRoleType | null;
  effectiveRole?: UserRoleType;
  isViewingAsOtherRole?: boolean;
  login?: (email: string, password: string) => Promise<any>;
  logout?: () => Promise<void>;
  signup?: (email: string, password: string, userData?: any) => Promise<any>;
  updateProfile?: (data: any) => Promise<any>;
  updatePassword?: (password: string) => Promise<any>;
  forceUpdateRole?: (email: string, role: UserRoleType) => Promise<any>;
  setSimulatedRole?: (role: UserRoleType | null) => void;
  resetToOriginalRole?: () => void;
}

// Valores por defecto para el contexto de autenticación
const defaultAuthContext: AuthContextValue = {
  isLoading: false,
  isAuthenticated: false,
  isInitialized: true,
  user: null,
  session: null,
  userProfile: null,
  profile: null, // Added profile property
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
  authValue?: Partial<AuthContextValue>;
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
  authValue: Partial<AuthContextValue> = {},
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, {
    wrapper: (props) => <AllProviders {...props} authValue={authValue} />,
    ...options
  });
};
