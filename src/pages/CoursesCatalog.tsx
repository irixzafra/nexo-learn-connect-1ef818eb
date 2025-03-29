
import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Loader2 } from 'lucide-react';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback';
import { useCoursesCatalog } from '@/features/courses/hooks/useCoursesCatalog';
import { CourseFilters } from '@/features/courses/components/CourseFilters';
import { CatalogHeader } from '@/features/courses/components/CatalogHeader';
import { CourseCatalogError } from '@/features/courses/components/CourseCatalogError';
import { EmptyCourseState } from '@/features/courses/components/EmptyCourseState';
import { CoursesList } from '@/features/courses/components/CoursesList';

const CoursesCatalog: React.FC = () => {
  const {
    filteredCourses,
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
            <EmptyCourseState 
              hasFilters={hasFilters} 
              onClearFilters={clearFilters} 
            />
          ) : !error && (
            <CoursesList courses={filteredCourses} />
          )}
        </ErrorBoundary>
      </div>
    </AppLayout>
  );
};

export default CoursesCatalog;
