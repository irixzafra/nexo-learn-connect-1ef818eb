
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Course } from '../../hooks/useAdminCourses';

interface DraftCoursesTabProps {
  draftCourses: Course[];
  isLoading: boolean;
  onEdit: (id: string) => void;
}

const DraftCoursesTab: React.FC<DraftCoursesTabProps> = ({ draftCourses, isLoading, onEdit }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Borradores de Cursos</CardTitle>
        <CardDescription>Cursos en desarrollo que aún no han sido publicados</CardDescription>
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
                  <TableHead>Última modificación</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {draftCourses.length > 0 ? (
                  draftCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">
                        <Link to={`/admin/courses/${course.id}`} className="hover:underline">
                          {course.title}
                        </Link>
                      </TableCell>
                      <TableCell>{course.instructors?.full_name || 'Sin instructor'}</TableCell>
                      <TableCell>{new Date(course.updated_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(course.id)}
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">Editar</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center h-24">
                      No hay borradores de cursos para mostrar.
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

export default DraftCoursesTab;
