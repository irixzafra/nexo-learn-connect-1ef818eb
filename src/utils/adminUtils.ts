
import { supabase } from '@/lib/supabase';
import { UserRoleType } from '@/types/auth';
import { toast } from 'sonner';

export const updateUserRole = async (email: string, newRole: UserRoleType): Promise<boolean> => {
  try {
    // First, find the user by email
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();
      
    if (userError) {
      console.error('Error finding user by email:', userError);
      toast.error(`No se pudo encontrar al usuario con email ${email}`);
      return false;
    }
    
    // Now update the user's role
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userData.id);
      
    if (updateError) {
      console.error('Error updating user role:', updateError);
      toast.error(`No se pudo actualizar el rol del usuario a ${newRole}`);
      return false;
    }
    
    toast.success(`El rol de ${email} ha sido actualizado a ${newRole}`);
    return true;
  } catch (error) {
    console.error('Error in updateUserRole:', error);
    toast.error('Ocurrió un error al actualizar el rol del usuario');
    return false;
  }
};

export const setupAdminUser = async (): Promise<void> => {
  try {
    // Try to update the role of admin@nexo.com
    const result = await updateUserRole('admin@nexo.com', 'admin');
    
    if (result) {
      console.log('✅ Usuario admin@nexo.com actualizado a administrador');
    } else {
      console.warn('⚠️ No se pudo actualizar automáticamente el rol del usuario admin@nexo.com');
    }
  } catch (error) {
    console.error('Error en setupAdminUser:', error);
  }
};
