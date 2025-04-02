
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserProfile, UserRoleType } from '@/types/auth';
import { toast } from 'sonner';
import { fetchUserProfile, ensureUserProfile } from './profileUtils';
import { AuthContextType } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRoleType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.info('🔐 [Auth] Configurando listener de estado de autenticación');
    
    // Primero: Configurar el listener de cambios de estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.info(`🔐 [Auth] Evento de autenticación detectado: ${event}`);
        console.info(`🔐 [Auth] Usuario en sesión nueva: ${newSession?.user?.id || 'ninguno'}`);
        
        if (event === 'SIGNED_OUT') {
          console.info('🔐 [Auth] Usuario cerró sesión, limpiando estado');
          setSession(null);
          setUser(null);
          setProfile(null);
          setUserRole(null);
          return;
        }
        
        if (newSession?.user) {
          console.info(`🔐 [Auth] Nueva sesión detectada para usuario: ${newSession.user.id}`);
          
          // Actualizamos primero los estados básicos de sesión y usuario
          setSession(newSession);
          setUser(newSession.user);
          
          // Usamos setTimeout para evitar posible deadlock con el cliente Supabase
          setTimeout(async () => {
            try {
              console.info(`🔐 [Auth] Obteniendo perfil para usuario: ${newSession.user.id}`);
              const userProfile = await ensureUserProfile(newSession.user.id, newSession.user.email || '');
              
              if (userProfile) {
                console.info(`🔐 [Auth] Perfil encontrado/creado con rol: ${userProfile.role}`);
                setProfile(userProfile);
                setUserRole(userProfile.role || null);
              } else {
                console.warn(`⚠️ [Auth] No se pudo obtener/crear perfil para: ${newSession.user.id}`);
              }
            } catch (error) {
              console.error('❌ [Auth] Error al obtener el perfil:', error);
            }
          }, 0);
        }
      }
    );

    console.info('🔐 [Auth] Iniciando inicialización de autenticación...');
    
    const initializeAuth = async () => {
      console.time('🔐 [Auth] Tiempo de inicialización');
      setIsLoading(true);
      
      try {
        console.info('🔐 [Auth] Obteniendo sesión actual...');
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ [Auth] Error al obtener la sesión:', error);
          throw error;
        }
        
        console.info(`🔐 [Auth] Sesión obtenida: ${currentSession ? 'Sí' : 'No'}`);
        
        if (currentSession?.user) {
          console.info(`🔐 [Auth] Sesión existente para usuario: ${currentSession.user.id}`);
          console.info('🔐 [Auth] Actualizando estado de sesión y usuario');
          
          setSession(currentSession);
          setUser(currentSession.user);
          
          console.info(`🔐 [Auth] Obteniendo perfil para usuario: ${currentSession.user.id}`);
          
          try {
            const userProfile = await ensureUserProfile(currentSession.user.id, currentSession.user.email || '');
            
            if (userProfile) {
              console.info(`🔐 [Auth] Perfil encontrado/creado con rol: ${userProfile.role}`);
              setProfile(userProfile);
              setUserRole(userProfile.role || null);
            } else {
              console.warn(`⚠️ [Auth] No se pudo encontrar/crear perfil para: ${currentSession.user.id}`);
            }
          } catch (profileError) {
            console.error('❌ [Auth] Error al obtener el perfil:', profileError);
          }
        } else {
          console.info('🔐 [Auth] No hay sesión activa durante la inicialización');
        }
      } catch (error) {
        console.error('❌ [Auth] Error al inicializar autenticación:', error);
      } finally {
        console.info('🔐 [Auth] Finalizando inicialización, estado:', { 
          hasUser: !!user, 
          hasSession: !!session, 
          userRole,
        });
        
        setIsLoading(false);
        
        // IMPORTANTE: Marcamos la inicialización como completada
        console.info('🔐 [Auth] Estableciendo isInitialized a true');
        setIsInitialized(true);
        console.timeEnd('🔐 [Auth] Tiempo de inicialización');
      }
    };

    initializeAuth();
    
    return () => {
      console.info('🔐 [Auth] Limpiando suscripción de autenticación');
      subscription.unsubscribe();
    };
  }, []);

  // Función de login mejorada
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      console.info(`🔐 [Auth] Intentando iniciar sesión con: ${email}`);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ [Auth] Error al iniciar sesión:', error);
        toast.error('Error al iniciar sesión', {
          description: 'Verifica tus credenciales e intenta de nuevo',
        });
        throw error;
      }

      if (data?.user) {
        // El cambio de estado de autenticación manejará la actualización del estado del usuario
        console.info(`🔐 [Auth] Usuario inició sesión exitosamente: ${data.user.id}`);
        toast.success('Inicio de sesión exitoso');
      }
    } catch (error) {
      console.error('❌ [Auth] Error de login:', error);
      toast.error('Error al iniciar sesión', {
        description: 'Verifica tus credenciales e intenta de nuevo',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Función de logout mejorada
  const logout = async (): Promise<void> => {
    try {
      console.info('🔐 [Auth] Cerrando sesión de usuario');
      await supabase.auth.signOut();
      toast.success('Has cerrado sesión correctamente');
    } catch (error) {
      console.error('❌ [Auth] Error durante el cierre de sesión:', error);
      toast.error('Error al cerrar sesión');
      throw error;
    }
  };

  // Calculamos isAuthenticated para compatibilidad con versiones anteriores
  const isAuthenticated = !!session;

  // Objeto de contexto con todos los valores necesarios
  const value = {
    user,
    session,
    profile,
    userRole,
    isLoading,
    login,
    logout,
    isInitialized,
    isAuthenticated
  };

  console.debug('🔐 [Auth] Estado del proveedor:', {
    isInitialized,
    isLoading,
    isAuthenticated,
    userRole,
    hasProfile: !!profile
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
