
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

// Mock data for roles and permissions
const ROLES = [
  {
    id: 'admin',
    name: 'Administrador',
    description: 'Acceso completo a todas las funcionalidades del sistema.',
    permissions: ['view_all', 'create_all', 'edit_all', 'delete_all', 'manage_users', 'manage_roles', 'manage_settings'],
  },
  {
    id: 'instructor',
    name: 'Instructor',
    description: 'Puede crear y gestionar cursos, evaluaciones y estudiantes.',
    permissions: ['view_courses', 'create_courses', 'edit_courses', 'delete_courses', 'view_students', 'grade_assessments'],
  },
  {
    id: 'student',
    name: 'Estudiante',
    description: 'Acceso básico para tomar cursos y realizar evaluaciones.',
    permissions: ['view_courses', 'view_own_progress', 'submit_assessments'],
  },
  {
    id: 'content_manager',
    name: 'Gestor de Contenido',
    description: 'Puede crear y editar contenido, pero no puede borrar ni gestionar usuarios.',
    permissions: ['view_courses', 'create_courses', 'edit_courses', 'view_students'],
  },
];

const PERMISSIONS = [
  { id: 'view_all', name: 'Ver todo', category: 'general' },
  { id: 'create_all', name: 'Crear todo', category: 'general' },
  { id: 'edit_all', name: 'Editar todo', category: 'general' },
  { id: 'delete_all', name: 'Eliminar todo', category: 'general' },
  { id: 'manage_users', name: 'Gestionar usuarios', category: 'users' },
  { id: 'manage_roles', name: 'Gestionar roles', category: 'users' },
  { id: 'manage_settings', name: 'Gestionar configuración', category: 'system' },
  { id: 'view_courses', name: 'Ver cursos', category: 'courses' },
  { id: 'create_courses', name: 'Crear cursos', category: 'courses' },
  { id: 'edit_courses', name: 'Editar cursos', category: 'courses' },
  { id: 'delete_courses', name: 'Eliminar cursos', category: 'courses' },
  { id: 'view_students', name: 'Ver estudiantes', category: 'users' },
  { id: 'grade_assessments', name: 'Calificar evaluaciones', category: 'courses' },
  { id: 'view_own_progress', name: 'Ver progreso propio', category: 'courses' },
  { id: 'submit_assessments', name: 'Enviar evaluaciones', category: 'courses' },
];

// Group permissions by category
const PERMISSION_CATEGORIES = PERMISSIONS.reduce((acc, permission) => {
  if (!acc[permission.category]) {
    acc[permission.category] = [];
  }
  acc[permission.category].push(permission);
  return acc;
}, {} as Record<string, typeof PERMISSIONS>);

export function RoleManagementTab() {
  const { toast } = useToast();
  const [roles, setRoles] = useState(ROLES);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [newRole, setNewRole] = useState({
    id: '',
    name: '',
    description: '',
    permissions: [] as string[],
  });

  const handleCreateRole = () => {
    // Validate role ID
    if (!newRole.id || roles.some(role => role.id === newRole.id)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "El ID del rol debe ser único.",
      });
      return;
    }

    // Create new role
    setRoles([...roles, { ...newRole }]);
    
    toast({
      title: "Rol creado",
      description: `El rol ${newRole.name} ha sido creado.`,
    });
    
    // Reset form
    setNewRole({
      id: '',
      name: '',
      description: '',
      permissions: [],
    });
  };

  const handleUpdateRole = () => {
    if (selectedRole) {
      // Update existing role
      setRoles(
        roles.map(role => 
          role.id === selectedRole.id
            ? { ...selectedRole }
            : role
        )
      );
      
      toast({
        title: "Rol actualizado",
        description: `El rol ${selectedRole.name} ha sido actualizado.`,
      });
      
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteRole = () => {
    if (selectedRole) {
      // Delete role
      setRoles(roles.filter(role => role.id !== selectedRole.id));
      
      toast({
        title: "Rol eliminado",
        description: `El rol ${selectedRole.name} ha sido eliminado.`,
      });
      
      setIsDeleteDialogOpen(false);
    }
  };

  const togglePermission = (roleId: string, permissionId: string) => {
    if (roleId === 'admin' || roleId === 'student') {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Los roles predeterminados no pueden ser modificados.",
      });
      return;
    }

    setRoles(
      roles.map(role => {
        if (role.id === roleId) {
          if (role.permissions.includes(permissionId)) {
            return {
              ...role,
              permissions: role.permissions.filter(p => p !== permissionId),
            };
          } else {
            return {
              ...role,
              permissions: [...role.permissions, permissionId],
            };
          }
        }
        return role;
      })
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Roles y Permisos</CardTitle>
              <CardDescription>
                Gestiona los roles y permisos del sistema.
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Añadir rol
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Crear nuevo rol</DialogTitle>
                  <DialogDescription>
                    Define un nuevo rol y asigna los permisos correspondientes.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role-id" className="text-right">
                      ID del rol
                    </Label>
                    <Input
                      id="role-id"
                      value={newRole.id}
                      onChange={(e) => setNewRole({ ...newRole, id: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                      className="col-span-3"
                      placeholder="ej: content_manager"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role-name" className="text-right">
                      Nombre
                    </Label>
                    <Input
                      id="role-name"
                      value={newRole.name}
                      onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                      className="col-span-3"
                      placeholder="ej: Gestor de Contenido"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role-description" className="text-right">
                      Descripción
                    </Label>
                    <Input
                      id="role-description"
                      value={newRole.description}
                      onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                      className="col-span-3"
                      placeholder="Descripción breve del rol"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <Label className="text-right mt-2">
                      Permisos
                    </Label>
                    <div className="col-span-3">
                      <ScrollArea className="h-72 rounded-md border p-4">
                        <Accordion type="multiple" className="w-full">
                          {Object.entries(PERMISSION_CATEGORIES).map(([category, permissions]) => (
                            <AccordionItem value={category} key={category}>
                              <AccordionTrigger>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="space-y-2">
                                  {permissions.map((permission) => (
                                    <div className="flex items-center space-x-2" key={permission.id}>
                                      <Checkbox 
                                        id={`new-${permission.id}`}
                                        checked={newRole.permissions.includes(permission.id)}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            setNewRole({ 
                                              ...newRole, 
                                              permissions: [...newRole.permissions, permission.id] 
                                            });
                                          } else {
                                            setNewRole({ 
                                              ...newRole, 
                                              permissions: newRole.permissions.filter(p => p !== permission.id) 
                                            });
                                          }
                                        }}
                                      />
                                      <label
                                        htmlFor={`new-${permission.id}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                      >
                                        {permission.name}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </ScrollArea>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button onClick={handleCreateRole}>Crear rol</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rol</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Permisos</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.length > 3 ? (
                          <span className="text-sm text-muted-foreground">
                            {role.permissions.length} permisos
                          </span>
                        ) : (
                          role.permissions.map((permission) => {
                            const permObj = PERMISSIONS.find(p => p.id === permission);
                            return (
                              <span 
                                key={permission}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                              >
                                {permObj?.name || permission}
                              </span>
                            );
                          })
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setSelectedRole(role);
                            setIsEditDialogOpen(true);
                          }}
                          disabled={role.id === 'admin' || role.id === 'student'}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => {
                            setSelectedRole(role);
                            setIsDeleteDialogOpen(true);
                          }}
                          disabled={role.id === 'admin' || role.id === 'student'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Matriz de Permisos</CardTitle>
          <CardDescription>
            Vista detallada de los permisos asignados a cada rol.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Permiso</TableHead>
                  {roles.map((role) => (
                    <TableHead key={role.id}>{role.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(PERMISSION_CATEGORIES).map(([category, permissions]) => (
                  <React.Fragment key={category}>
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={roles.length + 1} className="font-medium">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </TableCell>
                    </TableRow>
                    {permissions.map((permission) => (
                      <TableRow key={permission.id}>
                        <TableCell className="font-medium">{permission.name}</TableCell>
                        {roles.map((role) => (
                          <TableCell key={role.id}>
                            <div 
                              className="flex justify-center" 
                              onClick={() => togglePermission(role.id, permission.id)}
                            >
                              {role.permissions.includes(permission.id) ? (
                                <Check className="h-5 w-5 text-green-500" />
                              ) : (
                                <X className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar rol</DialogTitle>
            <DialogDescription>
              Modifica el rol y sus permisos.
            </DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role-name" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="edit-role-name"
                  value={selectedRole.name}
                  onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role-description" className="text-right">
                  Descripción
                </Label>
                <Input
                  id="edit-role-description"
                  value={selectedRole.description}
                  onChange={(e) => setSelectedRole({ ...selectedRole, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <Label className="text-right mt-2">
                  Permisos
                </Label>
                <div className="col-span-3">
                  <ScrollArea className="h-72 rounded-md border p-4">
                    <Accordion type="multiple" className="w-full">
                      {Object.entries(PERMISSION_CATEGORIES).map(([category, permissions]) => (
                        <AccordionItem value={category} key={category}>
                          <AccordionTrigger>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              {permissions.map((permission) => (
                                <div className="flex items-center space-x-2" key={permission.id}>
                                  <Checkbox 
                                    id={`edit-${permission.id}`}
                                    checked={selectedRole.permissions.includes(permission.id)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setSelectedRole({ 
                                          ...selectedRole, 
                                          permissions: [...selectedRole.permissions, permission.id] 
                                        });
                                      } else {
                                        setSelectedRole({ 
                                          ...selectedRole, 
                                          permissions: selectedRole.permissions.filter(p => p !== permission.id) 
                                        });
                                      }
                                    }}
                                  />
                                  <label
                                    htmlFor={`edit-${permission.id}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {permission.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </ScrollArea>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateRole}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Role Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar este rol? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          {selectedRole && (
            <div className="py-4">
              <div className="mb-2">
                <div className="font-medium">{selectedRole.name}</div>
                <div className="text-sm text-muted-foreground">{selectedRole.description}</div>
              </div>
              <p className="text-amber-500">
                Nota: Los usuarios con este rol perderán sus permisos específicos.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteRole}>
              Eliminar rol
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
