
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import ManualEnrollmentDialog from '@/components/admin/ManualEnrollmentDialog';
import { useCourseEnrollments } from '@/features/admin/hooks/useCourseEnrollments';
import { useEnrolledStudentsTable } from '@/features/admin/hooks/useEnrolledStudentsTable';
import StudentsSectionHeader from './StudentsSectionHeader';
import EnrollButton from './EnrollButton';
import ExportButton from './ExportButton';
import StudentsCard from './StudentsCard';
import StudentsTable from './StudentsTable';
import Papa from 'papaparse';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';

interface StudentsSectionProps {
  courseId: string;
  courseName: string;
  showTitle?: boolean;
}

const StudentsSection: React.FC<StudentsSectionProps> = ({ 
  courseId, 
  courseName,
  showTitle = true 
}) => {
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  const { enrolledStudents, refetch, isLoading, error } = useCourseEnrollments(courseId);
  
  // Use the table hook to get sorted and filtered students
  const {
    searchTerm,
    setSearchTerm,
    sortField,
    sortDirection,
    handleSort,
    sortedStudents
  } = useEnrolledStudentsTable(enrolledStudents);

  const handleEnrollmentSuccess = () => {
    refetch();
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: es });
    } catch (e) {
      return 'Fecha inválida';
    }
  };

  const handleExportCSV = () => {
    if (sortedStudents.length === 0) {
      toast.warning("No hay estudiantes para exportar");
      return;
    }

    // Format the data for CSV export
    const csvData = sortedStudents.map(student => ({
      'Nombre': student.full_name || `Usuario ${student.user_id.substring(0, 8)}`,
      'ID de Usuario': student.user_id,
      'Fecha de Inscripción': formatDate(student.enrolled_at)
    }));

    // Convert to CSV string
    const csvString = Papa.unparse(csvData);
    
    // Create a blob and download
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `estudiantes_${courseName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Archivo CSV generado correctamente");
  };

  const handleDeleteStudent = (student: any) => {
    // Implementar lógica de eliminación
    console.log('Eliminar estudiante:', student);
  };

  return (
    <div className="space-y-6">
      <StudentsSectionHeader 
        courseName={courseName} 
        showTitle={showTitle} 
      />
      
      <StudentsCard 
        courseId={courseId} 
        enrolledCount={enrolledStudents?.length || 0}
        actionButtons={
          <div className="flex gap-2">
            <EnrollButton onClick={() => setIsEnrollDialogOpen(true)} iconOnly={true} />
            <ExportButton onClick={handleExportCSV} iconOnly={true} />
          </div>
        }
      />
      
      <div className="mt-6">
        <StudentsTable 
          students={sortedStudents} 
          searchTerm={searchTerm}
          onEmailClick={(student) => console.log('Email:', student.email)}
          onPhoneClick={(student) => console.log('Phone:', student.phone)}
          onDeleteClick={handleDeleteStudent}
        />
      </div>
      
      <ManualEnrollmentDialog
        open={isEnrollDialogOpen}
        onOpenChange={setIsEnrollDialogOpen}
        courseId={courseId}
        courseName={courseName}
        onEnrollmentComplete={handleEnrollmentSuccess}
      />
    </div>
  );
};

export default StudentsSection;
