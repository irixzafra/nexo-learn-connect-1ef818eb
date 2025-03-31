
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
    
    // Get the role ID for the new role
    const { data: roleData, error: roleError } = await supabase
      .from('roles')
      .select('id')
      .eq('name', newRole)
      .single();
      
    if (roleError || !roleData) {
      console.error('Error finding role:', roleError);
      toast.error(`No se pudo encontrar el rol ${newRole}`);
      return false;
    }
    
    // Update the user's role in profiles (for compatibility)
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userData.id);
      
    if (profileError) {
      console.error('Error updating profile role:', profileError);
      toast.error(`Error al actualizar el perfil del usuario`);
      return false;
    }
    
    // Remove existing roles for this user
    const { error: deleteError } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userData.id);
      
    if (deleteError) {
      console.error('Error removing existing roles:', deleteError);
    }
    
    // Add the new role
    const { error: insertError } = await supabase
      .from('user_roles')
      .insert({
        user_id: userData.id,
        role_id: roleData.id
      });
      
    if (insertError) {
      console.error('Error assigning new role:', insertError);
      toast.error(`Error al asignar el nuevo rol al usuario`);
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
