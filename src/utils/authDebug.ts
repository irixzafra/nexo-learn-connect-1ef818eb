
import { supabase } from '@/lib/supabase';

/**
 * Utilidad para diagnosticar problemas de autenticación con Supabase
 * Para usar en la consola del navegador cuando sea necesario
 */
export const authDebug = {
  async checkSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      console.log("Sesión actual:", data?.session ? "Existe" : "No existe");
      if (error) {
        console.error("Error al obtener sesión:", error);
      }
      return { data, error };
    } catch (err) {
      console.error("Error al verificar sesión:", err);
      return { error: err };
    }
  },
  
  async testAuth(email: string, password: string) {
    try {
      console.log("Probando autenticación con:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Error de autenticación:", error);
        return { success: false, error };
      }
      
      console.log("Autenticación exitosa:", data);
      return { success: true, data };
    } catch (err) {
      console.error("Error inesperado durante autenticación:", err);
      return { success: false, error: err };
    }
  },
  
  async checkUser() {
    const { data } = await supabase.auth.getUser();
    console.log("Usuario actual:", data?.user || "No hay usuario");
    return data?.user;
  },
  
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error);
    } else {
      console.log("Sesión cerrada con éxito");
    }
    return !error;
  }
};

// Exponer en window para depuración en consola (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
  (window as any).authDebug = authDebug;
}
