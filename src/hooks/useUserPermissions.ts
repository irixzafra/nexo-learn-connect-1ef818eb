
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/lib/supabase';
import { UserRoleType } from '@/types/auth';

interface Permission {
  id: string;
  code: string;
  name: string;
  description?: string;
}

export function useUserPermissions() {
  const { userRole, userId } = useAuth();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch user permissions when component mounts
  useEffect(() => {
    const fetchPermissions = async () => {
      if (!userId) return;
      
      setIsLoading(true);
      
      try {
        // Fetch role-based permissions from the database
        const { data, error } = await supabase
          .from('role_permissions')
          .select(`
            permissions:permission_id (
              id, 
              code, 
              name, 
              description
            )
          `)
          .eq('role', userRole);
        
        if (error) throw error;
        
        // Extract permissions from the nested structure
        const userPermissions = data?.map(item => item.permissions) || [];
        setPermissions(userPermissions);
      } catch (error) {
        console.error('Error fetching permissions:', error);
        setPermissions([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPermissions();
  }, [userId, userRole]);
  
  // Check if user has a specific permission
  const hasPermission = (permissionCode: string): boolean => {
    // Admin has all permissions
    if (userRole === 'admin') return true;
    
    return permissions.some(permission => permission.code === permissionCode);
  };
  
  // Check if user has any of the specified permissions
  const hasAnyPermission = (permissionCodes: string[]): boolean => {
    // Admin has all permissions
    if (userRole === 'admin') return true;
    
    return permissionCodes.some(code => hasPermission(code));
  };
  
  // Check if role has permission directly
  const roleHasPermission = (role: UserRoleType, permission: string): boolean => {
    // Admin has all permissions by default
    if (role === 'admin') return true;
    
    // This would require a backend check in a real implementation
    // For now, implement some basic logic
    if (role === 'instructor') {
      return permission.startsWith('course:') || permission.startsWith('student:');
    }
    
    return false;
  };
  
  return {
    permissions,
    isLoading,
    hasPermission,
    hasAnyPermission,
    roleHasPermission
  };
}
