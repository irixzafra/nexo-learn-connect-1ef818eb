
import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Loader2, AlertCircle, RefreshCcw } from 'lucide-react';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback';
import { useCoursesCatalog } from '@/features/courses/hooks/useCoursesCatalog';
import { CourseFilters } from '@/features/courses/components/CourseFilters';
import { CatalogHeader } from '@/features/courses/components/CatalogHeader';
import { CourseCatalogError } from '@/features/courses/components/CourseCatalogError';
import { EmptyCourseState } from '@/features/courses/components/EmptyCourseState';
import { CoursesList } from '@/features/courses/components/CoursesList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CoursesCatalog: React.FC = () => {
  const {
    filteredCourses,
    courses,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedLevel,
    setSelectedLevel,
    clearFilters,
    fetchCourses
  } = useCoursesCatalog();

  const hasFilters = searchTerm !== '' || selectedLevel !== null;

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CatalogHeader 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />

        <CourseFilters 
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          onClearFilters={clearFilters}
        />

        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
          {error && (
            <CourseCatalogError error={error} onRetry={fetchCourses} />
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !error && filteredCourses.length === 0 ? (
            <>
              <EmptyCourseState 
                hasFilters={hasFilters} 
                onClearFilters={clearFilters} 
              />
              
              {/* Bloque de información de estado para debug - solo en desarrollo */}
              {process.env.NODE_ENV === 'development' && (
                <Card className="mt-8 bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Información de diagnóstico
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>Total de cursos cargados: {courses.length}</p>
                    <p>Cursos filtrados: {filteredCourses.length}</p>
                    <p>Estado de carga: {isLoading ? 'Cargando...' : 'Completado'}</p>
                    <p>Filtros activos: {hasFilters ? 'Sí' : 'No'}</p>
                    {searchTerm && <p>Término de búsqueda: "{searchTerm}"</p>}
                    {selectedLevel && <p>Nivel seleccionado: {selectedLevel}</p>}
                    
                    <div className="mt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={fetchCourses}
                        className="flex items-center gap-1"
                      >
                        <RefreshCcw className="h-3 w-3" />
                        Recargar cursos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : !error && (
            <>
              <CoursesList courses={filteredCourses} />
              
              {/* Contador de cursos - visible solo en desarrollo */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 text-sm text-muted-foreground">
                  Mostrando {filteredCourses.length} de {courses.length} cursos
                </div>
              )}
            </>
          )}
        </ErrorBoundary>
      </div>
    </AppLayout>
  );
};

export default CoursesCatalog;
