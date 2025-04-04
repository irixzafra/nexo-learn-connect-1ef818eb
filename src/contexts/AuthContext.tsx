
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  userRole: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({}),
  logout: async () => {},
  userRole: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

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
          
          // Obtener el rol del usuario
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', data.session.user.id)
              .single();
            
            if (profileError) {
              console.error("Error al obtener perfil:", profileError);
            } else if (profile) {
              setUserRole(profile.role);
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
      
      if (session?.user) {
        // Obtener rol del usuario cuando cambia la autenticación
        setTimeout(async () => {
          try {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();
            
            if (error) {
              console.error("Error al obtener perfil:", error);
            } else if (profile) {
              setUserRole(profile.role);
            }
          } catch (err) {
            console.error("Error al consultar perfil:", err);
          }
        }, 0);
      } else {
        setUserRole(null);
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
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    userRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
