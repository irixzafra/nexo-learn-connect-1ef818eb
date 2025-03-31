
import React, { useState, useEffect } from 'react';
import { useRoles, Role } from '../hooks/useRoles';
import { Plus, Pencil, Trash, Shield, MoreHorizontal } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { supabase } from '@/lib/supabase';

export const RolesManagementTab: React.FC = () => {
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Usuarios</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Loading skeleton
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={`skeleton-${i}`}>
                      <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-40" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : roles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                      No hay roles definidos
                    </TableCell>
                  </TableRow>
                ) : (
                  roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                          {role.name}
                        </div>
                      </TableCell>
                      <TableCell>{role.description || "Sin descripción"}</TableCell>
                      <TableCell>
                        {role.is_default ? (
                          <Badge variant="secondary">
                            Predeterminado
                          </Badge>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {userCounts[role.id] || 0} usuarios
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Acciones</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenEditDialog(role)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            {!role.is_default && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-destructive"
                                  onClick={() => handleOpenDeleteDialog(role.id)}
                                >
                                  <Trash className="h-4 w-4 mr-2" />
                                  Eliminar
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Role Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear nuevo rol</DialogTitle>
            <DialogDescription>
              Completa la información para crear un nuevo rol en el sistema.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre del rol</Label>
              <Input
                id="name"
                placeholder="Ej: Editor, Revisor, etc."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Describe las responsabilidades y permisos de este rol..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateRole}>
              Crear rol
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar rol</DialogTitle>
            <DialogDescription>
              Modifica la información del rol seleccionado.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nombre del rol</Label>
              <Input
                id="edit-name"
                placeholder="Ej: Editor, Revisor, etc."
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={selectedRole?.is_default}
              />
              {selectedRole?.is_default && (
                <p className="text-sm text-muted-foreground">
                  No se puede cambiar el nombre de un rol predeterminado.
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Descripción</Label>
              <Textarea
                id="edit-description"
                placeholder="Describe las responsabilidades y permisos de este rol..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateRole}>
              Guardar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Role Confirmation */}
      <AlertDialog open={!!deleteDialogRoleId} onOpenChange={(open) => !open && setDeleteDialogRoleId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Eliminar este rol puede afectar a los usuarios que lo tienen asignado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRole} className="bg-destructive text-destructive-foreground">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
