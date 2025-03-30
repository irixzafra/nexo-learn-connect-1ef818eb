
import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Mail, Phone, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCourseEnrollments, EnrolledStudent } from '@/features/admin/hooks/useCourseEnrollments';
import { Loader2 } from 'lucide-react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface EnrolledStudentsListProps {
  courseId: string;
}

const EnrolledStudentsList: React.FC<EnrolledStudentsListProps> = ({ courseId }) => {
  const { enrolledStudents, isLoading, error, refetch } = useCourseEnrollments(courseId);
  const [searchTerm, setSearchTerm] = useState('');
  const [studentToDelete, setStudentToDelete] = useState<EnrolledStudent | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const filteredStudents = enrolledStudents?.filter(student => 
    student.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: es });
    } catch (e) {
      return 'Fecha inválida';
    }
  };

  const handleSendEmail = (student: EnrolledStudent) => {
    if (student.email) {
      window.location.href = `mailto:${student.email}`;
    } else {
      toast.error("El estudiante no tiene correo electrónico registrado");
    }
  };

  const handleCallPhone = (student: EnrolledStudent) => {
    if (student.phone) {
      window.location.href = `tel:${student.phone}`;
    } else {
      toast.error("El estudiante no tiene número de teléfono registrado");
    }
  };

  const handleDeleteClick = (student: EnrolledStudent) => {
    setStudentToDelete(student);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;
    
    try {
      const { error } = await supabase
        .from('enrollments')
        .delete()
        .eq('id', studentToDelete.id);
        
      if (error) throw error;
      
      toast.success(`Estudiante ${studentToDelete.full_name || 'sin nombre'} eliminado del curso`);
      refetch();
    } catch (err) {
      console.error('Error removing student:', err);
      toast.error("No se pudo eliminar al estudiante del curso");
    } finally {
      setShowDeleteDialog(false);
      setStudentToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 border rounded-lg bg-destructive/10 text-destructive">
        <p>Error al cargar los estudiantes: {error.message}</p>
        <Button variant="secondary" className="mt-4" onClick={refetch}>
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Input
            placeholder="Buscar por nombre..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="text-sm text-muted-foreground">
            Total: <span className="font-semibold">{enrolledStudents.length} estudiantes</span>
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>ID de Usuario</TableHead>
                <TableHead>Fecha de Inscripción</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.full_name || `Usuario ${student.user_id.substring(0, 8)}`}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {student.user_id.substring(0, 12)}...
                    </TableCell>
                    <TableCell>{formatDate(student.enrolled_at)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleSendEmail(student)}
                              disabled={!student.email}
                            >
                              <Mail className={`h-4 w-4 ${student.email ? 'text-blue-500' : 'text-gray-400'}`} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {student.email 
                              ? `Enviar email a ${student.email}` 
                              : "No tiene email registrado"}
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleCallPhone(student)}
                              disabled={!student.phone}
                            >
                              <Phone className={`h-4 w-4 ${student.phone ? 'text-green-500' : 'text-gray-400'}`} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {student.phone 
                              ? `Llamar al ${student.phone}` 
                              : "No tiene teléfono registrado"}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteClick(student)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Eliminar del curso
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    {searchTerm 
                      ? `No se encontraron estudiantes que coincidan con "${searchTerm}"`
                      : "No hay estudiantes inscritos en este curso"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción eliminará a {studentToDelete?.full_name || 'este estudiante'} del curso. 
                Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
};

export default EnrolledStudentsList;
