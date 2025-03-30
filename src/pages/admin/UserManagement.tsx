
import React, { useEffect, useState } from "react";
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
import { Search, RefreshCw, UserPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRoleSearch } from "@/components/admin/UserRoleSearch";
import SectionPageLayout, { PageSection } from "@/layouts/SectionPageLayout";
import { UserRoleType } from "@/features/users/UserRoleType";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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
        ]
      }}
    >
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
                        <TableHead className="w-[250px]">Usuario</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead className="hidden md:table-cell">Fecha de registro</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">
                              {user.full_name || 'Usuario sin nombre'}
                            </TableCell>
                            <TableCell>
                              <UserRoleType role={user.role} showIcon={true} />
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(user.created_at || '').toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <UserRoleSwitcher 
                                userId={user.id}
                                currentRole={user.role}
                                onRoleChange={handleRoleChange}
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center h-24">
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
    </SectionPageLayout>
  );
};

export default UserManagement;
