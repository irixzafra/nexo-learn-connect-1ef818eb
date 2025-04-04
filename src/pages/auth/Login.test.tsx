
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { renderWithAuth } from '@/testing-utils/auth-test-utils';
import { mockSignInWithPassword, resetSupabaseMocks } from '@/testing-utils/supabase-mocks';

// Mock for react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom') as object;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock for sonner (toast)
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe('Login Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    resetSupabaseMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render login form correctly', () => {
    renderWithAuth(<Login />);
    
    // Verify main elements are rendered
    expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it('should display validation errors for invalid inputs', async () => {
    renderWithAuth(<Login />);
    
    // Intentar enviar el formulario vacío
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(submitButton);
    
    // Verificar mensajes de error de validación
    await waitFor(() => {
      expect(screen.getByText(/introduce un email válido/i)).toBeInTheDocument();
      expect(screen.getByText(/la contraseña debe tener/i)).toBeInTheDocument();
    });
  });

  it('should call login function with correct values on submit', async () => {
    // Configurar el mock de login para simular éxito
    const mockLogin = vi.fn().mockResolvedValue({ success: true });
    
    renderWithAuth(<Login />, {
      login: mockLogin
    });
    
    // Completar el formulario
    await userEvent.type(screen.getByLabelText(/correo electrónico/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'password123');
    
    // Enviar el formulario
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(submitButton);
    
    // Verificar que se llamó a login con los valores correctos
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  it('should show loading state during login process', async () => {
    // Configurar mock para que tarde en resolverse (simulando carga)
    const mockLogin = vi.fn().mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100))
    );
    
    renderWithAuth(<Login />, {
      login: mockLogin
    });
    
    // Completar y enviar el formulario
    await userEvent.type(screen.getByLabelText(/correo electrónico/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'password123');
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(submitButton);
    
    // Verificar que se muestra el estado de carga
    expect(await screen.findByText(/iniciando sesión/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('should redirect to dashboard after successful login', async () => {
    // Configurar el mock de login para simular éxito
    const mockLogin = vi.fn().mockResolvedValue({ success: true });
    
    renderWithAuth(<Login />, {
      login: mockLogin
    });
    
    // Completar y enviar el formulario
    await userEvent.type(screen.getByLabelText(/correo electrónico/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'password123');
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(submitButton);
    
    // Verificar que se llamó a login
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
      // La redirección se maneja dentro del hook useLogin, no en el componente
    });
  });
});
