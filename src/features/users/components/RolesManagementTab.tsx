
import React from 'react';
import { Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRoleManagement } from './roles/useRoleManagement';
import { RoleTable } from './roles/RoleTable';
import { AddRoleDialog } from './roles/AddRoleDialog';
import { EditRoleDialog } from './roles/EditRoleDialog';
import { DeleteRoleDialog } from './roles/DeleteRoleDialog';

export const RolesManagementTab: React.FC = () => {
  const {
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
  } = useRoleManagement();

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl">Roles</CardTitle>
            <CardDescription>
              Gestiona los roles de usuario del sistema
            </CardDescription>
          </div>
          <Button onClick={handleOpenAddDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Rol
          </Button>
        </CardHeader>
        <CardContent>
          <RoleTable
            roles={roles}
            isLoading={isLoading}
            userCounts={userCounts}
            onEditRole={handleOpenEditDialog}
            onDeleteRole={handleOpenDeleteDialog}
          />
        </CardContent>
      </Card>

      <AddRoleDialog 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        onCreateRole={handleCreateRole}
      />

      <EditRoleDialog 
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        selectedRole={selectedRole}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        onUpdateRole={handleUpdateRole}
      />

      <DeleteRoleDialog 
        isOpen={!!deleteDialogRoleId}
        onOpenChange={(open) => !open && setDeleteDialogRoleId(null)}
        onConfirmDelete={handleDeleteRole}
      />
    </>
  );
};
