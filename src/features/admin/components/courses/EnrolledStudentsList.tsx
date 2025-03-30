
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourseEnrollments, EnrolledStudent } from '@/features/admin/hooks/useCourseEnrollments';
import { Loader2 } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import {
  StudentsTable,
  StudentsSearchBar,
  DeleteStudentDialog,
  ContactInfoDialog
} from './students';

interface EnrolledStudentsListProps {
  courseId: string;
}

const EnrolledStudentsList: React.FC<EnrolledStudentsListProps> = ({ courseId }) => {
  const { enrolledStudents, isLoading, error, refetch } = useCourseEnrollments(courseId);
  const [searchTerm, setSearchTerm] = useState('');
  const [studentToDelete, setStudentToDelete] = useState<EnrolledStudent | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showContactInfoDialog, setShowContactInfoDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<EnrolledStudent | null>(null);
  const navigate = useNavigate();

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
        <StudentsSearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          totalStudents={enrolledStudents.length}
        />

        <StudentsTable 
          students={enrolledStudents}
          searchTerm={searchTerm}
          onEmailClick={handleSendEmail}
          onPhoneClick={handleCallPhone}
          onDeleteClick={handleDeleteClick}
        />
        
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
