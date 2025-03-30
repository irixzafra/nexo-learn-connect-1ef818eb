
import React from 'react';
import { Link } from 'react-router-dom';
import { TableCell, TableRow } from '@/components/ui/table';
import { Course } from '../../hooks/useAdminCourses';
import { Badge } from '@/components/ui/badge';
import CourseActionsDropdown from './CourseActionsDropdown';

interface CoursesListProps {
  courses: Course[];
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onEnrollUsers: (id: string, title: string) => void;
  searchTerm: string;
  formatPrice: (price: number, currency: string) => string;
  formatDate: (date: string) => string;
}

const CoursesList: React.FC<CoursesListProps> = ({
  courses,
  onViewDetails,
  onEdit,
  onEnrollUsers,
  searchTerm,
  formatPrice,
  formatDate,
}) => {
  if (courses.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="h-24 text-center">
          {searchTerm
            ? `No se encontraron cursos que coincidan con "${searchTerm}"`
            : "No hay cursos disponibles"}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {courses.map((course) => (
        <TableRow key={course.id}>
          <TableCell className="font-medium">
            <Link to={`/admin/courses/${course.id}`} className="hover:underline text-primary">
              {course.title}
            </Link>
          </TableCell>
          <TableCell>{course.instructors?.full_name || "Sin instructor"}</TableCell>
          <TableCell>{formatPrice(course.price, course.currency)}</TableCell>
          <TableCell>
            <Badge
              variant={course.is_published ? "default" : "secondary"}
            >
              {course.is_published ? "Publicado" : "Borrador"}
            </Badge>
          </TableCell>
          <TableCell>{formatDate(course.created_at)}</TableCell>
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
