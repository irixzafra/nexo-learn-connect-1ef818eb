
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Search, Plus, Edit, Trash2, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: string;
}

const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  const { data: users, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
      
      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        throw profilesError;
      }
      
      return profilesData as User[];
    },
  });
  
  const filteredUsers = users?.filter(user => {
    const matchesSearchTerm = 
      (user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) || 
      (user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearchTerm && matchesRole;
  });
  
  const getAvatarText = (user: User) => {
    if (user.full_name) {
      return user.full_name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
    }
    return user.email ? user.email[0].toUpperCase() : 'U';
  };

  return (
    <AdminPageLayout
      title="Gestión de Usuarios"
      subtitle="Administra y gestiona los usuarios de la plataforma"
    >
      <Tabs defaultValue="all">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="all">Todos los usuarios</TabsTrigger>
            <TabsTrigger value="students">Estudiantes</TabsTrigger>
            <TabsTrigger value="instructors">Instructores</TabsTrigger>
            <TabsTrigger value="admins">Administradores</TabsTrigger>
          </TabsList>
          <Button>
            <Plus className="h-4 w-4 mr-1" />
            Añadir Usuario
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Usuarios</CardTitle>
            <CardDescription>
              Gestiona los usuarios registrados en la plataforma
            </CardDescription>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar usuarios..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={roleFilter}
                onValueChange={setRoleFilter}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filtrar por rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los roles</SelectItem>
                  <SelectItem value="student">Estudiantes</SelectItem>
                  <SelectItem value="instructor">Instructores</SelectItem>
                  <SelectItem value="admin">Administradores</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <TabsContent value="all" className="mt-0">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : !filteredUsers?.length ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchTerm || roleFilter !== 'all' ? (
                    <p>No se encontraron usuarios con los criterios de búsqueda actuales.</p>
                  ) : (
                    <p>No hay usuarios registrados en la plataforma.</p>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Fecha de registro</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar>
                                <AvatarImage src="/placeholder.svg" alt={user.full_name || user.email} />
                                <AvatarFallback>{getAvatarText(user)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.full_name || 'Sin nombre'}</p>
                                <p className="text-xs text-muted-foreground">ID: {user.id.slice(0, 8)}...</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            {user.role === 'admin' ? (
                              <Badge className="bg-purple-600">Administrador</Badge>
                            ) : user.role === 'instructor' ? (
                              <Badge className="bg-blue-600">Instructor</Badge>
                            ) : (
                              <Badge variant="outline">Estudiante</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {new Date(user.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" title="Ver perfil">
                                <User className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Editar">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-destructive" title="Eliminar">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
            
            {/* The other tabs would filter the same data by role */}
            <TabsContent value="students" className="mt-0">
              {/* Same table but filtered for students only */}
              <p className="text-center text-muted-foreground py-4">
                Los usuarios con rol 'student' se mostrarían aquí
              </p>
            </TabsContent>
            
            <TabsContent value="instructors" className="mt-0">
              {/* Same table but filtered for instructors only */}
              <p className="text-center text-muted-foreground py-4">
                Los usuarios con rol 'instructor' se mostrarían aquí
              </p>
            </TabsContent>
            
            <TabsContent value="admins" className="mt-0">
              {/* Same table but filtered for admins only */}
              <p className="text-center text-muted-foreground py-4">
                Los usuarios con rol 'admin' se mostrarían aquí
              </p>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </AdminPageLayout>
  );
};

export default AdminUsers;
