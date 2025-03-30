
import React from 'react';
import EnrolledStudentsList from './EnrolledStudentsList';

interface StudentsSectionProps {
  courseId: string;
  courseName: string;
}

const StudentsSection: React.FC<StudentsSectionProps> = ({ courseId, courseName }) => {
  return (
    <div className="space-y-6">
      <EnrolledStudentsList courseId={courseId} courseName={courseName} />
    </div>
  );
};

export default StudentsSection;
