
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AppLayout from '@/layouts/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, BookOpen, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback';

type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: 'eur' | 'usd';
  instructor_id: string;
  created_at: string;
  featured_instructor: string;
  cover_image_url?: string;
  level?: string;
  duration_text?: string;
};

const CoursesCatalog: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Fetching courses...");
      
      // Evitamos usar la conexión del src/lib/supabase.ts y usamos la de integrations directamente
      const { data, error: supabaseError } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error("Error en la consulta a Supabase:", supabaseError);
        throw supabaseError;
      }
      
      console.log("Cursos obtenidos:", data);
      setCourses(data || []);
    } catch (error: any) {
      console.error('Error al cargar los cursos:', error);
      setError('No se pudieron cargar los cursos. Por favor, inténtelo de nuevo más tarde.');
      toast.error('Error al cargar los cursos. Por favor, inténtelo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (price: number, currency: 'eur' | 'usd') => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price);
  };

  const filteredCourses = courses.filter((course) => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Catálogo de Cursos</h1>
            <p className="text-muted-foreground">
              Explora nuestros cursos y comienza a aprender hoy mismo
            </p>
          </div>
          <div className="relative mt-4 md:mt-0 md:w-[300px]">
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

        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
          {error && (
            <Card className="mb-6 border-destructive bg-destructive/5">
              <CardContent className="flex items-center gap-3 py-4">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                <p className="text-destructive">{error}</p>
              </CardContent>
              <CardFooter className="border-t pt-4 bg-background/50">
                <Button variant="outline" onClick={() => fetchCourses()}>
                  Intentar de nuevo
                </Button>
              </CardFooter>
            </Card>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !error && filteredCourses.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                {searchTerm ? (
                  <>
                    <p className="text-muted-foreground mb-4">
                      No se encontraron cursos que coincidan con "{searchTerm}"
                    </p>
                    <Button variant="outline" onClick={() => setSearchTerm('')}>
                      Mostrar todos los cursos
                    </Button>
                  </>
                ) : (
                  <p className="text-muted-foreground">
                    No hay cursos disponibles en este momento
                  </p>
                )}
              </CardContent>
            </Card>
          ) : !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="flex flex-col h-full transition-all hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                    <CardDescription>
                      Por {course.featured_instructor || 'Instructor'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground line-clamp-3 mb-4">
                      {course.description || 'Sin descripción disponible'}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="text-base font-semibold">
                        {course.price > 0 
                          ? formatCurrency(course.price, course.currency) 
                          : 'Gratis'}
                      </Badge>
                      {course.level && (
                        <Badge variant="secondary" className="text-xs">
                          {course.level}
                        </Badge>
                      )}
                      {course.duration_text && (
                        <Badge variant="secondary" className="text-xs">
                          {course.duration_text}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link to={`/courses/${course.id}`}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Ver Curso
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </ErrorBoundary>
      </div>
    </AppLayout>
  );
};

export default CoursesCatalog;
