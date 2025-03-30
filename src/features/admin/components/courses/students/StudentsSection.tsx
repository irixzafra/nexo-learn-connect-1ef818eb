
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import ManualEnrollmentDialog from '@/components/admin/ManualEnrollmentDialog';
import { useCourseEnrollments } from '@/features/admin/hooks/useCourseEnrollments';
import { StudentsSectionHeader } from './StudentsSectionHeader';
import { EnrollButton } from './EnrollButton';
import { StudentsCard } from './StudentsCard';

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
      <StudentsSectionHeader 
        courseName={courseName} 
        showTitle={showTitle} 
      />
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
        <EnrollButton onClick={() => setIsEnrollDialogOpen(true)} />
      </div>
      
      <StudentsCard 
        courseId={courseId} 
        enrolledCount={enrolledStudents?.length || 0} 
      />
      
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
