
import { renderHook } from '@testing-library/react';
import { useAuth } from './useAuth';
import { AllProviders } from '@/testing-utils/auth-test-utils';
import { describe, it, expect } from 'vitest';

describe('useAuth hook', () => {
  it('should return isAuthenticated=false when no session exists', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <AllProviders authValue={{ 
          isAuthenticated: false, 
          user: null, 
          session: null 
        }}>
          {children}
        </AllProviders>
      )
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.session).toBeNull();
  });

  it('should return isAuthenticated=true when session exists', () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' };
    const mockSession = { access_token: 'token-123' };

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <AllProviders authValue={{ 
          isAuthenticated: true, 
          user: mockUser, 
          session: mockSession 
        }}>
          {children}
        </AllProviders>
      )
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.session).toEqual(mockSession);
  });

  it('should return the correct user role', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <AllProviders authValue={{ userRole: 'admin' }}>
          {children}
        </AllProviders>
      )
    });

    expect(result.current.userRole).toBe('admin');
  });

  it('should return the correct effective role with simulation', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <AllProviders authValue={{ 
          userRole: 'admin',
          simulatedRole: 'student',
          effectiveRole: 'student',
          isViewingAsOtherRole: true
        }}>
          {children}
        </AllProviders>
      )
    });

    expect(result.current.userRole).toBe('admin');
    expect(result.current.simulatedRole).toBe('student');
    expect(result.current.effectiveRole).toBe('student');
    expect(result.current.isViewingAsOtherRole).toBe(true);
  });

  it('should have login, logout and signup functions', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AllProviders
    });

    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
    expect(typeof result.current.signup).toBe('function');
  });
});
