
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { LoginFormValues } from '@/lib/validations/auth';
import { toast } from 'sonner';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error('Error durante el inicio de sesión:', error);
        throw error;
      }

      if (authData.user) {
        toast.success('Inicio de sesión exitoso');
        
        // Get user profile from Supabase to determine role
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .single();
        
        if (profileError) {
          console.error('Error al obtener el perfil del usuario:', profileError);
          // Using dashboard instead of home for better user experience
          navigate('/dashboard');
          return;
        }
        
        const userRole = profileData?.role;
        console.log('User logged in with role:', userRole);
        
        // Redirect based on role but ensure we use routes with sidebar navigation
        if (userRole === 'admin') {
          navigate('/admin/dashboard');
        } else if (userRole === 'instructor') {
          navigate('/instructor/dashboard');
        } else {
          // For regular students, go to dashboard instead of /home
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      console.error('Error durante el inicio de sesión:', error);
      
      if (error.message && error.message.includes('Invalid login credentials')) {
        toast.error('Credenciales inválidas. Por favor verifica tu email y contraseña.');
      } else {
        toast.error('Error al iniciar sesión. Por favor intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading
  };
};
