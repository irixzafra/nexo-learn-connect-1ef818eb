
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  PlusCircle,
  Trash2,
  Edit,
  Shield,
  Info,
  CheckCircle,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Role {
  id: string;
  name: string;
  description: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openNewRoleDialog, setOpenNewRoleDialog] = useState(false);
  const [openEditRoleDialog, setOpenEditRoleDialog] = useState(false);
  const [deleteRoleId, setDeleteRoleId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('roles')
        .select('*')
        .order('is_default', { ascending: false })
        .order('name', { ascending: true });

      if (error) {
        throw error;
      }

      setRoles(data || []);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los roles.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRole = async () => {
    try {
      if (!formData.name.trim()) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "El nombre del rol es requerido.",
        });
        return;
      }

      const { data, error } = await supabase
        .from('roles')
        .insert([
          {
            name: formData.name,
            description: formData.description,
            is_default: false,
          },
        ])
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: "Rol creado",
        description: `El rol "${formData.name}" ha sido creado exitosamente.`,
      });

      setRoles([...roles, data[0]]);
      setOpenNewRoleDialog(false);
      setFormData({ name: '', description: '' });
    } catch (error) {
      console.error('Error creating role:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear el rol.",
      });
    }
  };

  const handleUpdateRole = async () => {
    try {
      if (!selectedRole || !formData.name.trim()) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "El nombre del rol es requerido.",
        });
        return;
      }

      const { error } = await supabase
        .from('roles')
        .update({
          name: formData.name,
          description: formData.description,
          updated_at: new Date().toISOString(),
        })
        .eq('id', selectedRole.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Rol actualizado",
        description: `El rol "${formData.name}" ha sido actualizado exitosamente.`,
      });

      // Update the local state
      setRoles(roles.map(role => role.id === selectedRole.id
        ? { ...role, name: formData.name, description: formData.description }
        : role
      ));
      setOpenEditRoleDialog(false);
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el rol.",
      });
    }
  };

  const handleDeleteRole = async () => {
    try {
      if (!deleteRoleId) return;

      const roleToDelete = roles.find(r => r.id === deleteRoleId);
      
      if (roleToDelete?.is_default) {
        toast({
          variant: "destructive",
          title: "Operación no permitida",
          description: "No se pueden eliminar roles predeterminados del sistema.",
        });
        setDeleteRoleId(null);
        return;
      }

      const { error } = await supabase
        .from('roles')
        .delete()
        .eq('id', deleteRoleId);

      if (error) {
        throw error;
      }

      toast({
        title: "Rol eliminado",
        description: "El rol ha sido eliminado exitosamente.",
      });

      setRoles(roles.filter(role => role.id !== deleteRoleId));
      setDeleteRoleId(null);
    } catch (error) {
      console.error('Error deleting role:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar el rol.",
      });
    }
  };

  const openNewDialog = () => {
    setFormData({ name: '', description: '' });
    setOpenNewRoleDialog(true);
  };

  const openEditDialog = (role: Role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description || '',
    });
    setOpenEditRoleDialog(true);
  };

  const confirmDelete = (roleId: string) => {
    setDeleteRoleId(roleId);
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (role.description && role.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Input
            placeholder="Buscar roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
          <div className="absolute left-3 top-2.5 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
        <Button onClick={openNewDialog}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nuevo Rol
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead className="hidden md:table-cell">Descripción</TableHead>
                <TableHead className="hidden md:table-cell">Tipo</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                    No se encontraron roles
                  </TableCell>
                </TableRow>
              ) : (
                filteredRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                        {role.name}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {role.description || "Sin descripción"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {role.is_default ? (
                        <Badge variant="secondary">
                          Predeterminado
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          Personalizado
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(role)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => confirmDelete(role.id)}
                          disabled={role.is_default}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create Role Dialog */}
      <Dialog open={openNewRoleDialog} onOpenChange={setOpenNewRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Rol</DialogTitle>
            <DialogDescription>
              Crea un nuevo rol para definir permisos específicos en el sistema.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="role-name">Nombre del Rol</Label>
              <Input
                id="role-name"
                placeholder="Ej: Editor, Supervisor, etc."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-description">Descripción</Label>
              <Textarea
                id="role-description"
                placeholder="Describa las responsabilidades de este rol..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenNewRoleDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateRole}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Crear Rol
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEditRoleDialog} onOpenChange={setOpenEditRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Rol</DialogTitle>
            <DialogDescription>
              Modifica los detalles del rol seleccionado.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-role-name">Nombre del Rol</Label>
              <Input
                id="edit-role-name"
                placeholder="Nombre del rol"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={selectedRole?.is_default}
              />
              {selectedRole?.is_default && (
                <p className="text-xs text-muted-foreground mt-1">
                  Los roles predeterminados no pueden cambiar de nombre.
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role-description">Descripción</Label>
              <Textarea
                id="edit-role-description"
                placeholder="Descripción del rol"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditRoleDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateRole}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Role Alert */}
      <AlertDialog open={!!deleteRoleId} onOpenChange={(open) => !open && setDeleteRoleId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Eliminar este rol podría afectar a los usuarios que lo tienen asignado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRole} className="bg-destructive text-destructive-foreground">
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
