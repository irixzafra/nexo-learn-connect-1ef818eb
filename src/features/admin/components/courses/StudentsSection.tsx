
import React from 'react';
import EnrolledStudentsList from './EnrolledStudentsList';

interface StudentsSectionProps {
  courseId: string;
  courseName: string;
}

const StudentsSection: React.FC<StudentsSectionProps> = ({ courseId, courseName }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold">
          Estudiantes Inscritos en: {courseName}
        </h2>
      </div>
      
      <EnrolledStudentsList courseId={courseId} />
    </div>
  );
};

export default StudentsSection;
