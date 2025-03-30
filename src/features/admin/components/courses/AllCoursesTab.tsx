
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Course } from '../../hooks/useAdminCourses';
import CourseSearchBar from './CourseSearchBar';
import CourseTable from './CourseTable';
import CoursePagination from './CoursePagination';
import { useCoursesTable } from '../../hooks/useCoursesTable';

interface AllCoursesTabProps {
  courses: Course[];
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onEnrollUsers: (id: string, title: string) => void;
}

const AllCoursesTab: React.FC<AllCoursesTabProps> = ({
  courses,
  isLoading,
  searchTerm,
  setSearchTerm,
  onViewDetails,
  onEdit,
  onEnrollUsers,
}) => {
  const {
    sortField,
    sortDirection,
    currentPage,
    sortedAndPaginatedCourses,
    handleSort,
    handlePageChange
  } = useCoursesTable(courses, searchTerm);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <CardTitle>Lista de Cursos</CardTitle>
            <CardDescription>Gestiona todos los cursos de la plataforma</CardDescription>
          </div>
          <div className="mt-4 md:mt-0">
            <CourseSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <CourseTable
              courses={sortedAndPaginatedCourses.courses}
              searchTerm={searchTerm}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              onViewDetails={onViewDetails}
              onEdit={onEdit}
              onEnrollUsers={onEnrollUsers}
              isLoading={isLoading}
            />
            
            <CoursePagination
              currentPage={currentPage}
              totalPages={sortedAndPaginatedCourses.totalPages}
              onPageChange={handlePageChange}
            />
            
            <div className="mt-2 text-center text-sm text-muted-foreground">
              Mostrando {sortedAndPaginatedCourses.courses.length} de {sortedAndPaginatedCourses.totalItems} cursos
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AllCoursesTab;
