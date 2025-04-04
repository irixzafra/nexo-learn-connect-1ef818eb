
import { vi } from 'vitest';

// Mock de las funciones de autenticación de Supabase
export const mockAuthStateChange = vi.fn();
export const mockGetSession = vi.fn();
export const mockSignInWithPassword = vi.fn();
export const mockSignUp = vi.fn();
export const mockSignOut = vi.fn();
export const mockUpdateUser = vi.fn();

// Mock para el cliente Supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: mockSignInWithPassword,
      signUp: mockSignUp,
      signOut: mockSignOut,
      getSession: mockGetSession,
      onAuthStateChange: mockAuthStateChange,
      updateUser: mockUpdateUser
    },
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis()
  }
}));

// Reset de todos los mocks después de cada prueba
export const resetSupabaseMocks = () => {
  mockAuthStateChange.mockReset();
  mockGetSession.mockReset();
  mockSignInWithPassword.mockReset();
  mockSignUp.mockReset();
  mockSignOut.mockReset();
  mockUpdateUser.mockReset();
};

// Simulación de una sesión de usuario
export const mockUserSession = {
  user: {
    id: 'test-user-id',
    email: 'test@example.com',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString()
  },
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600
};

// Simulación de perfil de usuario
export const mockUserProfile = {
  id: 'test-user-id',
  email: 'test@example.com',
  role: 'student',
  full_name: 'Test User'
};
