
import React, { useState, useEffect } from 'react';
import SectionPageLayout, { PageSection } from '@/layouts/SectionPageLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, RefreshCw, Pencil, Eye, BookOpen, School } from 'lucide-react';

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
        course.title.toLowerCase().includes(searchTerm.toLowerCase()));
        
  const handleCourseClick = (courseId: string) => {
    navigate(`/admin/courses/${courseId}`);
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
      filters={{
        searchPlaceholder: "Buscar cursos...",
        searchValue: searchTerm,
        onSearchChange: setSearchTerm,
        filterOptions: []
      }}
      help={{
        title: "Gestión de Cursos",
        description: "Herramientas para administrar el contenido educativo",
        links: [
          {
            title: "Documentación de cursos",
            description: "Aprende a gestionar cursos",
            href: "/docs/admin/courses"
          },
          {
            title: "Centro de ayuda",
            description: "Contacta con soporte para ayuda",
            href: "/help",
            external: true
          }
        ]
      }}
    >
      <Tabs defaultValue="all-courses" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full sm:w-auto">
          <TabsTrigger value="all-courses" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Todos los Cursos</span>
          </TabsTrigger>
          <TabsTrigger value="published" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Publicados</span>
          </TabsTrigger>
          <TabsTrigger value="instructors" className="flex items-center gap-2">
            <School className="h-4 w-4" />
            <span className="hidden sm:inline">Por Instructor</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-courses">
          <PageSection variant="card" contentClassName="p-0">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[150px]">Título</TableHead>
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
                            <Badge variant={course.is_published ? "default" : "secondary"}>
                              {course.is_published ? 'Publicado' : 'Borrador'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {course.price ? `${course.price} ${course.currency.toUpperCase()}` : 'Gratis'}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleCourseClick(course.id)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
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
          </PageSection>
        </TabsContent>
        
        <TabsContent value="published">
          <PageSection variant="card">
            <div className="text-center py-10">
              <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Vista de Cursos Publicados</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Esta vista filtrada mostrará únicamente los cursos que están publicados y disponibles para los estudiantes.
              </p>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Cargar Cursos Publicados
              </Button>
            </div>
          </PageSection>
        </TabsContent>
        
        <TabsContent value="instructors">
          <PageSection variant="card">
            <div className="text-center py-10">
              <School className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Vista por Instructores</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Aquí podrás ver los cursos agrupados por instructor para facilitar la gestión por creador de contenido.
              </p>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Ver Agrupación por Instructores
              </Button>
            </div>
          </PageSection>
        </TabsContent>
      </Tabs>
    </SectionPageLayout>
  );
};

export default AdminCourses;
