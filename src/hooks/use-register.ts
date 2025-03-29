
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
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
            full_name: data.fullName,
          }
        }
      });

      if (error) {
        throw error;
      }

      if (authData.user) {
        toast.success('Registro exitoso');
        navigate('/home');
      }
    } catch (error: any) {
      console.error('Error durante el registro:', error);
      
      if (error.message.includes('Email already registered')) {
        toast.error('Este correo electrónico ya está registrado');
      } else {
        toast.error('Error al registrar. Por favor intenta nuevamente.');
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
