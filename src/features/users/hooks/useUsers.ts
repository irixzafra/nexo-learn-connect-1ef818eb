
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { UserRoleType, toUserRoleType } from '@/types/auth';

export interface UserRole {
  id: string;
  name: string;
  description?: string;
}

export interface UserProfile {
  id: string;
  email?: string;
  full_name: string;
  avatar_url?: string;
  created_at?: string;
  role: UserRoleType;
  roles?: UserRole[];
  username?: string;
  bio?: string;
  headline?: string;
  website?: string;
  location?: string;
  phone?: string;
  is_verified?: boolean;
  last_sign_in?: string;
  is_active?: boolean;
}

export function useUsers() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      
      const query = supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (searchQuery) {
        query.or(`full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      // Transform the data to match our UserProfile type
      const transformedData: UserProfile[] = data.map(user => ({
        ...user,
        role: toUserRoleType(user.role) // Convert string to UserRoleType
      }));
      
      setUsers(transformedData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los usuarios.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: UserRoleType) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
      
      if (error) throw error;
      
      // Update the local state
      setUsers(prevUsers => prevUsers.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      
      toast({
        title: "Rol actualizado",
        description: "El rol del usuario ha sido actualizado correctamente.",
      });
      
      return true;
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el rol del usuario.",
      });
      return false;
    }
  };

  const deactivateUser = async (userId: string) => {
    try {
      // In a real app, you might set an is_active flag instead of deleting
      const { error } = await supabase
        .from('profiles')
        .update({ is_active: false })
        .eq('id', userId);
      
      if (error) throw error;
      
      // Update local state
      setUsers(prevUsers => prevUsers.map(user => 
        user.id === userId ? { ...user, is_active: false } : user
      ));
      
      toast({
        title: "Usuario desactivado",
        description: "El usuario ha sido desactivado correctamente.",
      });
      
      return true;
    } catch (error) {
      console.error('Error deactivating user:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo desactivar el usuario.",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchQuery]);

  return {
    users,
    isLoading,
    searchQuery,
    setSearchQuery,
    fetchUsers,
    updateUserRole,
    deactivateUser
  };
}
