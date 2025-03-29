import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { UserProfile } from "@/types/auth";
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
import { UserManagementTabs } from "@/features/users/UserManagementTabs";
import { UserStats } from "@/features/users/UserStats";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { UserRoleSwitcher } from "@/components/admin/UserRoleSwitcher";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import AppLayout from "@/layouts/AppLayout";

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdminTools, setShowAdminTools] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { userRole, user } = useAuth();
  const { toast } = useToast();
  
  const totalUsers = users.length;
  const activeUsers = Math.round(totalUsers * 0.7); // Placeholder data
  const newUsers = Math.round(totalUsers * 0.15); // Placeholder data
  const inactiveUsers = Math.round(totalUsers * 0.25); // Placeholder data
  
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

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      if (userId === user?.id) {
        toast({
          variant: "destructive",
          title: "Operación no permitida",
          description: "No puedes cambiar tu propio rol.",
        });
        return;
      }

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
          u.id === userId ? { ...u, role: newRole as any } : u
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

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'instructor':
        return 'secondary';
      case 'student':
        return 'outline';
      case 'sistemas':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const isAdmin = userRole === 'admin';

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Gestión de Usuarios</h1>
        
        <UserStats 
          totalUsers={totalUsers}
          activeUsers={activeUsers}
          newUsers={newUsers}
          inactiveUsers={inactiveUsers}
          loading={isLoading}
        />
        
        <UserManagementTabs isAdmin={isAdmin} />
        
        <Card className="mt-6">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div>
                <CardTitle>Lista de Usuarios</CardTitle>
                <CardDescription>
                  Gestiona los usuarios de la plataforma y sus roles
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar usuarios..."
                    className="pl-8 w-full md:w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {isAdmin && (
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="adminTools" 
                      checked={showAdminTools}
                      onCheckedChange={setShowAdminTools}
                    />
                    <Label htmlFor="adminTools">Herramientas avanzadas</Label>
                  </div>
                )}
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
                      {isAdmin && <TableHead>Acciones</TableHead>}
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
                            <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize">
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Date(user.created_at || '').toLocaleDateString()}
                          </TableCell>
                          {isAdmin && (
                            <TableCell>
                              <UserRoleSwitcher 
                                userId={user.id}
                                currentRole={user.role}
                                onRoleChange={handleRoleChange}
                              />
                            </TableCell>
                          )}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={isAdmin ? 4 : 3} className="text-center h-24">
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
      </div>
    </AppLayout>
  );
};

export default Users;
