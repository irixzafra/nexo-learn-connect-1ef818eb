
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { toast } from 'sonner';

export interface Role {
  id: string;
  name: string;
  description: string | null;
  is_default: boolean;
  created_at: string;
}

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchRoles = async () => {
    try {
      setIsLoading(true);
      
      // Usar la función RPC para obtener los roles
      const { data, error } = await supabase.rpc('get_available_roles');
      
      if (error) {
        console.error('Error fetching roles:', error);
        toast.error("No se pudieron cargar los roles");
        return;
      }
      
      setRoles(data || []);
    } catch (error) {
      console.error('Error in fetchRoles:', error);
      toast.error("Ocurrió un error al obtener los roles");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const createRole = async (name: string, description: string) => {
    try {
      const { data, error } = await supabase
        .from('roles')
        .insert([{ name, description }])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating role:', error);
        toast.error("No se pudo crear el rol");
        return null;
      }
      
      setRoles([...roles, data as Role]);
      toast.success(`Rol ${name} creado exitosamente`);
      return data;
    } catch (error) {
      console.error('Error in createRole:', error);
      toast.error("Ocurrió un error al crear el rol");
      return null;
    }
  };

  const updateRole = async (id: string, name: string, description: string) => {
    try {
      const { error } = await supabase
        .from('roles')
        .update({ name, description })
        .eq('id', id);
      
      if (error) {
        console.error('Error updating role:', error);
        toast.error("No se pudo actualizar el rol");
        return false;
      }
      
      setRoles(roles.map(role => 
        role.id === id
          ? { ...role, name, description }
          : role
      ));
      
      toast.success(`Rol actualizado exitosamente`);
      return true;
    } catch (error) {
      console.error('Error in updateRole:', error);
      toast.error("Ocurrió un error al actualizar el rol");
      return false;
    }
  };

  const deleteRole = async (id: string) => {
    try {
      // Verificar si hay usuarios con este rol
      const { data: users, error: usersError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('role_id', id);
      
      if (usersError) {
        console.error('Error checking users with role:', usersError);
        toast.error("No se pudo verificar si hay usuarios con este rol");
        return false;
      }
      
      if (users && users.length > 0) {
        toast.error(`No se puede eliminar el rol porque hay ${users.length} usuarios asociados a él`);
        return false;
      }
      
      const { error } = await supabase
        .from('roles')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting role:', error);
        toast.error("No se pudo eliminar el rol");
        return false;
      }
      
      setRoles(roles.filter(role => role.id !== id));
      toast.success("Rol eliminado exitosamente");
      return true;
    } catch (error) {
      console.error('Error in deleteRole:', error);
      toast.error("Ocurrió un error al eliminar el rol");
      return false;
    }
  };

  return {
    roles,
    isLoading,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole
  };
}
