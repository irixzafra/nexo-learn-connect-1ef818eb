
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { UserRoleType, asUserRoleType } from '@/types/auth';

export interface Role {
  id: string;
  name: string;
  description: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const fetchRoles = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('roles')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) {
        console.error('Error fetching roles:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar los roles.",
        });
        return;
      }
      
      setRoles(data || []);
    } catch (error) {
      console.error('Error in fetchRoles:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al obtener los roles.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const createRole = async (name: string, description: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('roles')
        .insert([{ name, description }])
        .select();

      if (error) {
        console.error('Error creating role:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo crear el rol.",
        });
        return null;
      }

      setRoles([...roles, data[0]]);
      toast({
        title: "Rol creado",
        description: `El rol "${name}" ha sido creado con éxito.`,
      });
      
      return data[0];
    } catch (error) {
      console.error('Error in createRole:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al crear el rol.",
      });
      return null;
    } finally {
      setIsLoading(false);
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
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo actualizar el rol.",
        });
        return false;
      }

      setRoles(
        roles.map(role => (role.id === id ? { ...role, name, description } : role))
      );
      
      toast({
        title: "Rol actualizado",
        description: `El rol "${name}" ha sido actualizado con éxito.`,
      });
      
      return true;
    } catch (error) {
      console.error('Error in updateRole:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al actualizar el rol.",
      });
      return false;
    }
  };

  const deleteRole = async (id: string) => {
    try {
      // Check if this is a default role
      const roleToDelete = roles.find(r => r.id === id);
      if (roleToDelete?.is_default) {
        toast({
          variant: "destructive",
          title: "Operación no permitida",
          description: "No se pueden eliminar roles predeterminados del sistema.",
        });
        return false;
      }

      const { error } = await supabase
        .from('roles')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting role:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo eliminar el rol.",
        });
        return false;
      }

      setRoles(roles.filter(role => role.id !== id));
      
      toast({
        title: "Rol eliminado",
        description: "El rol ha sido eliminado con éxito.",
      });
      
      return true;
    } catch (error) {
      console.error('Error in deleteRole:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al eliminar el rol.",
      });
      return false;
    }
  };

  const assignRoleToUser = async (userId: string, roleId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role_id: roleId }]);

      if (error) {
        console.error('Error assigning role to user:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo asignar el rol al usuario.",
        });
        return false;
      }

      toast({
        title: "Rol asignado",
        description: "El rol ha sido asignado al usuario con éxito.",
      });
      
      return true;
    } catch (error) {
      console.error('Error in assignRoleToUser:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al asignar el rol.",
      });
      return false;
    }
  };

  const getUserRoles = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('get_user_roles', { p_user_id: userId });

      if (error) {
        console.error('Error getting user roles:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserRoles:', error);
      return [];
    }
  };

  const removeRoleFromUser = async (userId: string, roleId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .match({ user_id: userId, role_id: roleId });

      if (error) {
        console.error('Error removing role from user:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo quitar el rol del usuario.",
        });
        return false;
      }

      toast({
        title: "Rol eliminado",
        description: "El rol ha sido removido del usuario con éxito.",
      });
      
      return true;
    } catch (error) {
      console.error('Error in removeRoleFromUser:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al quitar el rol.",
      });
      return false;
    }
  };

  return {
    roles,
    isLoading,
    fetchRoles,
    createRole,
    updateRole,
    deleteRole,
    assignRoleToUser,
    getUserRoles,
    removeRoleFromUser
  };
}
