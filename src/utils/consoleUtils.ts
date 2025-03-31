
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// This function can be called from the browser console
export const makeUserAdmin = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('email', email)
      .select();
    
    if (error) {
      console.error('Error updating user role:', error);
      toast.error(`No se pudo actualizar el rol del usuario ${email}`);
      return false;
    }
    
    console.log(`✅ Usuario ${email} actualizado a administrador`, data);
    toast.success(`El rol de ${email} ha sido actualizado a administrador`);
    return true;
  } catch (error) {
    console.error('Error in makeUserAdmin:', error);
    return false;
  }
};

// Make the function available in window for console use
if (typeof window !== 'undefined') {
  (window as any).makeUserAdmin = makeUserAdmin;
}
