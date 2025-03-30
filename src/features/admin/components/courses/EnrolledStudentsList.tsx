
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/features/admin/utils/formatters";
import { useCourseEnrollments } from "@/features/admin/hooks/useCourseEnrollments";

interface EnrolledStudentsListProps {
  courseId: string;
}

const EnrolledStudentsList: React.FC<EnrolledStudentsListProps> = ({ courseId }) => {
  const { 
    enrolledStudents, 
    isLoading, 
    error, 
    refetch 
  } = useCourseEnrollments(courseId);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-2" />
        <h3 className="text-lg font-medium">Error al cargar estudiantes</h3>
        <p className="text-muted-foreground mb-4">
          {error.message || "No se pudieron cargar los estudiantes inscritos en este curso."}
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          Reintentar
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (enrolledStudents.length === 0) {
    return (
      <div className="text-center p-10 border rounded-lg bg-slate-50 dark:bg-slate-800">
        <Users className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium mb-1">No hay estudiantes matriculados</h3>
        <p className="text-muted-foreground mb-4">
          Este curso aún no tiene estudiantes inscritos.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Fecha de Inscripción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrolledStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">
                {student.full_name || 'Sin nombre'}
              </TableCell>
              <TableCell>{student.email || 'Sin email'}</TableCell>
              <TableCell>{formatDate(student.enrolled_at)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EnrolledStudentsList;
