
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
    
    // Primero: Configurar el listener de cambios de estado de autenticación
    // IMPORTANTE: Este listener debe establecerse primero para capturar eventos futuros
    console.info('🔐 [Auth] Configurando listener de cambios en el estado de autenticación');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.info(`🔐 [Auth] Evento de autenticación detectado: ${event}`);
        console.info(`🔐 [Auth] Usuario en evento: ${newSession?.user?.id || 'ninguno'}`);
        
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
          
          // IMPORTANTE: Uso de setTimeout para evitar deadlock potencial con el cliente Supabase
          // Esto resuelve un problema conocido al realizar operaciones Supabase dentro del callback
          setTimeout(async () => {
            try {
              console.info(`🔐 [Auth] Obteniendo perfil para usuario: ${newSession.user.id}`);
              const userProfile = await ensureUserProfile(newSession.user.id, newSession.user.email || '');
              
              if (userProfile) {
                console.info(`🔐 [Auth] Perfil obtenido con rol: ${userProfile.role}`);
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
        console.info('🔐 [Auth] Consultando sesión actual en Supabase...');
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ [Auth] Error al obtener la sesión:', error);
          throw error;
        }
        
        console.info(`🔐 [Auth] Resultado de getSession: ${currentSession ? 'Sesión activa' : 'Sin sesión'}`);
        
        if (currentSession?.user) {
          console.info(`🔐 [Auth] Sesión existente encontrada para: ${currentSession.user.id}`);
          
          setSession(currentSession);
          setUser(currentSession.user);
          
          console.info(`🔐 [Auth] Obteniendo datos de perfil para: ${currentSession.user.id}`);
          
          try {
            const userProfile = await ensureUserProfile(currentSession.user.id, currentSession.user.email || '');
            
            if (userProfile) {
              console.info(`🔐 [Auth] Perfil obtenido exitosamente con rol: ${userProfile.role}`);
              setProfile(userProfile);
              setUserRole(userProfile.role || null);
            } else {
              console.warn(`⚠️ [Auth] No se pudo encontrar/crear perfil para: ${currentSession.user.id}`);
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
        console.info('🔐 [Auth] Finalizando inicialización de autenticación');
        console.info('🔐 [Auth] Estado final:', { 
          hasUser: !!user, 
          hasSession: !!session, 
          userRole,
          profile: profile ? 'Cargado' : 'No disponible'
        });
        
        setIsLoading(false);
        
        // CRÍTICO: Marcamos la inicialización como completada independientemente del resultado
        // Esto permite que la aplicación continúe incluso si hay errores de autenticación
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
        toast.error('Error al iniciar sesión', {
          description: 'Verifica tus credenciales e intenta de nuevo',
        });
        throw error;
      }

      if (data?.user) {
        // El cambio de estado será manejado por el listener onAuthStateChange
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

  // Función de logout mejorada
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
    userRole,
    hasProfile: !!profile
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
