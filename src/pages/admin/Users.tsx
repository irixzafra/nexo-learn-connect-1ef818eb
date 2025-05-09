
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { UserProfile, UserRoleType, toUserRoleType } from "@/types/auth";
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
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { UserRoleSwitcher } from "@/components/admin/UserRoleSwitcher";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/AppLayout";

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdminTools, setShowAdminTools] = useState(false);
  const { userRole, user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
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
    
    fetchUsers();
  }, [toast]);

  const grantAdminRole = async () => {
    try {
      setIsLoading(true);
      const adminEmail = "admin@nexo.com";
      
      const { data: userData, error: userError } = await supabase
        .from('auth')
        .select('id')
        .eq('email', adminEmail)
        .single();
        
      if (userError) {
        console.error('Error finding user by email:', userError);
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('full_name', 'Admin')
          .or('full_name.eq.admin@nexo.com,full_name.ilike.%admin%');
          
        if (updateError) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "No se pudo actualizar el rol del administrador.",
          });
          return;
        }
        
        toast({
          title: "Operación completada",
          description: "Se ha intentado actualizar el rol de admin@nexo.com a administrador.",
        });
      } else {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('id', userData.id);
          
        if (updateError) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "No se pudo actualizar el rol del administrador.",
          });
          return;
        }
        
        toast({
          title: "Éxito",
          description: "Se ha actualizado el rol de admin@nexo.com a administrador.",
        });
      }
      
      const { data: updatedUsers, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && updatedUsers) {
        setUsers(updatedUsers as UserProfile[]);
      }
      
    } catch (error) {
      console.error('Error in grantAdminRole:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error al actualizar el rol.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRoleType) => {
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

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return "bg-red-100 text-red-800 hover:bg-red-100/80";
      case 'instructor':
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
      case 'student':
        return "bg-green-100 text-green-800 hover:bg-green-100/80";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (toUserRoleType(userRole as string) === 'admin') {
      grantAdminRole();
    }
  }, []);

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Usuarios</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Lista de Usuarios</CardTitle>
            <CardDescription>
              {toUserRoleType(userRole as string) === 'admin' 
                ? "Administra todos los usuarios de la plataforma" 
                : "Usuarios registrados en la plataforma"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {toUserRoleType(userRole as string) === 'admin' && (
              <div className="flex items-center space-x-2 mb-4">
                <Switch 
                  id="adminTools" 
                  checked={showAdminTools}
                  onCheckedChange={setShowAdminTools}
                />
                <Label htmlFor="adminTools">Mostrar herramientas de administración</Label>
              </div>
            )}
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Fecha de registro</TableHead>
                    {toUserRoleType(userRole as string) === 'admin' && <TableHead>Acciones</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.full_name || 'Usuario sin nombre'}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.created_at || '').toLocaleDateString()}
                        </TableCell>
                        {toUserRoleType(userRole as string) === 'admin' && (
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
                      <TableCell colSpan={toUserRoleType(userRole as string) === 'admin' ? 4 : 3} className="text-center h-24">
                        No hay usuarios para mostrar
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Users;
