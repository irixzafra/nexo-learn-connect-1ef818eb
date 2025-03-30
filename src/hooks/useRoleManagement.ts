
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { UserProfile, UserRoleType } from '@/types/auth';
import { useToast } from "@/components/ui/use-toast";

export function useRoleManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching users:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar los usuarios.",
        });
        return;
      }
      
      setUsers(data as UserProfile[]);
      setFilteredUsers(data as UserProfile[]);
    } catch (error) {
      console.error('Error in fetchUsers:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al obtener los usuarios.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }
    
    const filtered = users.filter(user => 
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleRoleChange = async (userId: string, newRole: UserRoleType) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user role:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudo actualizar el rol del usuario.",
        });
        return;
      }

      // Update users with type safe transformation
      setUsers(prevUsers => 
        prevUsers.map(u => {
          if (u.id === userId) {
            return { ...u, role: newRole };
          }
          return u;
        })
      );
      
      // Update filtered users with type safe transformation
      setFilteredUsers(prevUsers => 
        prevUsers.map(u => {
          if (u.id === userId) {
            return { ...u, role: newRole };
          }
          return u;
        })
      );

      toast({
        title: "Rol actualizado",
        description: `El rol del usuario ha sido actualizado a ${newRole}.`,
      });
    } catch (error) {
      console.error('Error in handleRoleChange:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al cambiar el rol.",
      });
    }
  };

  return {
    users: filteredUsers,
    isLoading,
    searchTerm,
    setSearchTerm,
    handleRoleChange,
  };
}
