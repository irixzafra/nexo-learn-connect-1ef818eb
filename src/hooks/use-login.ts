
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { LoginFormValues } from '@/lib/validations/auth';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { userRole } = useAuth();

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
        
        // Redirect admin users to landing page instead of admin dashboard
        if (userRole === 'admin') {
          navigate('/');
        } else if (userRole === 'instructor') {
          navigate('/instructor/courses');
        } else {
          // Default for students
          navigate('/my-courses');
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
