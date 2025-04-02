
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: any) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

// Creamos un contexto mock para el desarrollo
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulamos la carga inicial y autenticación del usuario
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulamos autenticación (reemplazar con implementación real)
      console.log('Iniciando sesión con:', email, password);
      const mockUser = {
        id: '1',
        email,
        user_metadata: {
          name: 'Usuario Demo',
          avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
          full_name: 'Usuario de Demostración'
        }
      } as User;
      
      const mockSession = {
        access_token: 'mock-token',
        refresh_token: 'mock-refresh',
        user: mockUser
      } as Session;
      
      setUser(mockUser);
      setSession(mockSession);
      
      // Guardamos en localStorage para persistencia simulada
      localStorage.setItem('supabase.auth.token', JSON.stringify(mockSession));
    } catch (error) {
      console.error('Error en autenticación:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    setIsLoading(true);
    try {
      console.log('Registrando usuario:', email, password, metadata);
      // Simulación de registro exitoso
      const mockUser = {
        id: '2',
        email,
        user_metadata: {
          ...metadata,
          name: metadata?.name || email.split('@')[0],
          avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
        }
      } as User;
      
      setUser(mockUser);
      
      // En producción: necesitaría confirmar email
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      // Simulamos cierre de sesión
      setUser(null);
      setSession(null);
      localStorage.removeItem('supabase.auth.token');
    } catch (error) {
      console.error('Error en cierre de sesión:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export default useAuth;
