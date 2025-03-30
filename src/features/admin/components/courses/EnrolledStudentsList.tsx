
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Users, AlertCircle, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/features/admin/utils/formatters";
import { useCourseEnrollments } from "@/features/admin/hooks/useCourseEnrollments";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState<string | null>(null);

  const handleDeleteEnrollment = async (enrollmentId: string) => {
    try {
      setDeletingId(enrollmentId);
      
      const { error } = await supabase
        .from('enrollments')
        .delete()
        .eq('id', enrollmentId);
      
      if (error) {
        throw error;
      }
      
      toast.success("Matrícula eliminada correctamente");
      refetch(); // Refresh the list after deletion
    } catch (error: any) {
      console.error("Error al eliminar matrícula:", error);
      toast.error(`Error al eliminar matrícula: ${error.message || "Error desconocido"}`);
    } finally {
      setDeletingId(null);
      setIsConfirmOpen(false);
    }
  };

  const openDeleteConfirm = (enrollmentId: string) => {
    setSelectedEnrollmentId(enrollmentId);
    setIsConfirmOpen(true);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-2" />
        <h3 className="text-lg font-medium">Error al cargar estudiantes</h3>
        <p className="text-muted-foreground mb-4">
          {error.message || "No se pudieron cargar los estudiantes inscritos en este curso."}
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          <RefreshCw className="mr-2 h-4 w-4" />
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
            <TableHead>ID de Usuario</TableHead>
            <TableHead>Fecha de Inscripción</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrolledStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">
                {student.full_name || 'Sin nombre'}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {student.user_id.substring(0, 8)}...
              </TableCell>
              <TableCell>{formatDate(student.enrolled_at)}</TableCell>
              <TableCell className="text-right">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => openDeleteConfirm(student.id)}
                        disabled={deletingId === student.id}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Eliminar matrícula</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Eliminar matrícula</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la matrícula del estudiante en este curso. 
              El estudiante perderá acceso al contenido y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => selectedEnrollmentId && handleDeleteEnrollment(selectedEnrollmentId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EnrolledStudentsList;
