
import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EnrolledStudentsList from './EnrolledStudentsList';
import ManualEnrollmentDialog from '@/components/admin/ManualEnrollmentDialog';
import { useCourseEnrollments } from '@/features/admin/hooks/useCourseEnrollments';

interface StudentsSectionProps {
  courseId: string;
  courseName: string;
}

const StudentsSection: React.FC<StudentsSectionProps> = ({ courseId, courseName }) => {
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  const { refetch } = useCourseEnrollments(courseId);
  
  const handleEnrollmentSuccess = () => {
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold">
          Estudiantes Inscritos en: {courseName}
        </h2>
        <Button 
          onClick={() => setIsEnrollDialogOpen(true)}
          className="w-full sm:w-auto"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Matricular Usuario
        </Button>
      </div>
      
      <EnrolledStudentsList courseId={courseId} />
      
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
