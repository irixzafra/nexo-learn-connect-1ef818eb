
import { supabase } from '@/lib/supabase';
import { UserRole } from '@/types/auth';
import { toast } from 'sonner';

export type TestUser = {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
};

export async function createTestUser(user: TestUser) {
  try {
    // Check if Supabase is properly configured
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      toast.error('Supabase no está configurado. Por favor conecta tu proyecto en la interfaz de Lovable.');
      console.error('Supabase environment variables are missing');
      return null;
    }

    // 1. Registrar el usuario en la autenticación
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          full_name: user.fullName,
        }
      }
    });

    if (signUpError) {
      console.error('Error al registrar:', signUpError);
      toast.error(`Error al crear usuario ${user.email}: ${signUpError.message}`);
      return null;
    }

    if (authData.user) {
      // 2. Actualizar el rol en la tabla profiles
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: user.role })
        .eq('id', authData.user.id);

      if (updateError) {
        console.error('Error al actualizar el rol:', updateError);
        toast.error(`Usuario ${user.email} creado pero error al asignar rol: ${updateError.message}`);
        return null;
      }

      toast.success(`Usuario de prueba creado: ${user.email} (${user.role})`);
      return {
        id: authData.user.id,
        ...user
      };
    }
    return null;
  } catch (error: any) {
    console.error('Error inesperado:', error);
    toast.error(`Error al crear usuario ${user.email}: ${error.message}`);
    return null;
  }
}

export async function createAllTestUsers() {
  // Check if Supabase is properly configured
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    toast.error('Supabase no está configurado. Por favor conecta tu proyecto en la interfaz de Lovable.');
    console.error('Supabase environment variables are missing');
    return [];
  }

  const testUsers: TestUser[] = [
    {
      email: 'admin@nexo.com',
      password: 'Admin123!',
      fullName: 'Administrador Nexo',
      role: 'admin'
    },
    {
      email: 'instructor@nexo.com',
      password: 'Instructor123!',
      fullName: 'Instructor Nexo',
      role: 'instructor'
    },
    {
      email: 'student@nexo.com',
      password: 'Student123!',
      fullName: 'Estudiante Nexo',
      role: 'student'
    }
  ];

  const createdUsers = [];
  
  for (const user of testUsers) {
    const createdUser = await createTestUser(user);
    if (createdUser) {
      createdUsers.push(createdUser);
    }
  }
  
  return createdUsers;
}
