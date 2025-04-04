
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  Eye, Edit, Trash2, PlusCircle, Search, MoreHorizontal, Check, X, Clock, BarChart 
} from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const mockCourses = [
  {
    id: '1',
    title: 'Introducción a React',
    instructor: 'Carlos Rodríguez',
    category: 'Desarrollo Web',
    students: 456,
    rating: 4.8,
    status: 'published',
    price: 49.99,
    created: '12/04/2023',
  },
  {
    id: '2',
    title: 'Diseño UX Avanzado',
    instructor: 'Laura González',
    category: 'Diseño',
    students: 328,
    rating: 4.6,
    status: 'published',
    price: 59.99,
    created: '23/05/2023',
  },
  {
    id: '3',
    title: 'Node.js para Principiantes',
    instructor: 'Miguel Sánchez',
    category: 'Desarrollo Backend',
    students: 215,
    rating: 4.3,
    status: 'published',
    price: 39.99,
    created: '15/06/2023',
  },
  {
    id: '4',
    title: 'Inteligencia Artificial con Python',
    instructor: 'Ana Martínez',
    category: 'Ciencia de Datos',
    students: 0,
    rating: 0,
    status: 'draft',
    price: 69.99,
    created: '02/07/2023',
  },
  {
    id: '5',
    title: 'Flutter: Aplicaciones Móviles',
    instructor: 'Juan López',
    category: 'Desarrollo Móvil',
    students: 0,
    rating: 0,
    status: 'review',
    price: 54.99,
    created: '18/07/2023',
  },
];

const AdminCourses: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('all');
  
  const filteredCourses = React.useMemo(() => {
    return mockCourses.filter(course => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesTab = 
        activeTab === 'all' || 
        (activeTab === 'published' && course.status === 'published') ||
        (activeTab === 'draft' && course.status === 'draft') ||
        (activeTab === 'review' && course.status === 'review');
        
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab, mockCourses]);
  
  // Status badge helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            <Check className="mr-1 h-3 w-3" /> Publicado
          </Badge>
        );
      case 'draft':
        return (
          <Badge variant="outline" className="border-gray-500 text-gray-500">
            <Clock className="mr-1 h-3 w-3" /> Borrador
          </Badge>
        );
      case 'review':
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-500">
            <Eye className="mr-1 h-3 w-3" /> En revisión
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
          <h1 className="text-3xl font-bold tracking-tight">Cursos</h1>
          <p className="text-muted-foreground">Gestiona los cursos de la plataforma</p>
        </div>
        <Button className="sm:self-end">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Curso
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar cursos..."
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
              <TabsTrigger value="published">Publicados</TabsTrigger>
              <TabsTrigger value="draft">Borradores</TabsTrigger>
              <TabsTrigger value="review">En Revisión</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all"></TabsContent>
            <TabsContent value="published"></TabsContent>
            <TabsContent value="draft"></TabsContent>
            <TabsContent value="review"></TabsContent>
          </Tabs>
        </CardHeader>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Curso</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Estudiantes</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-muted-foreground">{course.category}</div>
                    </TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>{getStatusBadge(course.status)}</TableCell>
                    <TableCell>${course.price}</TableCell>
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
                            <span>Editar curso</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BarChart className="mr-2 h-4 w-4" />
                            <span>Ver estadísticas</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Eliminar curso</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No se encontraron cursos
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

export default AdminCourses;
