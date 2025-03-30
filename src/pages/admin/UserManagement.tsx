
import React, { useEffect, useState } from "react";
import { Users, Shield, Database, BarChart3 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { UserProfile, UserRoleType } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";
import { UserRoleSwitcher } from "@/components/admin/UserRoleSwitcher";
import AdminPageLayout from "@/layouts/AdminPageLayout";
import { AdminTabItem } from "@/components/admin/AdminTabs";
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
import { UserRoleDisplay } from "@/features/users/UserRoleType";
import { Checkbox } from "@/components/ui/checkbox";
import { PencilLine } from "lucide-react";

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

  // User List Tab Content
  const UsersTabContent = () => (
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
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox 
                          aria-label={`Seleccionar ${user.full_name || 'Usuario sin nombre'}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {user.full_name || 'Usuario sin nombre'}
                      </TableCell>
                      <TableCell>
                        <UserRoleDisplay role={user.role} showIcon={true} />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(user.created_at || '').toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
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
  );

  // Create tabs array for AdminPageLayout
  const tabs: AdminTabItem[] = [
    {
      value: 'users',
      label: 'Usuarios',
      icon: <Users className="h-4 w-4" />,
      content: <UsersTabContent />
    },
    {
      value: 'roles',
      label: 'Roles',
      icon: <Shield className="h-4 w-4" />,
      content: <p className="p-4">Gestión de Roles (Pendiente)...</p>
    },
    {
      value: 'permissions',
      label: 'Permisos',
      icon: <Database className="h-4 w-4" />,
      content: <p className="p-4">Gestión de Permisos (Pendiente)...</p>
    },
    {
      value: 'analytics',
      label: 'Analíticas',
      icon: <BarChart3 className="h-4 w-4" />,
      content: <p className="p-4">Analíticas de Usuarios (Pendiente)...</p>
    }
  ];

  return (
    <AdminPageLayout
      title="Gestión de Usuarios"
      subtitle="Administra los usuarios, roles y permisos de la plataforma"
      tabs={tabs}
      defaultTabValue="users"
    />
  );
};

export default UserManagement;
