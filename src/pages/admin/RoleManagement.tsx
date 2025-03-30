import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { UserProfile, UserRole } from '@/types/auth';
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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { UserRoleSwitcher } from "@/components/admin/UserRoleSwitcher";

const RoleManagement: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
        setFilteredUsers(data as UserProfile[]);
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

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }
    
    const filtered = users.filter(user => 
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

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
      
      setFilteredUsers(prevUsers => 
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

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return "bg-red-100 text-red-800 hover:bg-red-100/80";
      case 'instructor':
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
      case 'sistemas':
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100/80";
      case 'student':
        return "bg-green-100 text-green-800 hover:bg-green-100/80";
      case 'anonimo':
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Roles</CardTitle>
        <CardDescription>
          Administra los roles y permisos de los usuarios de la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Buscar por nombre o rol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Rol Actual</TableHead>
                  <TableHead>Cambiar Rol</TableHead>
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
                        <Badge variant="outline" className={getRoleBadgeColor(user.role as UserRole)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <UserRoleSwitcher 
                          userId={user.id}
                          currentRole={user.role as UserRole}
                          onRoleChange={handleRoleChange}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center h-24">
                      No se encontraron usuarios con los criterios de búsqueda
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
};

export default function RoleManagementPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gestión de Roles y Permisos</h1>
      <RoleManagement />
    </div>
  );
}
