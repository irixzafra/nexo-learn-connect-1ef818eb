
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { RegisterFormValues } from '@/lib/validations/auth';
import { toast } from 'sonner';
import { UserRole } from '@/types/auth';

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

  // Función especial para crear usuarios de prueba con roles específicos
  const createTestUser = async (email: string, password: string, fullName: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // 1. Registrar el usuario en la autenticación
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      if (authData.user) {
        // 2. Actualizar el rol en la tabla profiles
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role })
          .eq('id', authData.user.id);

        if (updateError) {
          console.error('Error al actualizar el rol:', updateError);
          toast.error('Usuario creado pero error al asignar rol');
          return null;
        }

        toast.success(`Usuario de prueba creado con rol: ${role}`);
        return {
          id: authData.user.id,
          email,
          fullName,
          role
        };
      }
      return null;
    } catch (error: any) {
      console.error('Error al crear usuario de prueba:', error);
      
      if (error.message.includes('Email already registered')) {
        toast.error('Este correo electrónico ya está registrado');
      } else {
        toast.error('Error al crear usuario de prueba');
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    createTestUser,
    isLoading
  };
};
