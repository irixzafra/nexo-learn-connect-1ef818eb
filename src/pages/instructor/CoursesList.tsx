
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Plus, Edit, Eye, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: 'eur' | 'usd';
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const CoursesList: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

  const fetchCourses = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('instructor_id', user?.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setCourses(data as Course[]);
    } catch (error: any) {
      console.error('Error fetching courses:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los cursos. ' + error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCourse = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este curso? Esta acción no se puede deshacer.')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      setCourses(courses.filter(course => course.id !== id));
      
      toast({
        title: 'Curso eliminado',
        description: 'El curso ha sido eliminado exitosamente',
      });
    } catch (error: any) {
      console.error('Error deleting course:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el curso. ' + error.message,
        variant: 'destructive',
      });
    }
  };

  const formatCurrency = (price: number, currency: 'eur' | 'usd') => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  // Filtrar cursos según la pestaña activa
  const filteredCourses = courses.filter(course => {
    if (activeTab === 'published') return course.is_published;
    if (activeTab === 'draft') return !course.is_published;
    return true; // 'all'
  });

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Mis Cursos</h1>
          <Button onClick={() => navigate('/instructor/courses/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Curso
          </Button>
        </div>

        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="published">Publicados</TabsTrigger>
            <TabsTrigger value="draft">Borradores</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredCourses.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <p className="text-muted-foreground mb-4">No tienes cursos {activeTab !== 'all' ? `en estado "${activeTab}"` : ''}</p>
              <Button onClick={() => navigate('/instructor/courses/new')}>
                <Plus className="mr-2 h-4 w-4" />
                Crear mi primer curso
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {formatDate(course.created_at)}
                      </CardDescription>
                    </div>
                    <Badge variant={course.is_published ? 'default' : 'secondary'}>
                      {course.is_published ? 'Publicado' : 'Borrador'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {course.description || 'Sin descripción'}
                  </p>
                  <p className="font-medium">
                    {course.price > 0 
                      ? formatCurrency(course.price, course.currency) 
                      : 'Gratis'}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/courses/${course.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver
                    </Link>
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/instructor/courses/${course.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteCourse(course.id)}
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CoursesList;
