
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Course } from '../../hooks/useAdminCourses';
import CourseSearchBar from './CourseSearchBar';
import CoursesList from './CoursesList';

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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Título</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <CoursesList
                  courses={courses}
                  onViewDetails={onViewDetails}
                  onEdit={onEdit}
                  onEnrollUsers={onEnrollUsers}
                  searchTerm={searchTerm}
                />
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AllCoursesTab;
