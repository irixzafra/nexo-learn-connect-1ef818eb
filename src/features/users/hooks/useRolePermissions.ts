
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { toast } from 'sonner';
import { Permission } from './usePermissions';
import { Role } from './useRoles';

interface RolePermission {
  id: string;
  role_id: string;
  permission_id: string;
  created_at: string;
}

export function useRolePermissions(roleId?: string) {
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchRolePermissions = async (id?: string) => {
    if (!id && !roleId) return;
    
    const targetRoleId = id || roleId;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('role_permissions')
        .select('*')
        .eq('role_id', targetRoleId);
      
      if (error) {
        console.error('Error fetching role permissions:', error);
        toast.error("No se pudieron cargar los permisos del rol");
        return;
      }
      
      setRolePermissions(data || []);
    } catch (error) {
      console.error('Error in fetchRolePermissions:', error);
      toast.error("Ocurrió un error al obtener los permisos del rol");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (roleId) {
      fetchRolePermissions();
    }
  }, [roleId]);

  const togglePermission = async (role: Role, permission: Permission, hasPermission: boolean) => {
    try {
      if (hasPermission) {
        // Remove permission
        const permissionToRemove = rolePermissions.find(
          rp => rp.role_id === role.id && rp.permission_id === permission.id
        );
        
        if (!permissionToRemove) return false;
        
        const { error } = await supabase
          .from('role_permissions')
          .delete()
          .eq('id', permissionToRemove.id);
        
        if (error) {
          console.error('Error removing permission:', error);
          toast.error("No se pudo quitar el permiso");
          return false;
        }
        
        setRolePermissions(
          rolePermissions.filter(rp => rp.id !== permissionToRemove.id)
        );
        
        toast.success(`Se quitó el permiso "${permission.name}" del rol "${role.name}"`);
      } else {
        // Add permission
        const { data, error } = await supabase
          .from('role_permissions')
          .insert([{ role_id: role.id, permission_id: permission.id }])
          .select();
        
        if (error) {
          console.error('Error adding permission:', error);
          toast.error("No se pudo asignar el permiso");
          return false;
        }
        
        setRolePermissions([...rolePermissions, data[0]]);
        
        toast.success(`Se asignó el permiso "${permission.name}" al rol "${role.name}"`);
      }
      
      return true;
    } catch (error) {
      console.error('Error in togglePermission:', error);
      toast.error("Ocurrió un error al actualizar el permiso");
      return false;
    }
  };

  const hasPermission = (permissionId: string) => {
    return rolePermissions.some(rp => rp.permission_id === permissionId);
  };

  return {
    rolePermissions,
    isLoading,
    fetchRolePermissions,
    togglePermission,
    hasPermission
  };
}
