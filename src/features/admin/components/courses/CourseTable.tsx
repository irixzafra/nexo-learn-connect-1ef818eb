
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/features/admin/utils/formatters';
import { Course } from '@/types/course';
import CourseActionsDropdown from './CourseActionsDropdown';

interface CourseTableProps {
  courses: Course[];
  onDeleteCourse: (courseId: string) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({ courses, onDeleteCourse }) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Creado</TableHead>
            <TableHead>Actualizado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">
                <Link 
                  to={`/admin/courses/${course.id}`} 
                  className="hover:underline text-primary"
                >
                  {course.title}
                </Link>
              </TableCell>
              <TableCell>
                {course.instructor?.full_name || 'Sin instructor'}
              </TableCell>
              <TableCell>
                {course.is_published ? (
                  <Badge variant="default" className="bg-green-500">Publicado</Badge>
                ) : (
                  <Badge variant="outline">Borrador</Badge>
                )}
              </TableCell>
              <TableCell>{formatDate(course.created_at)}</TableCell>
              <TableCell>{formatDate(course.updated_at)}</TableCell>
              <TableCell className="text-right">
                <CourseActionsDropdown
                  course={course}
                  onDelete={onDeleteCourse}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
