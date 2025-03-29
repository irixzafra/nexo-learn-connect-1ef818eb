
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { RegisterFormValues } from '@/lib/validations/auth';
import { toast } from 'sonner';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (data: RegisterFormValues) => {
    setIsLoading(true);
    
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName
          }
        }
      });

      if (error) {
        throw error;
      }

      if (authData.user) {
        toast.success('Registro exitoso. Ya puedes iniciar sesión.');
        navigate('/auth/login');
      }
    } catch (error: any) {
      console.error('Error durante el registro:', error);
      
      if (error.message.includes('User already registered')) {
        toast.error('El correo electrónico ya está registrado. Por favor intenta con otro o inicia sesión.');
      } else {
        toast.error('Error al registrarse. Por favor intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading
  };
};
