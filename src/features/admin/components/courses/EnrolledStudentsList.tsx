
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Search, 
  MoreHorizontal, 
  Mail, 
  Trash, 
  ExternalLink,
  AlertCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/features/admin/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { CourseProgressBar } from "@/features/courses/components/CourseProgressBar";
import ManualEnrollmentDialog from "@/components/admin/ManualEnrollmentDialog";

interface Student {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  role: string;
  enrolled_at: string;
  progress: number;
  last_active: string | null;
}

interface EnrolledStudentsListProps {
  courseId: string;
  courseName: string;
}

const EnrolledStudentsList: React.FC<EnrolledStudentsListProps> = ({ 
  courseId, 
  courseName 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEnrollmentDialogOpen, setIsEnrollmentDialogOpen] = useState(false);
  
  // Fetch enrolled students
  const { 
    data: students, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ["courseStudents", courseId],
    queryFn: async () => {
      try {
        // Get enrollments with user info and calculated progress
        const { data, error } = await supabase
          .from('enrollments')
          .select(`
            id,
            enrolled_at,
            user_id,
            profiles:user_id (
              id,
              full_name,
              email:id (email),
              role
            )
          `)
          .eq('course_id', courseId);

        if (error) throw error;

        if (!data || data.length === 0) return [];
        
        // Get progress for all students
        const studentsWithProgress = await Promise.all(
          data.map(async (enrollment) => {
            // Calculate progress for each student
            const { data: progressData } = await supabase.rpc(
              "calculate_course_progress",
              {
                course_id_param: courseId,
                user_id_param: enrollment.user_id,
              }
            );

            // Get last activity data (from lesson_progress)
            const { data: lastActivity } = await supabase
              .from('lesson_progress')
              .select('updated_at')
              .eq('user_id', enrollment.user_id)
              .eq('course_id', courseId)
              .order('updated_at', { ascending: false })
              .limit(1);
              
            return {
              id: enrollment.id,
              user_id: enrollment.user_id,
              full_name: enrollment.profiles?.full_name,
              email: enrollment.profiles?.email?.email,
              role: enrollment.profiles?.role,
              enrolled_at: enrollment.enrolled_at,
              progress: progressData || 0,
              last_active: lastActivity && lastActivity.length > 0 ? lastActivity[0].updated_at : null,
            };
          })
        );

        return studentsWithProgress;
      } catch (error: any) {
        console.error("Error fetching enrolled students:", error);
        throw error;
      }
    },
  });

  // Filter students based on search term
  const filteredStudents = students?.filter(student => 
    student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Handle student removal
  const handleRemoveStudent = async (studentId: string, studentName: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar a ${studentName || 'este estudiante'} del curso?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('enrollments')
        .delete()
        .eq('id', studentId);

      if (error) throw error;

      toast.success(`${studentName || 'Estudiante'} eliminado exitosamente`);
      refetch();
    } catch (error: any) {
      console.error('Error removing student:', error);
      toast.error(`Error al eliminar estudiante: ${error.message}`);
    }
  };

  // Handle enrollment completion (callback for ManualEnrollmentDialog)
  const handleEnrollmentComplete = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-2" />
        <h3 className="text-lg font-medium">Error al cargar estudiantes</h3>
        <p className="text-muted-foreground mb-4">
          No se pudieron cargar los estudiantes inscritos en este curso.
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">
            Estudiantes Inscritos ({!isLoading ? filteredStudents.length : '...'})
          </h2>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar estudiantes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsEnrollmentDialogOpen(true)}>
            Matricular
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="text-center p-10 border rounded-lg bg-slate-50 dark:bg-slate-800">
          <Users className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium mb-1">No hay estudiantes matriculados</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm 
              ? `No se encontraron estudiantes que coincidan con "${searchTerm}"`
              : "Este curso aún no tiene estudiantes inscritos."
            }
          </p>
          {searchTerm ? (
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              Limpiar búsqueda
            </Button>
          ) : (
            <Button onClick={() => setIsEnrollmentDialogOpen(true)}>
              Matricular primer estudiante
            </Button>
          )}
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                <TableHead>Fecha de Inscripción</TableHead>
                <TableHead>Última Actividad</TableHead>
                <TableHead>Progreso</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="font-medium">{student.full_name || 'Sin nombre'}</div>
                    <div className="text-sm text-muted-foreground">{student.email || 'Sin email'}</div>
                    {student.role && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        {student.role}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {formatDate(student.enrolled_at)}
                  </TableCell>
                  <TableCell>
                    {student.last_active 
                      ? formatDate(student.last_active)
                      : 'Sin actividad'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium w-8">{Math.round(student.progress)}%</span>
                      <CourseProgressBar progress={student.progress} size="sm" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => window.open(`/admin/users/${student.user_id}`, '_blank')}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Ver perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Send message to:', student.email)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar mensaje
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleRemoveStudent(student.id, student.full_name || '')}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <ManualEnrollmentDialog
        open={isEnrollmentDialogOpen}
        onOpenChange={setIsEnrollmentDialogOpen}
        courseId={courseId}
        courseName={courseName}
        onEnrollmentComplete={handleEnrollmentComplete}
      />
    </div>
  );
};

export default EnrolledStudentsList;
