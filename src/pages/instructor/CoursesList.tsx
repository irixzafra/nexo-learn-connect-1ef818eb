
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Course } from '@/types/course';
import { 
  Eye, Edit, MoreHorizontal, Plus, Search, Trash2, 
  Users, Clock, BookOpen, FileEdit, BookCopy, BarChart 
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

const CoursesList: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  
  const { data: courses, isLoading, refetch } = useQuery({
    queryKey: ['instructorCourses', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          modules(count),
          instructor:instructor_id(*)
        `)
        .eq('instructor_id', user?.id)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data as Course[];
    },
    enabled: !!user?.id
  });
  
  const filteredCourses = courses?.filter(course => {
    // Filter by search term
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by tab
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'published') return matchesSearch && course.is_published;
    if (activeTab === 'drafts') return matchesSearch && !course.is_published;
    
    return matchesSearch;
  });
  
  const handleDeleteCourse = async () => {
    if (!courseToDelete) return;
    
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseToDelete.id);
      
      if (error) throw error;
      
      // Refresh courses list
      await refetch();
      
      // Reset state
      setCourseToDelete(null);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };
  
  const createNewCourse = () => {
    navigate('/app/profesor/courses/create');
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mis Cursos</h1>
          <p className="text-muted-foreground mt-1">
            Gestiona, crea y edita tus cursos
          </p>
        </div>
        <Button onClick={createNewCourse}>
          <Plus className="h-4 w-4 mr-2" />
          Crear nuevo curso
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
        <div className="relative w-full sm:w-auto sm:flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cursos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="published">Publicados</TabsTrigger>
            <TabsTrigger value="drafts">Borradores</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-4/5 mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredCourses?.length === 0 ? (
        <Card className="text-center p-12">
          <CardHeader>
            <CardTitle>No hay cursos</CardTitle>
            <CardDescription>
              {searchTerm ? (
                `No se encontraron cursos que coincidan con "${searchTerm}"`
              ) : activeTab === 'drafts' ? (
                'No tienes cursos en borrador'
              ) : activeTab === 'published' ? (
                'No tienes cursos publicados'
              ) : (
                'Aún no has creado ningún curso'
              )}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pt-4">
            <Button onClick={createNewCourse}>
              <Plus className="h-4 w-4 mr-2" />
              Crear tu primer curso
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses?.map((course) => (
            <Card key={course.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="line-clamp-1 text-lg">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-1">
                      {course.description}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate(`/app/profesor/courses/${course.id}/edit`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar curso
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/app/profesor/courses/${course.id}/structure`)}>
                        <BookCopy className="h-4 w-4 mr-2" />
                        Editar estructura
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/app/profesor/courses/${course.id}/editor`)}>
                        <FileEdit className="h-4 w-4 mr-2" />
                        Editor de contenido
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.open(`/courses/${course.slug || course.id}`, '_blank')}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver curso
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setCourseToDelete(course)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar curso
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="relative aspect-video overflow-hidden rounded-md mb-4 bg-gray-100">
                  <img
                    src={course.cover_image_url || '/placeholder-course.jpg'}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={course.is_published ? 'default' : 'outline'}>
                      {course.is_published ? 'Publicado' : 'Borrador'}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{course.student_count || 0} estudiantes</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{course.modules?.[0]?.count || 0} módulos</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      {format(new Date(course.updated_at), 'dd MMM', { locale: es })}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate(`/app/profesor/courses/${course.id}/analytics`)}
                >
                  <BarChart className="h-4 w-4 mr-2" />
                  Analíticas
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate(`/app/profesor/courses/${course.id}/edit`)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!courseToDelete} onOpenChange={(open) => !open && setCourseToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar este curso? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          
          {courseToDelete && (
            <div className="flex items-center gap-3 py-2">
              <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                <img 
                  src={courseToDelete.cover_image_url || '/placeholder-course.jpg'} 
                  alt={courseToDelete.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{courseToDelete.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {courseToDelete.is_published ? 'Publicado' : 'Borrador'} • 
                  {courseToDelete.student_count || 0} estudiantes
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={handleDeleteCourse}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoursesList;
