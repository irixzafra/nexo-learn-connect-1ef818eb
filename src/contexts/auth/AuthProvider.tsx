
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserProfile, UserRoleType } from '@/types/auth';
import { toast } from 'sonner';
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
    console.info('🔐 [Auth] Iniciando configuración del sistema de autenticación');
    
    // Primero: Configurar el listener de cambios de estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.info(`🔐 [Auth] Evento de autenticación detectado: ${event}`);
        
        if (event === 'SIGNED_OUT') {
          console.info('🔐 [Auth] Usuario cerró sesión, limpiando estado de autenticación');
          setSession(null);
          setUser(null);
          setProfile(null);
          setUserRole(null);
          return;
        }
        
        if (newSession?.user) {
          console.info(`🔐 [Auth] Sesión actualizada para usuario: ${newSession.user.id}`);
          
          // Actualizaciones síncronas - inmediatas para mejorar UX
          setSession(newSession);
          setUser(newSession.user);
          
          // Uso de setTimeout para evitar deadlock potencial con el cliente Supabase
          setTimeout(async () => {
            try {
              console.info(`🔐 [Auth] Obteniendo perfil para usuario: ${newSession.user.id}`);
              // Fetch profile data from database
              const { data: userProfile } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', newSession.user.id)
                .single();
              
              if (userProfile) {
                console.info(`🔐 [Auth] Perfil obtenido con rol: ${userProfile.role}`);
                setProfile(userProfile);
                setUserRole(userProfile.role || 'student');
              } else {
                console.warn(`⚠️ [Auth] No se pudo obtener perfil para: ${newSession.user.id}`);
              }
            } catch (error) {
              console.error('❌ [Auth] Error al obtener el perfil:', error);
            }
          }, 0);
        }
      }
    );

    // Segundo: Inicializar el estado de autenticación inicial
    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        console.info('🔐 [Auth] Obteniendo sesión actual...');
        
        const { data, error } = await supabase.auth.getSession();
        const currentSession = data?.session;
        
        if (error) {
          console.error('❌ [Auth] Error al obtener la sesión:', error);
          throw error;
        }
        
        if (currentSession?.user) {
          console.info(`🔐 [Auth] Sesión existente encontrada para: ${currentSession.user.id}`);
          
          setSession(currentSession);
          setUser(currentSession.user);
          
          try {
            const { data: userProfile } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', currentSession.user.id)
              .single();
            
            if (userProfile) {
              console.info(`🔐 [Auth] Perfil obtenido exitosamente con rol: ${userProfile.role}`);
              setProfile(userProfile);
              setUserRole(userProfile.role || 'student');
            } else {
              console.warn(`⚠️ [Auth] No se pudo encontrar perfil para: ${currentSession.user.id}`);
            }
          } catch (profileError) {
            console.error('❌ [Auth] Error al obtener el perfil durante inicialización:', profileError);
          }
        } else {
          console.info('🔐 [Auth] No hay sesión activa durante la inicialización');
        }
      } catch (error) {
        console.error('❌ [Auth] Error crítico durante inicialización de autenticación:', error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    // Ejecutar inicialización
    initializeAuth();
    
    // Limpiar suscripción al desmontar
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function for login - supports backward compatibility with signIn
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      console.info(`🔐 [Auth] Iniciando login para: ${email}`);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ [Auth] Error de login:', error.message);
        toast.error('Error al iniciar sesión', {
          description: 'Verifica tus credenciales e intenta de nuevo',
        });
        throw error;
      }

      if (data?.user) {
        console.info(`🔐 [Auth] Login exitoso para: ${data.user.id}`);
        toast.success('¡Bienvenido!', {
          description: 'Has iniciado sesión correctamente',
        });
      }
    } catch (error) {
      console.error('❌ [Auth] Error durante el proceso de login:', error);
      toast.error('Error al iniciar sesión', {
        description: 'Verifica tus credenciales e intenta de nuevo',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Function for logout - supports backward compatibility with signOut
  const logout = async (): Promise<void> => {
    try {
      console.info('🔐 [Auth] Iniciando proceso de cierre de sesión');
      await supabase.auth.signOut();
      console.info('🔐 [Auth] Sesión cerrada exitosamente');
      toast.success('Has cerrado sesión correctamente');
    } catch (error) {
      console.error('❌ [Auth] Error durante el cierre de sesión:', error);
      toast.error('Error al cerrar sesión');
      throw error;
    }
  };

  // Legacy functions for backward compatibility
  const signIn = login;
  const signOut = logout;
  const signUp = async (email: string, password: string, fullName: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      if (error) throw error;
      toast.success('¡Registro exitoso! Verifica tu correo electrónico.');
    } catch (error: any) {
      toast.error(`Error al registrarse: ${error.message}`);
      throw error;
    }
  };

  // Calculamos isAuthenticated para compatibilidad
  const isAuthenticated = !!session;

  // Objeto de contexto con todos los valores necesarios
  const value: AuthContextType = {
    user,
    session,
    profile,
    userRole,
    isLoading,
    login,
    signIn,
    logout,
    signOut,
    signUp,
    isInitialized,
    isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
