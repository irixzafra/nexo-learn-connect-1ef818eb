
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourseEnrollments, EnrolledStudent } from '@/features/admin/hooks/useCourseEnrollments';
import { useEnrolledStudentsTable } from '@/features/admin/hooks/useEnrolledStudentsTable';
import { Loader2, Search, ArrowUp, ArrowDown } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import {
  DeleteStudentDialog,
  ContactInfoDialog
} from './students';
import StudentContactButtons from './students/StudentContactButtons';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';

interface EnrolledStudentsListProps {
  courseId: string;
}

const EnrolledStudentsList: React.FC<EnrolledStudentsListProps> = ({ courseId }) => {
  const { enrolledStudents, isLoading, error, refetch } = useCourseEnrollments(courseId);
  const [studentToDelete, setStudentToDelete] = useState<EnrolledStudent | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showContactInfoDialog, setShowContactInfoDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<EnrolledStudent | null>(null);
  const navigate = useNavigate();

  // Usar el nuevo hook para ordenación y filtrado
  const {
    searchTerm,
    setSearchTerm,
    sortField,
    sortDirection,
    handleSort,
    sortedStudents
  } = useEnrolledStudentsTable(enrolledStudents);

  const handleSendEmail = (student: EnrolledStudent) => {
    if (student.email) {
      window.location.href = `mailto:${student.email}`;
    } else {
      setSelectedStudent(student);
      setShowContactInfoDialog(true);
    }
  };

  const handleCallPhone = (student: EnrolledStudent) => {
    if (student.phone) {
      window.location.href = `tel:${student.phone}`;
    } else {
      setSelectedStudent(student);
      setShowContactInfoDialog(true);
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

  const handleEditUserInfo = (userId: string) => {
    navigate(`/admin/users?edit=${userId}`);
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
        {/* Barra de búsqueda mejorada con icono */}
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o email..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Total: <span className="font-semibold">{sortedStudents.length} / {enrolledStudents.length} estudiantes</span>
          </div>
        </div>

        {/* Tabla con cabeceras ordenables */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>ID de Usuario</TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto font-medium hover:bg-transparent"
                    onClick={() => handleSort('enrolled_at')}
                  >
                    Fecha de Inscripción
                    {sortField === 'enrolled_at' && (
                      sortDirection === 'asc' 
                        ? <ArrowUp className="ml-1 h-4 w-4 inline" />
                        : <ArrowDown className="ml-1 h-4 w-4 inline" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedStudents.length > 0 ? (
                sortedStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.full_name || `Usuario ${student.user_id.substring(0, 8)}`}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {student.user_id.substring(0, 12)}...
                    </TableCell>
                    <TableCell>
                      {new Date(student.enrolled_at).toLocaleDateString('es-ES')}
                    </TableCell>
                    <TableCell>
                      <StudentContactButtons
                        student={student}
                        onEmailClick={handleSendEmail}
                        onPhoneClick={handleCallPhone}
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteClick(student)}
                      >
                        Eliminar
                      </Button>
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
        
        <DeleteStudentDialog 
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          student={studentToDelete}
          onConfirm={confirmDelete}
        />

        <ContactInfoDialog 
          open={showContactInfoDialog}
          onOpenChange={setShowContactInfoDialog}
          student={selectedStudent}
          onEditUser={handleEditUserInfo}
        />
      </div>
    </TooltipProvider>
  );
};

export default EnrolledStudentsList;
