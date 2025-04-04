
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { UserProfile } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  session: Session | null;  // Added session property
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  userRole: string | null;
  profile: UserProfile | null;  // Added profile property
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,  // Added session property
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({}),
  logout: async () => {},
  userRole: null,
  profile: null  // Added profile property
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);  // Added session state
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);  // Added profile state

  useEffect(() => {
    // Verificar si hay una sesión activa
    const fetchSession = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error al obtener sesión:", error);
        } else if (data?.session) {
          setUser(data.session.user);
          setSession(data.session);  // Set session state
          
          // Obtener el rol del usuario
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')  // Select all fields from profile
              .eq('id', data.session.user.id)
              .single();
            
            if (profileError) {
              console.error("Error al obtener perfil:", profileError);
            } else if (profile) {
              setUserRole(profile.role);
              setProfile(profile);  // Set profile state
            }
          } catch (err) {
            console.error("Error al consultar perfil:", err);
          }
        }
      } catch (error) {
        console.error("Error inesperado:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Establecer listener para cambios en autenticación
    const { data: subscription } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Evento de auth:", event);
      setUser(session?.user || null);
      setSession(session);  // Update session on auth state change
      
      if (session?.user) {
        // Obtener rol del usuario cuando cambia la autenticación
        setTimeout(async () => {
          try {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('*')  // Select all fields from profile
              .eq('id', session.user.id)
              .single();
            
            if (error) {
              console.error("Error al obtener perfil:", error);
            } else if (profile) {
              setUserRole(profile.role);
              setProfile(profile);  // Update profile on auth state change
            }
          } catch (err) {
            console.error("Error al consultar perfil:", err);
          }
        }, 0);
      } else {
        setUserRole(null);
        setProfile(null);  // Clear profile when user is not authenticated
      }
      
      setIsLoading(false);
    });

    fetchSession();

    // Limpieza al desmontar
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const value = {
    user,
    session,  // Added session to the context value
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    userRole,
    profile  // Added profile to the context value
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
