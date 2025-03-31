
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserCircle, MoreHorizontal, Search, UserPlus, UserCheck, UserX, Filter } from 'lucide-react';

// Mock data for demonstration
const USERS_DATA = [
  { id: 1, name: 'Carlos Rodriguez', email: 'carlos@example.com', role: 'admin', status: 'active', lastLogin: '2023-05-15' },
  { id: 2, name: 'Maria Lopez', email: 'maria@example.com', role: 'instructor', status: 'active', lastLogin: '2023-05-10' },
  { id: 3, name: 'Juan García', email: 'juan@example.com', role: 'student', status: 'inactive', lastLogin: '2023-04-28' },
  { id: 4, name: 'Ana Martinez', email: 'ana@example.com', role: 'student', status: 'active', lastLogin: '2023-05-12' },
  { id: 5, name: 'Pedro Sanchez', email: 'pedro@example.com', role: 'student', status: 'active', lastLogin: '2023-05-14' },
];

export const UsersListTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(USERS_DATA);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredUsers(USERS_DATA);
    } else {
      const filtered = USERS_DATA.filter(user => 
        user.name.toLowerCase().includes(term.toLowerCase()) || 
        user.email.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge variant="success">Activo</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactivo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'admin':
        return <Badge className="bg-blue-600">Administrador</Badge>;
      case 'instructor':
        return <Badge className="bg-green-500">Instructor</Badge>;
      case 'student':
        return <Badge className="bg-purple-500">Estudiante</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };
  
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <UserCircle className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No se encontraron usuarios</h3>
      <p className="text-muted-foreground mb-4 max-w-sm">
        No hay usuarios que coincidan con tu búsqueda. Intenta con otros términos o crea un nuevo usuario.
      </p>
      <Button>
        <UserPlus className="mr-2 h-4 w-4" />
        Añadir Usuario
      </Button>
    </div>
  );
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-2 w-full max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Añadir Usuario
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Usuarios</CardTitle>
          <CardDescription>
            Gestiona usuarios, asigna roles y controla permisos.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {filteredUsers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Último Acceso</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <UserCheck className="mr-2 h-4 w-4" />
                            <span>Editar Usuario</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserCheck className="mr-2 h-4 w-4" />
                            <span>Cambiar Rol</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <UserX className="mr-2 h-4 w-4" />
                            <span>Desactivar</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState />
          )}
        </CardContent>
        <CardFooter className="flex justify-between py-3">
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredUsers.length} de {USERS_DATA.length} usuarios
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
