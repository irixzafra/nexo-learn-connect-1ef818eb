
import React, { useEffect, useState } from "react";
import SectionPageLayout, { PageSection } from '@/layouts/SectionPageLayout';
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
import { UserManagementTabs } from "@/features/users/UserManagementTabs";
import { UserStats } from "@/features/users/UserStats";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { UserRoleSwitcher } from "@/components/admin/UserRoleSwitcher";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search, Filter, RefreshCw, UserPlus } from "lucide-react";
import { UserRoleType } from '@/features/users/UserRoleType';

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

  const isAdmin = userRole === 'admin';

  return (
    <SectionPageLayout
      header={{
        title: "Gestión de Usuarios",
        description: "Administra los usuarios de la plataforma",
        breadcrumbs: [
          { title: "Admin", href: "/admin" },
          { title: "Usuarios" }
        ],
        actions: [
          {
            label: "Actualizar",
            icon: <RefreshCw className={isLoading ? "animate-spin" : ""} />,
            onClick: fetchUsers,
            variant: "outline"
          },
          {
            label: "Nuevo Usuario",
            icon: <UserPlus />,
            onClick: () => console.log("Crear nuevo usuario")
          }
        ]
      }}
      stats={{
        stats: [
          {
            label: "Usuarios Totales",
            value: totalUsers,
            icon: <UserPlus className="h-5 w-5" />,
            color: "primary"
          },
          {
            label: "Usuarios Activos",
            value: activeUsers,
            descriptor: `${Math.round((activeUsers / totalUsers) * 100)}% del total`,
            icon: <Users className="h-5 w-5" />,
            color: "success"
          },
          {
            label: "Nuevos Usuarios",
            value: newUsers,
            descriptor: "Últimos 30 días",
            icon: <UserPlus className="h-5 w-5" />,
            color: "primary"
          },
          {
            label: "Usuarios Inactivos",
            value: inactiveUsers,
            descriptor: `${Math.round((inactiveUsers / totalUsers) * 100)}% del total`,
            icon: <Users className="h-5 w-5" />,
            color: "warning"
          }
        ]
      }}
      filters={{
        searchPlaceholder: "Buscar usuarios...",
        searchValue: searchTerm,
        onSearchChange: setSearchTerm,
        filterOptions: []
      }}
      help={{
        title: "Gestión de Usuarios",
        description: "Recursos para administrar usuarios y roles",
        links: [
          {
            title: "Gestión de roles",
            description: "Aprende a configurar roles y permisos",
            href: "/admin/roles"
          },
          {
            title: "Centro de ayuda",
            description: "Soporte para problemas con usuarios",
            href: "/help",
            external: true
          }
        ]
      }}
    >
      <UserManagementTabs isAdmin={isAdmin} />
      
      <PageSection variant="card" className="mt-6" contentClassName="p-0">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-medium">Lista de Usuarios</h3>
              <p className="text-sm text-muted-foreground">
                Gestiona los usuarios de la plataforma y sus roles
              </p>
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
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        ) : (
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
                      <UserRoleType role={user.role} showIcon={true} />
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
        )}
      </PageSection>
    </SectionPageLayout>
  );
};

export default Users;
