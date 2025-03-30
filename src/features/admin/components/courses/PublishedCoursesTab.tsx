
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
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Course } from '../../hooks/useAdminCourses';

interface PublishedCoursesTabProps {
  publishedCourses: Course[];
  isLoading: boolean;
  onEnrollUsers: (id: string, title: string) => void;
}

const PublishedCoursesTab: React.FC<PublishedCoursesTabProps> = ({
  publishedCourses,
  isLoading,
  onEnrollUsers,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cursos Publicados</CardTitle>
        <CardDescription>Cursos actualmente disponibles en la plataforma</CardDescription>
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
                  <TableHead>Estudiantes</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {publishedCourses.length > 0 ? (
                  publishedCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">
                        <Link to={`/admin/courses/${course.id}`} className="hover:underline">
                          {course.title}
                        </Link>
                      </TableCell>
                      <TableCell>{course.instructors?.full_name || 'Sin instructor'}</TableCell>
                      <TableCell>{course.students_count || 0}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEnrollUsers(course.id, course.title)}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">Matricular</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center h-24">
                      No hay cursos publicados para mostrar.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PublishedCoursesTab;
