
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SectionPageLayout from '@/layouts/SectionPageLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, RefreshCw, Pencil, Eye, BookOpen, School, Filter, ChevronDown, Search, ArrowUpDown, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

const AdminCourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    fetchCourses();
  }, []);
  
  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          profiles:instructor_id (
            full_name
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching courses:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se pudieron cargar los cursos.",
        });
        return;
      }
      
      setCourses(data || []);
    } catch (error) {
      console.error('Error in fetchCourses:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un problema al obtener los cursos.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const filteredCourses = searchTerm.trim() === ''
    ? courses
    : courses.filter(course => 
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        course.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()));
        
  const handleCourseClick = (courseId: string) => {
    navigate(`/admin/courses/${courseId}`);
  };
  
  // Este es un componente de estado de curso reutilizable
  const CourseStatusBadge = ({ status }: { status: string | boolean }) => {
    if (typeof status === 'boolean') {
      return status ? 
        <Badge className="bg-green-500">Publicado</Badge> : 
        <Badge variant="outline">Borrador</Badge>;
    }
    
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500">Publicado</Badge>;
      case 'draft':
        return <Badge variant="outline">Borrador</Badge>;
      case 'review':
        return <Badge variant="secondary">En Revisión</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <SectionPageLayout
      header={{
        title: "Gestión de Cursos",
        description: "Administra todos los cursos de la plataforma",
        breadcrumbs: [
          { title: "Admin", href: "/admin" },
          { title: "Cursos" }
        ],
        actions: [
          {
            label: "Actualizar",
            icon: <RefreshCw className={isLoading ? "animate-spin" : ""} />,
            onClick: fetchCourses,
            variant: "outline"
          },
          {
            label: "Nuevo Curso",
            icon: <Plus />,
            onClick: () => navigate('/admin/courses/create')
          }
        ]
      }}
      stats={{
        stats: [
          {
            label: "Cursos Totales",
            value: courses.length.toString(),
            icon: <BookOpen className="h-5 w-5" />,
            color: "primary",
            loading: isLoading
          },
          {
            label: "Cursos Publicados",
            value: courses.filter(c => c.is_published).length.toString(),
            icon: <Eye className="h-5 w-5" />,
            color: "success",
            loading: isLoading
          },
          {
            label: "Instructores",
            value: new Set(courses.map(c => c.instructor_id).filter(Boolean)).size.toString(),
            icon: <School className="h-5 w-5" />,
            color: "warning",
            loading: isLoading
          }
        ]
      }}
    >
      <Tabs defaultValue="all-courses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all-courses">Todos los Cursos</TabsTrigger>
          <TabsTrigger value="published">Publicados</TabsTrigger>
          <TabsTrigger value="drafts">Borradores</TabsTrigger>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-courses" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between md:items-center">
                <div>
                  <CardTitle>Lista de Cursos</CardTitle>
                  <CardDescription>
                    Visualiza y gestiona todos los cursos de la plataforma
                  </CardDescription>
                </div>
                <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar cursos..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-1">
                        <Filter className="h-4 w-4" />
                        Filtrar
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <input type="checkbox" className="mr-2" /> Programación
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <input type="checkbox" className="mr-2" /> Diseño
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <input type="checkbox" className="mr-2" /> Marketing
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <input type="checkbox" className="mr-2" /> Publicados
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <input type="checkbox" className="mr-2" /> Borradores
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Button variant="outline" size="sm" className="w-full">Aplicar</Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                        <TableHead className="min-w-[200px]">
                          <div className="flex items-center space-x-1">
                            <span>Título</span>
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Precio</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                          <TableRow key={course.id}>
                            <TableCell className="font-medium">{course.title}</TableCell>
                            <TableCell>{course.profiles?.full_name || 'Sin instructor'}</TableCell>
                            <TableCell>{course.category || '-'}</TableCell>
                            <TableCell>
                              <CourseStatusBadge status={course.is_published} />
                            </TableCell>
                            <TableCell className="text-right">
                              {course.price ? `${course.price} ${course.currency?.toUpperCase() || 'EUR'}` : 'Gratis'}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleCourseClick(course.id)}
                                  title="Editar curso"
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => window.open(`/courses/${course.id}`, '_blank')}
                                  title="Ver curso"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  title="Eliminar curso"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center h-24">
                            {searchTerm.trim() !== "" 
                              ? "No se encontraron cursos que coincidan con la búsqueda." 
                              : "No hay cursos para mostrar."}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="published" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cursos Publicados</CardTitle>
              <CardDescription>Todos los cursos disponibles para los estudiantes</CardDescription>
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
                      <TableHead>Título</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses
                      .filter(course => course.is_published)
                      .map(course => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.title}</TableCell>
                          <TableCell>{course.profiles?.full_name || 'Sin instructor'}</TableCell>
                          <TableCell>{course.category || '-'}</TableCell>
                          <TableCell>
                            {course.price ? `${course.price} ${course.currency?.toUpperCase() || 'EUR'}` : 'Gratis'}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleCourseClick(course.id)}>Editar</Button>
                              <Button variant="ghost" size="sm" onClick={() => window.open(`/courses/${course.id}`, '_blank')}>Ver</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="drafts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Borradores</CardTitle>
              <CardDescription>Cursos en etapa de creación o revisión</CardDescription>
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
                      <TableHead>Título</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Última Actualización</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses
                      .filter(course => !course.is_published)
                      .map(course => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.title}</TableCell>
                          <TableCell>{course.profiles?.full_name || 'Sin instructor'}</TableCell>
                          <TableCell>
                            {new Date(course.updated_at || course.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleCourseClick(course.id)}>Editar</Button>
                              <Button variant="ghost" size="sm">Publicar</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Categorías de Cursos</CardTitle>
              <CardDescription>Gestiona las categorías para organizar los cursos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button>Nueva Categoría</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Cursos</TableHead>
                    <TableHead>Orden de Visualización</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Programación</TableCell>
                    <TableCell>{courses.filter(c => c.category === 'Programación').length}</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button variant="ghost" size="sm">Eliminar</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Diseño</TableCell>
                    <TableCell>{courses.filter(c => c.category === 'Diseño').length}</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Editar</Button>
                        <Button variant="ghost" size="sm">Eliminar</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SectionPageLayout>
  );
};

export default AdminCourses;
