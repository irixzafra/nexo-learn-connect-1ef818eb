
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Eye, Edit, Trash2, UserPlus, Search, MoreHorizontal, Check, X, Shield 
} from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const mockUsers = [
  {
    id: '1',
    name: 'Carlos Rodríguez',
    email: 'carlos@ejemplo.com',
    role: 'admin',
    status: 'active',
    joined: '12/04/2023',
  },
  {
    id: '2',
    name: 'Laura González',
    email: 'laura@ejemplo.com',
    role: 'instructor',
    status: 'active',
    joined: '23/05/2023',
  },
  {
    id: '3',
    name: 'Miguel Sánchez',
    email: 'miguel@ejemplo.com',
    role: 'student',
    status: 'active',
    joined: '15/06/2023',
  },
  {
    id: '4',
    name: 'Ana Martínez',
    email: 'ana@ejemplo.com',
    role: 'student',
    status: 'suspended',
    joined: '02/07/2023',
  },
  {
    id: '5',
    name: 'Juan López',
    email: 'juan@ejemplo.com',
    role: 'instructor',
    status: 'pending',
    joined: '18/07/2023',
  },
];

const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('all');
  
  const filteredUsers = React.useMemo(() => {
    return mockUsers.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesTab = 
        activeTab === 'all' || 
        (activeTab === 'active' && user.status === 'active') ||
        (activeTab === 'pending' && user.status === 'pending') ||
        (activeTab === 'suspended' && user.status === 'suspended') ||
        (activeTab === 'admin' && user.role === 'admin') ||
        (activeTab === 'instructor' && user.role === 'instructor') ||
        (activeTab === 'student' && user.role === 'student');
        
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab, mockUsers]);
  
  // Role badge helper
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-500 hover:bg-red-600">Admin</Badge>;
      case 'instructor':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Instructor</Badge>;
      case 'student':
        return <Badge className="bg-green-500 hover:bg-green-600">Estudiante</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };
  
  // Status badge helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            <Check className="mr-1 h-3 w-3" /> Activo
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            <Clock className="mr-1 h-3 w-3" /> Pendiente
          </Badge>
        );
      case 'suspended':
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            <X className="mr-1 h-3 w-3" /> Suspendido
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
          <p className="text-muted-foreground">Gestiona los usuarios de la plataforma</p>
        </div>
        <Button className="sm:self-end">
          <UserPlus className="mr-2 h-4 w-4" />
          Nuevo Usuario
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
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
      </div>
      
      <Card>
        <CardHeader className="p-4 pb-0">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-2">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="active">Activos</TabsTrigger>
              <TabsTrigger value="pending">Pendientes</TabsTrigger>
              <TabsTrigger value="suspended">Suspendidos</TabsTrigger>
              <TabsTrigger value="admin">Admins</TabsTrigger>
              <TabsTrigger value="instructor">Instructores</TabsTrigger>
              <TabsTrigger value="student">Estudiantes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all"></TabsContent>
            <TabsContent value="active"></TabsContent>
            <TabsContent value="pending"></TabsContent>
            <TabsContent value="suspended"></TabsContent>
            <TabsContent value="admin"></TabsContent>
            <TabsContent value="instructor"></TabsContent>
            <TabsContent value="student"></TabsContent>
          </Tabs>
        </CardHeader>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha de Registro</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menú</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Ver detalles</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar usuario</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            <span>Cambiar permisos</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Eliminar usuario</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No se encontraron usuarios
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
