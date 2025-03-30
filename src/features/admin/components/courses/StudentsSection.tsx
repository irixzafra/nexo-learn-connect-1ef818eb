
import React, { useState } from 'react';
import { UserPlus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EnrolledStudentsList from './EnrolledStudentsList';
import ManualEnrollmentDialog from '@/components/admin/ManualEnrollmentDialog';
import { useCourseEnrollments } from '@/features/admin/hooks/useCourseEnrollments';
import { Card, CardContent } from '@/components/ui/card';

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
  const { enrolledStudents, refetch } = useCourseEnrollments(courseId);
  
  const handleEnrollmentSuccess = () => {
    refetch();
  };

  return (
    <div className="space-y-6">
      {showTitle && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Estudiantes Inscritos</h2>
          <p className="text-muted-foreground">Gestión de participantes del curso</p>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">
            Estudiantes Inscritos en: {courseName}
          </h3>
        </div>
        <Button 
          onClick={() => setIsEnrollDialogOpen(true)}
          className="w-full sm:w-auto"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Matricular Usuario
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              Total: {enrolledStudents?.length || 0} estudiantes
            </h3>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
          
          <EnrolledStudentsList courseId={courseId} />
        </CardContent>
      </Card>
      
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
