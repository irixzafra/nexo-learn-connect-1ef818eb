
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
        
        // Verificamos con console.log para depurar
        console.log('Login successful, userRole:', userRole);
        
        // Hacemos una comprobación del rol del usuario en su metadata
        const userMetadata = authData.user.user_metadata;
        const roleFromMetadata = userMetadata && userMetadata.role ? userMetadata.role : null;
        
        console.log('Role from metadata:', roleFromMetadata);
        
        // Usamos el rol de metadata si está disponible, o recurrimos al contexto
        const effectiveRole = roleFromMetadata || userRole;
        console.log('Effective role for redirect:', effectiveRole);
        
        // Redirigimos según el rol efectivo
        if (effectiveRole === 'admin') {
          console.log('Redirecting admin to landing page');
          navigate('/');
        } else if (effectiveRole === 'instructor') {
          console.log('Redirecting instructor to courses page');
          navigate('/instructor/courses');
        } else {
          // Default para estudiantes
          console.log('Redirecting student to my-courses page');
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
