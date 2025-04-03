
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
    console.info('🔐 [Auth] Iniciando configuración del sistema de autenticación');
    console.info('🔐 [Auth] Estado inicial:', { 
      isInitialized, 
      isLoading, 
      hasUser: !!user, 
      hasSession: !!session, 
      userRole 
    });
    
    // Primero: Configurar el listener de cambios de estado de autenticación
    console.info('🔐 [Auth] Configurando listener de cambios en el estado de autenticación');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.info(`🔐 [Auth] Evento de autenticación detectado: ${event}`);
        console.info(`🔐 [Auth] Usuario en evento: ${newSession?.user?.id || 'ninguno'}`);
        console.info(`🔐 [Auth] Detalles del evento:`, { event, hasNewSession: !!newSession, userId: newSession?.user?.id });
        
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
          console.info(`🔐 [Auth] Datos de sesión:`, { 
            userId: newSession.user.id, 
            email: newSession.user.email,
            hasAccessToken: !!newSession.access_token,
            expiresAt: newSession.expires_at
          });
          
          // Actualizaciones síncronas - inmediatas para mejorar UX
          setSession(newSession);
          setUser(newSession.user);
          
          // IMPORTANTE: Uso de setTimeout para evitar deadlock potencial con el cliente Supabase
          setTimeout(async () => {
            try {
              console.info(`🔐 [Auth] Obteniendo perfil para usuario: ${newSession.user.id}`);
              const userProfile = await ensureUserProfile(newSession.user.id, newSession.user.email || '');
              
              if (userProfile) {
                console.info(`🔐 [Auth] Perfil obtenido con rol: ${userProfile.role}`);
                console.info(`🔐 [Auth] Detalles del perfil:`, userProfile);
                setProfile(userProfile);
                setUserRole(userProfile.role || null);
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
      console.time('🔐 [Auth] Tiempo total de inicialización');
      console.info('🔐 [Auth] Comenzando inicialización de estado de autenticación...');
      
      setIsLoading(true);
      
      try {
        console.info('🔐 [Auth] ANTES de consultar sesión actual en Supabase...');
        console.info('🔐 [Auth] Llamando a supabase.auth.getSession()...');
        
        const { data, error } = await supabase.auth.getSession();
        const currentSession = data?.session;
        
        console.info('🔐 [Auth] DESPUÉS de consultar sesión en Supabase');
        console.info(`🔐 [Auth] Resultado de getSession:`, { 
          hasSession: !!currentSession, 
          userId: currentSession?.user?.id,
          error: error ? error.message : null,
          rawData: data
        });
        
        if (error) {
          console.error('❌ [Auth] Error al obtener la sesión:', error);
          console.error('❌ [Auth] Detalles del error:', { 
            message: error.message, 
            status: error.status,
            name: error.name
          });
          throw error;
        }
        
        if (currentSession?.user) {
          console.info(`🔐 [Auth] Sesión existente encontrada para: ${currentSession.user.id}`);
          console.info(`🔐 [Auth] Datos de sesión:`, { 
            userId: currentSession.user.id, 
            email: currentSession.user.email,
            hasAccessToken: !!currentSession.access_token,
            expiresAt: currentSession.expires_at,
          });
          
          setSession(currentSession);
          setUser(currentSession.user);
          
          console.info(`🔐 [Auth] Obteniendo datos de perfil para: ${currentSession.user.id}`);
          
          try {
            const userProfile = await ensureUserProfile(currentSession.user.id, currentSession.user.email || '');
            
            if (userProfile) {
              console.info(`🔐 [Auth] Perfil obtenido exitosamente con rol: ${userProfile.role}`);
              console.info(`🔐 [Auth] Detalles del perfil:`, userProfile);
              setProfile(userProfile);
              setUserRole(userProfile.role || null);
            } else {
              console.warn(`⚠️ [Auth] No se pudo encontrar/crear perfil para: ${currentSession.user.id}`);
            }
          } catch (profileError) {
            console.error('❌ [Auth] Error al obtener el perfil durante inicialización:', profileError);
            console.error('❌ [Auth] Detalles del error de perfil:', { 
              message: profileError instanceof Error ? profileError.message : 'Error desconocido',
              stack: profileError instanceof Error ? profileError.stack : 'No stack disponible'
            });
          }
        } else {
          console.info('🔐 [Auth] No hay sesión activa durante la inicialización');
        }
      } catch (error) {
        console.error('❌ [Auth] Error crítico durante inicialización de autenticación:', error);
        console.error('❌ [Auth] Detalles del error de inicialización:', { 
          message: error instanceof Error ? error.message : 'Error desconocido',
          stack: error instanceof Error ? error.stack : 'No stack disponible',
        });
      } finally {
        console.info('🔐 [Auth] Finalizando inicialización de autenticación');
        console.info('🔐 [Auth] Estado final antes de marcar como inicializado:', { 
          hasUser: !!user, 
          userId: user?.id,
          hasSession: !!session, 
          sessionUserId: session?.user?.id,
          userRole,
          profileId: profile?.id,
          profileLoaded: !!profile
        });
        
        setIsLoading(false);
        
        // CRÍTICO: Marcamos la inicialización como completada independientemente del resultado
        console.info('🔐 [Auth] Estableciendo isInitialized a true - autenticación lista');
        setIsInitialized(true);
        console.timeEnd('🔐 [Auth] Tiempo total de inicialización');
      }
    };

    // Ejecutar inicialización
    initializeAuth();
    
    // Limpiar suscripción al desmontar
    return () => {
      console.info('🔐 [Auth] Limpiando suscripción de autenticación');
      subscription.unsubscribe();
    };
  }, []);

  // Función de login mejorada con mejor manejo de errores
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
        console.error('❌ [Auth] Detalles del error de login:', { 
          message: error.message, 
          status: error.status,
          name: error.name
        });
        
        toast.error('Error al iniciar sesión', {
          description: 'Verifica tus credenciales e intenta de nuevo',
        });
        throw error;
      }

      if (data?.user) {
        // El cambio de estado será manejado por el listener onAuthStateChange
        console.info(`🔐 [Auth] Login exitoso para: ${data.user.id}`);
        console.info(`🔐 [Auth] Datos de login:`, { 
          userId: data.user.id, 
          email: data.user.email
        });
        
        toast.success('¡Bienvenido!', {
          description: 'Has iniciado sesión correctamente',
        });
      }
    } catch (error) {
      console.error('❌ [Auth] Error durante el proceso de login:', error);
      console.error('❌ [Auth] Detalles del error de proceso login:', { 
        message: error instanceof Error ? error.message : 'Error desconocido',
        stack: error instanceof Error ? error.stack : 'No stack disponible'
      });
      
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
      console.info('🔐 [Auth] Iniciando proceso de cierre de sesión');
      await supabase.auth.signOut();
      console.info('🔐 [Auth] Sesión cerrada exitosamente');
      toast.success('Has cerrado sesión correctamente');
    } catch (error) {
      console.error('❌ [Auth] Error durante el cierre de sesión:', error);
      console.error('❌ [Auth] Detalles del error de logout:', { 
        message: error instanceof Error ? error.message : 'Error desconocido',
        stack: error instanceof Error ? error.stack : 'No stack disponible'
      });
      
      toast.error('Error al cerrar sesión');
      throw error;
    }
  };

  // Calculamos isAuthenticated para compatibilidad
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

  console.debug('🔐 [Auth] Estado actual del proveedor:', {
    isInitialized,
    isLoading,
    isAuthenticated,
    userId: user?.id,
    sessionUserId: session?.user?.id,
    userRole,
    hasProfile: !!profile,
    timestamp: new Date().toISOString()
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
