
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useInstructorCoursesManagement } from '@/features/instructor/hooks/useInstructorCoursesManagement';
import { InstructorCoursesHeader } from '@/features/instructor/components/courses/InstructorCoursesHeader';
import { InstructorCoursesFilters } from '@/features/instructor/components/courses/InstructorCoursesFilters';
import { InstructorCoursesGrid } from '@/features/instructor/components/courses/InstructorCoursesGrid';
import { InstructorCoursesEmptyState } from '@/features/instructor/components/courses/InstructorCoursesEmptyState';
import { InstructorCoursesLoading } from '@/features/instructor/components/courses/InstructorCoursesLoading';
import { DeleteCourseDialog } from '@/features/instructor/components/courses/DeleteCourseDialog';
import PageHeader from '@/components/layout/PageHeader';
import { useOnboarding } from '@/hooks/useOnboarding';

const CoursesList: React.FC = () => {
  const { user } = useAuth();
  const { startOnboarding } = useOnboarding();
  
  const {
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    courses,
    isLoading,
    courseToDelete,
    setCourseToDelete,
    handleDeleteCourse,
    createNewCourse,
    navigateToCourse,
    navigateToEditor,
    navigateToStructure,
    navigateToEdit,
    navigateToAnalytics
  } = useInstructorCoursesManagement(user?.id);
  
  return (
    <div className="container mx-auto p-6">
      <PageHeader 
        title="Mis Cursos" 
        description="Gestiona y edita tus cursos como instructor"
        breadcrumbs={[
          { label: 'Dashboard', href: '/app/instructor/dashboard' },
          { label: 'Mis Cursos' }
        ]}
        showOnboarding={true}
      />
      
      <InstructorCoursesHeader onCreateCourse={createNewCourse} />
      
      <InstructorCoursesFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {isLoading ? (
        <InstructorCoursesLoading />
      ) : courses?.length === 0 ? (
        <InstructorCoursesEmptyState
          searchTerm={searchTerm}
          activeTab={activeTab}
          onCreateCourse={createNewCourse}
        />
      ) : (
        <InstructorCoursesGrid
          courses={courses}
          onViewCourse={navigateToCourse}
          onEditCourse={navigateToEdit}
          onEditStructure={navigateToStructure}
          onEditContent={navigateToEditor}
          onDeleteCourse={setCourseToDelete}
          onAnalytics={navigateToAnalytics}
        />
      )}
      
      <DeleteCourseDialog
        course={courseToDelete}
        isOpen={!!courseToDelete}
        onOpenChange={(open) => !open && setCourseToDelete(null)}
        onConfirmDelete={handleDeleteCourse}
      />
    </div>
  );
};

export default CoursesList;
