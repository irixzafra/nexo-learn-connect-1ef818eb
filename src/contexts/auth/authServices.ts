
import { supabase } from '@/lib/supabase';
import { UserProfile, UserRoleType } from '@/types/auth';

/**
 * Servicio para iniciar sesión
 * Función pura que solo interactúa con Supabase y devuelve resultados/errores
 */
export const loginService = async (email: string, password: string, remember: boolean = false) => {
  try {
    console.log("authServices: Intentando iniciar sesión con email:", email, "y remember:", remember);
    
    // Validación básica
    if (!email || !password) {
      return { 
        success: false, 
        error: "El email y la contraseña son obligatorios" 
      };
    }
    
    // Login directo con Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("Error de autenticación:", error.message);
      
      // Transformar errores comunes de Supabase a mensajes más amigables
      let userFriendlyError = error.message;
      if (error.message.includes("Invalid login credentials")) {
        userFriendlyError = "Credenciales inválidas. Verifica tu email y contraseña e intenta de nuevo.";
      } else if (error.message.includes("Email not confirmed")) {
        userFriendlyError = "Tu email no ha sido confirmado. Por favor revisa tu bandeja de entrada.";
      } else if (error.message.includes("Too many requests")) {
        userFriendlyError = "Demasiados intentos fallidos. Por favor intenta más tarde.";
      } else if (error.message.includes("User not found")) {
        userFriendlyError = "El usuario no existe. Por favor verifica tu email.";
      }
      
      return { 
        success: false, 
        error: userFriendlyError 
      };
    }
    
    if (!data.session || !data.user) {
      return { 
        success: false, 
        error: "No se pudo iniciar sesión. Por favor intenta de nuevo." 
      };
    }
    
    // Si remember está activado, establecemos una sesión más larga
    if (remember && data.session) {
      try {
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });
        
        console.log("Extendiendo sesión para 'remember me'");
      } catch (sessionError: any) {
        console.error("Error al extender la sesión:", sessionError);
        // No fallamos todo el login si falla la extensión de sesión
      }
    }
    
    console.log("Login exitoso:", data);
    return { 
      success: true, 
      data 
    };
  } catch (error: any) {
    console.error("Error inesperado durante login:", error);
    return { 
      success: false, 
      error: error.message || "Ha ocurrido un error al iniciar sesión. Por favor intenta de nuevo más tarde." 
    };
  }
};

/**
 * Servicio para cerrar sesión
 */
export const logoutService = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Error al cerrar sesión:", error);
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (error: any) {
    console.error("Error inesperado durante logout:", error);
    return { success: false, error: error.message || "Error desconocido en el servicio de logout" };
  }
};

/**
 * Servicio para registro de usuarios
 */
export const signupService = async (email: string, password: string, userData?: Partial<UserProfile>) => {
  try {
    console.log("Intentando registrar con email:", email);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      console.error("Error de registro:", error.message);
      return { success: false, error: error.message };
    }
    
    // Create profile after signup
    if (data.user) {
      const profile = {
        userId: data.user.id,
        email: data.user.email,
        role: 'student' as UserRoleType,
        ...userData,
      };
      
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([profile]);
        
      if (profileError) {
        console.error('Error creating profile:', profileError);
        // No fallamos todo el registro si falla la creación del perfil
      }
    }
    
    return { success: true, data };
  } catch (error: any) {
    console.error("Error inesperado durante registro:", error);
    return { success: false, error: error.message || "Error desconocido en el servicio de registro" };
  }
};

/**
 * Servicio para actualizar el perfil del usuario
 */
export const updateProfileService = async (userId: string, profileData: Partial<UserProfile>) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('userId', userId);
      
    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Error desconocido al actualizar perfil" };
  }
};

/**
 * Servicio para actualizar contraseña
 */
export const updatePasswordService = async (password: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password,
    });
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Error desconocido al actualizar contraseña" };
  }
};

/**
 * Servicio para obtener el perfil del usuario por ID
 */
export const fetchUserProfileService = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error("Error al obtener perfil de usuario:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error("Error inesperado al obtener perfil:", error);
    return { success: false, error: error.message || "Error desconocido al obtener perfil" };
  }
};

/**
 * Servicio para obtener la sesión actual
 */
export const getSessionService = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error("Error al obtener sesión:", error);
      return { success: false, error: error.message };
    }
    
    return { success: true, data: data.session };
  } catch (error: any) {
    console.error("Error inesperado al obtener sesión:", error);
    return { success: false, error: error.message || "Error desconocido al obtener sesión" };
  }
};
