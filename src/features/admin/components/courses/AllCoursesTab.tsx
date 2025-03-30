
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Course } from '../../hooks/useAdminCourses';
import { Table, TableBody } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CoursePagination from './CoursePagination';
import CourseTableHeader from './CourseTableHeader';
import { useCoursesTable } from '../../hooks/useCoursesTable';
import CoursesList from './CoursesList';
import { formatPrice, formatDate } from '../../utils/formatters';

interface AllCoursesTabProps {
  courses: Course[];
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
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
  const navigate = useNavigate();
  
  const {
    sortField,
    sortDirection,
    currentPage,
    totalPages,
    paginatedCourses,
    handleSort,
    handlePageChange,
  } = useCoursesTable({ courses, searchTerm });

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cursos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => navigate('/instructor/create-course')}>
          <Plus className="mr-2 h-4 w-4" />
          Crear Curso
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todos los Cursos</CardTitle>
          <CardDescription>
            Gestiona todos los cursos de la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
              <p className="mt-2 text-sm text-muted-foreground">Cargando cursos...</p>
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <CourseTableHeader
                    sortField={sortField}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                  <TableBody>
                    <CoursesList
                      courses={paginatedCourses}
                      onViewDetails={onViewDetails}
                      onEdit={onEdit}
                      onEnrollUsers={onEnrollUsers}
                      searchTerm={searchTerm}
                      formatPrice={formatPrice}
                      formatDate={formatDate}
                    />
                  </TableBody>
                </Table>
              </div>
              
              {totalPages > 1 && (
                <CoursePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default AllCoursesTab;
