
import { supabase } from '@/lib/supabase';
import { UserProfile, UserRoleType, toUserRoleType } from '@/types/auth';

export const loginService = async (email: string, password: string) => {
  try {
    console.log("authServices: Intentando iniciar sesión con email:", email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("Error de autenticación:", error.message);
      return { success: false, error: error.message };
    }
    
    console.log("Login exitoso:", data);
    return { success: true, data };
  } catch (error: any) {
    console.error("Error inesperado durante login:", error);
    return { success: false, error: error.message };
  }
};

export const logoutService = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error);
    }
    return { success: !error };
  } catch (error: any) {
    console.error("Error inesperado durante logout:", error);
    return { success: false, error: error.message };
  }
};

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
      }
    }
    
    return { success: true };
  } catch (error: any) {
    console.error("Error inesperado durante registro:", error);
    return { success: false, error: error.message };
  }
};

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
    return { success: false, error: error.message };
  }
};

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
    return { success: false, error: error.message };
  }
};
