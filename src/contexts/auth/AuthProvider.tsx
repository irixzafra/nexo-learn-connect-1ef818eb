
import React, { useState, useEffect } from 'react';
import { UserRoleType, UserProfile, toUserRoleType } from '@/types/auth';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { AuthContext } from './AuthContext';
import { fetchUserProfileService, getSessionService } from './authServices';
import { 
  saveSimulatedRole,
  getStoredSimulatedRole,
  forceUpdateUserRole
} from './authHelpers';
import {
  loginService,
  logoutService,
  signupService,
  updateProfileService,
  updatePasswordService
} from './authServices';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estados principales de autenticación
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  
  // Estados de perfil y rol
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRoleType | null>(null);
  const [simulatedRole, setSimulatedRoleState] = useState<UserRoleType | null>(null);

  // Estados derivados
  const effectiveRole = simulatedRole || userRole;
  const isViewingAsOtherRole = simulatedRole !== null;
  const isAuthenticated = !!session && !!user;

  console.log('>>> DEBUG AuthProvider RENDER:', {
    userRole,
    simulatedRole,
    effectiveRole,
    isViewingAsOtherRole,
    isAuthenticated,
    isLoading
  });

  // Manejador para actualizar el rol simulado
  const setSimulatedRole = (role: UserRoleType | null) => {
    const currentRole = userRole;
    setSimulatedRoleState(role);
    saveSimulatedRole(role, currentRole);
  };

  const resetToOriginalRole = () => {
    setSimulatedRole(null);
  };

  // Actualizar forzadamente el rol de un usuario (admin)
  const forceUpdateRole = async (email: string, roleToSet: UserRoleType) => {
    try {
      const result = await forceUpdateUserRole(email, roleToSet);
      
      // Si se actualizó con éxito y es el usuario actual, actualizamos el estado local
      if (result.success && user && email === user.email) {
        setUserRole(roleToSet);
        setUserProfile(prev => prev ? { ...prev, role: roleToSet } : null);
      }
      
      return result;
    } catch (error: any) {
      console.error('Error in forceUpdateRole:', error);
      return { success: false, error: error.message };
    }
  };

  // Función de login
  const login = async (email: string, password: string, remember: boolean = false) => {
    console.log("AuthProvider: login called with", email, "and remember:", remember);
    setIsLoading(true);
    
    try {
      const result = await loginService(email, password, remember);
      console.log("AuthProvider: login result", result);
      return result;
    } catch (error: any) {
      console.error("AuthProvider: login error", error);
      return { success: false, error: error.message || "Error desconocido" };
    } finally {
      setIsLoading(false);
    }
  };

  // Función de logout
  const logout = async () => {
    setIsLoading(true);
    
    try {
      setSimulatedRoleState(null);
      localStorage.removeItem('viewAsRole');
      await logoutService();
    } finally {
      setIsLoading(false);
    }
  };

  // Función de registro
  const signup = async (email: string, password: string, userData?: Partial<UserProfile>) => {
    setIsLoading(true);
    
    try {
      const result = await signupService(email, password, userData);
      return result;
    } catch (error: any) {
      return { success: false, error: error.message || "Error desconocido" };
    } finally {
      setIsLoading(false);
    }
  };

  // Función de actualización de perfil
  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return { success: false, error: 'No user logged in' };
    
    setIsLoading(true);
    
    try {
      const result = await updateProfileService(user.id, profileData);
      
      if (result.success) {
        setUserProfile(prev => prev ? { ...prev, ...profileData } : null);
        
        if (profileData.role) {
          setUserRole(toUserRoleType(profileData.role));
        }
      }
      
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  // Función de actualización de contraseña
  const updatePassword = async (password: string) => {
    setIsLoading(true);
    
    try {
      return await updatePasswordService(password);
    } finally {
      setIsLoading(false);
    }
  };

  // Inicialización del proveedor de autenticación
  useEffect(() => {
    let mounted = true;
    let subscription: { unsubscribe: () => void } | null = null;
    
    const initAuth = async () => {
      try {
        console.log("AuthProvider: Inicializando auth...");
        setIsLoading(true);
        
        // PRIMERO: Configurar la suscripción a cambios de estado de autenticación
        const { data } = supabase.auth.onAuthStateChange(async (event, newSession) => {
          console.log('Auth state changed:', event, newSession?.user?.id);
          
          if (!mounted) return;
          
          setSession(newSession);
          setUser(newSession?.user || null);
          
          // Si hay una sesión nueva, obtenemos el perfil del usuario
          if (newSession?.user) {
            // Usamos setTimeout para evitar deadlocks en Supabase
            setTimeout(async () => {
              try {
                const { success, data: profile } = await fetchUserProfileService(newSession.user.id);
                
                if (success && profile && mounted) {
                  setUserProfile(profile);
                  setUserRole(toUserRoleType(profile.role));
                }
              } catch (err) {
                console.error("Error fetching profile after auth state change:", err);
              }
            }, 0);
          } else if (event === 'SIGNED_OUT' && mounted) {
            // Limpiamos los estados cuando el usuario cierra sesión
            setUserProfile(null);
            setUserRole(null);
            setSimulatedRoleState(null);
            localStorage.removeItem('viewAsRole');
          }
        });
        
        subscription = data.subscription;
        
        // DESPUÉS: Verificamos si existe una sesión
        const { success, data: existingSession, error } = await getSessionService();
        
        if (error) {
          console.error("Error getting session:", error);
        }
        
        console.log("AuthProvider: Existing session:", existingSession?.user?.id || "none");
        
        if (mounted) {
          setSession(existingSession || null);
          setUser(existingSession?.user || null);
          
          // Si hay un usuario en la sesión, obtenemos su perfil
          if (existingSession?.user) {
            try {
              const { success, data: profile } = await fetchUserProfileService(existingSession.user.id);
              
              if (success && profile && mounted) {
                setUserProfile(profile);
                setUserRole(toUserRoleType(profile.role));
              }
            } catch (err) {
              console.error("Error fetching profile during init:", err);
            }
          }
        }
        
        // Verificar si hay un rol simulado guardado
        if (mounted) {
          const storedRole = getStoredSimulatedRole();
          if (storedRole) {
            setSimulatedRoleState(storedRole);
          }
        }
        
        // Aseguramos que admin@nexo.com siempre tenga rol admin (para desarrollo)
        if (mounted && user && user.email === 'admin@nexo.com') {
          console.log('Found admin@nexo.com user, ensuring admin role');
          await forceUpdateRole('admin@nexo.com', 'admin');
        }
      } catch (err) {
        console.error("Error in auth initialization:", err);
      } finally {
        // Garantizamos que isLoading se establezca en false al finalizar
        if (mounted) {
          setIsLoading(false);
          setIsInitialized(true);
          console.log('AuthProvider initialization complete, isLoading set to false');
        }
      }
    };
    
    initAuth();
    
    // Limpieza al desmontar
    return () => {
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  // Objetos de contexto que se proporcionarán
  const contextValue = {
    isLoading,
    isAuthenticated,
    isInitialized,
    user,
    session,
    userProfile,
    profile: userProfile, // Alias para mantener compatibilidad
    userRole,
    simulatedRole,
    effectiveRole,
    isViewingAsOtherRole,
    login,
    logout,
    signup,
    updateProfile,
    updatePassword,
    forceUpdateRole,
    setSimulatedRole,
    resetToOriginalRole
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
