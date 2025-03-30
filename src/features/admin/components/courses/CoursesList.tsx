
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { Course } from '../../hooks/useAdminCourses';
import CourseActionsDropdown from './CourseActionsDropdown';

interface CoursesListProps {
  courses: Course[];
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onEnrollUsers: (id: string, title: string) => void;
  searchTerm?: string;
  formatPrice?: (price: number, currency: string) => string;
  formatDate?: (date: string) => string;
}

const CoursesList: React.FC<CoursesListProps> = ({
  courses,
  onViewDetails,
  onEdit,
  onEnrollUsers,
  searchTerm = '',
  formatPrice = (price, currency) => `${currency === 'eur' ? '€' : '$'}${price.toFixed(2)}`,
  formatDate = (date) => date.substring(0, 10),
}) => {
  if (courses.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={7} className="text-center h-24">
          {searchTerm.trim() !== ''
            ? 'No se encontraron cursos que coincidan con la búsqueda.'
            : 'No hay cursos para mostrar.'}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {courses.map((course) => (
        <TableRow key={course.id}>
          <TableCell className="font-medium">
            <Link to={`/admin/courses/${course.id}`} className="hover:underline">
              {course.title}
            </Link>
          </TableCell>
          <TableCell>{course.instructors?.full_name || 'Sin instructor'}</TableCell>
          <TableCell>
            <Badge
              variant="outline"
              className={
                course.status === 'published' || course.is_published
                  ? 'bg-green-100 text-green-800'
                  : 'bg-amber-100 text-amber-800'
              }
            >
              {course.status === 'published' || course.is_published ? 'Publicado' : 'Borrador'}
            </Badge>
          </TableCell>
          <TableCell>{formatPrice(course.price, course.currency || 'eur')}</TableCell>
          <TableCell>{course.students_count || 0}</TableCell>
          <TableCell>{formatDate(course.updated_at)}</TableCell>
          <TableCell className="text-right">
            <CourseActionsDropdown
              courseId={course.id}
              courseTitle={course.title}
              onViewDetails={onViewDetails}
              onEdit={onEdit}
              onEnrollUsers={onEnrollUsers}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default CoursesList;
