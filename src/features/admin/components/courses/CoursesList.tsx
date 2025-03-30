
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TableCell, TableRow } from '@/components/ui/table';
import { Course } from '../../hooks/useAdminCourses';
import { Badge } from '@/components/ui/badge';
import CourseActionsDropdown from './CourseActionsDropdown';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const navigate = useNavigate();

  const handleStudentsClick = (courseId: string) => {
    // Navegar directamente a la pestaña de estudiantes del curso
    navigate(`/admin/courses/${courseId}`, { state: { activeTab: 'students' } });
  };

  const handleViewDetails = (course: Course) => {
    // Usar el slug si está disponible, de lo contrario usar el ID
    if (course.slug) {
      window.open(`/cursos/${course.slug}`, '_blank');
    } else {
      window.open(`/courses/${course.id}`, '_blank');
    }
  };

  if (courses.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={7} className="h-24 text-center">
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
          <TableCell>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 hover:bg-slate-100"
              onClick={() => handleStudentsClick(course.id)}
            >
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{course.students_count}</span>
            </Button>
          </TableCell>
          <TableCell>{formatDate(course.created_at)}</TableCell>
          <TableCell className="text-right">
            <CourseActionsDropdown
              courseId={course.id}
              courseTitle={course.title}
              onViewDetails={() => handleViewDetails(course)}
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
