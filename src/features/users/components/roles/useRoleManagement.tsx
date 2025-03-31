
import { useState, useEffect } from 'react';
import { Role, useRoles } from '../../hooks/useRoles';
import { supabase } from '@/lib/supabase';

export const useRoleManagement = () => {
  const { roles, isLoading, createRole, updateRole, deleteRole } = useRoles();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [deleteDialogRoleId, setDeleteDialogRoleId] = useState<string | null>(null);
  const [userCounts, setUserCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        // Esta consulta cuenta cuántos usuarios tienen cada rol
        const { data, error } = await supabase
          .from('user_roles')
          .select('role_id')
          .throwOnError();
        
        if (error) {
          console.error('Error fetching user counts:', error);
          return;
        }
        
        // Agrupar los resultados por role_id
        const counts: Record<string, number> = {};
        if (data) {
          data.forEach(row => {
            if (counts[row.role_id]) {
              counts[row.role_id]++;
            } else {
              counts[row.role_id] = 1;
            }
          });
        }
        
        setUserCounts(counts);
      } catch (error) {
        console.error('Error in fetchUserCounts:', error);
      }
    };
    
    if (roles.length > 0) {
      fetchUserCounts();
    }
  }, [roles]);

  const handleOpenAddDialog = () => {
    setName('');
    setDescription('');
    setIsAddDialogOpen(true);
  };

  const handleCreateRole = async () => {
    if (name.trim()) {
      await createRole(name.trim(), description.trim());
      setIsAddDialogOpen(false);
      setName('');
      setDescription('');
    }
  };

  const handleOpenEditDialog = (role: Role) => {
    setSelectedRole(role);
    setName(role.name);
    setDescription(role.description || '');
    setIsEditDialogOpen(true);
  };

  const handleUpdateRole = async () => {
    if (selectedRole && name.trim()) {
      await updateRole(selectedRole.id, name.trim(), description.trim());
      setIsEditDialogOpen(false);
      setSelectedRole(null);
      setName('');
      setDescription('');
    }
  };

  const handleOpenDeleteDialog = (roleId: string) => {
    setDeleteDialogRoleId(roleId);
  };

  const handleDeleteRole = async () => {
    if (deleteDialogRoleId) {
      await deleteRole(deleteDialogRoleId);
      setDeleteDialogRoleId(null);
    }
  };

  return {
    roles,
    isLoading,
    userCounts,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    name,
    setName,
    description,
    setDescription,
    selectedRole,
    deleteDialogRoleId,
    setDeleteDialogRoleId,
    handleOpenAddDialog,
    handleCreateRole,
    handleOpenEditDialog,
    handleUpdateRole,
    handleOpenDeleteDialog,
    handleDeleteRole,
  };
};
