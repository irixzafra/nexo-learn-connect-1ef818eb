
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, BookOpen, Compass, Clock, TrendingUp, Filter } from 'lucide-react';
import { featuredCourses } from '@/features/courses/utils/featuredCoursesData';
import { useCoursesCatalog } from '@/features/courses/hooks/useCoursesCatalog';
import { CatalogHeader } from '@/features/courses/components/CatalogHeader';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const CoursesCatalog = () => {
  const { 
    filteredCourses, 
    isLoading, 
    error, 
    debugInfo, 
    searchTerm, 
    setSearchTerm, 
    selectedLevel, 
    setSelectedLevel, 
    clearFilters
  } = useCoursesCatalog();
  
  const [visibleCourses, setVisibleCourses] = useState(6);
  const [hasError, setHasError] = useState(false);

  // Reset visible courses when filters change
  useEffect(() => {
    setVisibleCourses(6);
  }, [searchTerm, selectedLevel]);

  // Set error state based on API response
  useEffect(() => {
    setHasError(!!error);
  }, [error]);

  // Load more courses when button is clicked
  const handleLoadMore = () => {
    setVisibleCourses(prev => prev + 6);
  };

  const coursesToShow = filteredCourses?.slice(0, visibleCourses) || [];
  const hasMoreCourses = filteredCourses && visibleCourses < filteredCourses.length;

  // Container animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-6">
      <div className="mb-8">
        <CatalogHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="flex-1 flex flex-wrap gap-2">
            <Button 
              variant={!selectedLevel ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedLevel(null)}
              className="flex items-center gap-2"
            >
              <Compass className="h-4 w-4" />
              Todos los niveles
            </Button>
            <Button 
              variant={selectedLevel === "principiante" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedLevel("principiante")}
            >
              Principiante
            </Button>
            <Button 
              variant={selectedLevel === "intermedio" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedLevel("intermedio")}
            >
              Intermedio
            </Button>
            <Button 
              variant={selectedLevel === "avanzado" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedLevel("avanzado")}
            >
              Avanzado
            </Button>
          </div>
          
          {(searchTerm || selectedLevel) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Limpiar filtros
            </Button>
          )}
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      ) : hasError ? (
        <Alert variant="destructive" className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error al cargar los cursos</AlertTitle>
          <AlertDescription>
            {error || "Error de recursión en políticas RLS. Por favor, contacte al administrador."}
          </AlertDescription>
          
          {debugInfo && (
            <div className="mt-6 text-sm">
              <h3 className="font-medium mb-2">Información de depuración:</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 my-2">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-700 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Detectado error de recursión RLS</p>
                    <p className="text-yellow-800">Revisar las políticas RLS de la tabla courses y la función get_user_role</p>
                  </div>
                </div>
              </div>
              
              <h3 className="font-medium my-2">Sugerencias de verificación:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Verificar que las políticas RLS estén correctamente configuradas</li>
                <li>Comprobar permisos de acceso para usuarios anónimos</li>
                <li>Revisar estructura de la tabla courses</li>
                <li>Verificar que existan cursos publicados en la base de datos</li>
                <li>Revisar que no haya recursión en las políticas RLS</li>
              </ul>
              
              <div className="bg-gray-100 rounded p-3 mt-4 font-mono text-xs overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </div>
            </div>
          )}
        </Alert>
      ) : filteredCourses?.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Compass className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">No se encontraron cursos</h3>
          <p className="text-muted-foreground mb-6">
            No hay cursos que coincidan con los criterios de búsqueda.
          </p>
          <Button onClick={clearFilters}>Ver todos los cursos</Button>
        </div>
      ) : (
        <>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {coursesToShow.map((course, index) => (
              <motion.div key={course.id} variants={item}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                  <div className="aspect-video w-full bg-gray-100 relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-5 flex flex-col h-[calc(100%-33.33%)]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                        {course.category}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {course.level}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <BookOpen className="h-3.5 w-3.5" />
                          <span>Por {course.instructor}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{course.hours} horas</span>
                        </div>
                      </div>
                      <Button size="sm" className="mt-2">Ver curso</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {hasMoreCourses && (
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={handleLoadMore}
                className="gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Cargar Más Cursos ({filteredCourses.length - visibleCourses} restantes)
              </Button>
            </div>
          )}
          
          <div className="mt-16 bg-gradient-to-r from-primary/10 to-accent/20 dark:from-primary/20 dark:to-accent/30 rounded-lg p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">¿No encuentras lo que buscas?</h2>
                <p className="text-muted-foreground max-w-lg">
                  Explora nuestras categorías temáticas o comunícate con nuestro equipo para obtener recomendaciones personalizadas.
                </p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline">Contactar asesor</Button>
                <Button>Ver categorías</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesCatalog;
