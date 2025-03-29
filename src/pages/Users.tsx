
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
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userRole } = useAuth();
  
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
          return;
        }
        
        setUsers(data as UserProfile[]);
      } catch (error) {
        console.error('Error in fetchUsers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Usuarios</h1>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>
            {userRole === 'admin' 
              ? "Administra todos los usuarios de la plataforma" 
              : "Usuarios registrados en la plataforma"}
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center h-24">
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
  );
};

export default Users;
