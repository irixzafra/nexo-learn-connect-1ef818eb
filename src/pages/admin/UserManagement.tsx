
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { UserProfile, UserRole } from "@/types/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserRoleSwitcher } from "@/components/admin/UserRoleSwitcher";
import { Search, RefreshCw, UserPlus, ChevronLeft, UserCog, PencilLine, Trash2, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRoleSearch } from "@/components/admin/UserRoleSearch";
import SectionPageLayout, { PageSection } from "@/layouts/SectionPageLayout";
import { UserRoleType } from "@/features/users/UserRoleType";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
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

      setUsers(prevUsers => 
        prevUsers.map(u => 
          u.id === userId ? { ...u, role: newRole } : u
        )
      );

      // Update selected user if dialog is open
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({...selectedUser, role: newRole});
      }

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

  const handleSelectUser = (user: UserProfile) => {
    setSelectedUser(user);
    setIsUserDialogOpen(true);
  };

  const handleSelectAllUsers = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleToggleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, userId]);
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    }
  };

  const filteredUsers = searchTerm.trim() === "" 
    ? users 
    : users.filter(user => 
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <SectionPageLayout
      header={{
        title: "Gestión de Usuarios",
        description: "Administra los usuarios y sus roles en la plataforma",
        actions: [
          {
            label: "Añadir Usuario",
            icon: <UserPlus className="h-4 w-4" />,
            onClick: () => console.log("Añadir usuario clicked"),
          }
        ],
        breadcrumbs: [
          { title: "Dashboard", href: "/admin/dashboard" },
          { title: "Gestión de Usuarios" }
        ]
      }}
    >
      <div className="flex mb-4">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/admin/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Dashboard
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all-users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all-users">Todos los Usuarios</TabsTrigger>
          <TabsTrigger value="search-users">Buscar y Editar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-users" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <CardTitle>Lista de Usuarios</CardTitle>
                  <CardDescription>
                    Gestiona los usuarios de la plataforma y sus roles
                  </CardDescription>
                </div>
                <div className="relative mt-4 md:mt-0 w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar usuarios..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox 
                            checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                            onCheckedChange={handleSelectAllUsers}
                            aria-label="Seleccionar todos"
                          />
                        </TableHead>
                        <TableHead className="w-[250px]">Usuario</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead className="hidden md:table-cell">Fecha de registro</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow 
                            key={user.id} 
                            className="cursor-pointer hover:bg-accent"
                            onClick={() => handleSelectUser(user)}
                          >
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <Checkbox 
                                checked={selectedUsers.includes(user.id)}
                                onCheckedChange={(checked) => handleToggleSelectUser(user.id, !!checked)}
                                aria-label={`Seleccionar ${user.full_name || 'Usuario sin nombre'}`}
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              {user.full_name || 'Usuario sin nombre'}
                            </TableCell>
                            <TableCell>
                              <UserRoleType role={user.role} showIcon={true} />
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(user.created_at || '').toLocaleDateString()}
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-2">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectUser(user);
                                  }}
                                >
                                  <PencilLine className="h-4 w-4" />
                                </Button>
                                <UserRoleSwitcher 
                                  userId={user.id}
                                  currentRole={user.role}
                                  onRoleChange={handleRoleChange}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center h-24">
                            {searchTerm.trim() !== "" 
                              ? "No se encontraron usuarios que coincidan con la búsqueda." 
                              : "No hay usuarios para mostrar."}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="search-users">
          <Card>
            <CardHeader>
              <CardTitle>Búsqueda avanzada</CardTitle>
              <CardDescription>
                Busca usuarios específicos y edita sus roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserRoleSearch />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User Details Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detalles del Usuario</DialogTitle>
            <DialogDescription>
              Información completa del usuario seleccionado
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">Nombre:</span>
                <span>{selectedUser.full_name || 'Usuario sin nombre'}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">Rol:</span>
                <UserRoleType role={selectedUser.role} showIcon={true} />
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">Fecha de registro:</span>
                <span>{new Date(selectedUser.created_at || '').toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">ID de usuario:</span>
                <span className="text-xs text-muted-foreground break-all">{selectedUser.id}</span>
              </div>
              <div className="pt-4">
                <span className="text-sm font-medium">Cambiar rol:</span>
                <div className="mt-2">
                  <UserRoleSwitcher 
                    userId={selectedUser.id}
                    currentRole={selectedUser.role}
                    onRoleChange={handleRoleChange}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SectionPageLayout>
  );
};

export default UserManagement;
