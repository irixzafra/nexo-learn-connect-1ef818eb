
import React, { Suspense, lazy, useState } from 'react';
import { useCoursesCatalog } from '@/features/courses/hooks/useCoursesCatalog';
import { LoadingPage } from '@/components/ui/loading-page';
import { CourseCardSkeleton } from '@/features/courses/components/CourseCardSkeleton';

// Importaciones con lazy loading
const CatalogHeader = lazy(() => import('@/features/courses/components/CatalogHeader').then(module => ({ default: module.CatalogHeader })));
const CourseFilters = lazy(() => import('@/features/courses/components/CourseFilters').then(module => ({ default: module.CourseFilters })));
const CourseCatalogError = lazy(() => import('@/features/courses/components/CourseCatalogError').then(module => ({ default: module.CourseCatalogError })));
const CourseGrid = lazy(() => import('@/features/courses/components/CourseGrid').then(module => ({ default: module.CourseGrid })));

const CoursesCatalog: React.FC = () => {
  const { 
    filteredCourses, 
    isLoading, 
    error, 
    searchTerm, 
    setSearchTerm, 
    clearFilters,
    fetchCourses 
  } = useCoursesCatalog();
  
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  // Handle retrying when there's an error
  const handleRetry = () => {
    fetchCourses();
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <Suspense fallback={<div className="h-20 w-full bg-muted animate-pulse rounded-md" />}>
        <CatalogHeader 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
        />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        <aside className="lg:col-span-3">
          <Suspense fallback={<div className="h-60 w-full bg-muted animate-pulse rounded-md" />}>
            <CourseFilters
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              onClearFilters={clearFilters}
            />
          </Suspense>
        </aside>
        
        <main className="lg:col-span-9">
          {error ? (
            <Suspense fallback={<div className="h-20 w-full bg-destructive/10 animate-pulse rounded-md" />}>
              <CourseCatalogError error={error} onRetry={handleRetry} />
            </Suspense>
          ) : isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CourseCardSkeleton count={6} />
            </div>
          ) : (
            <Suspense fallback={<LoadingPage message="Cargando cursos..." />}>
              <CourseGrid filteredCourses={filteredCourses} />
            </Suspense>
          )}
        </main>
      </div>
    </div>
  );
};

export default CoursesCatalog;
