
import React from 'react';
import { PageSection } from '@/layouts/SectionPageLayout';
import StudentsSection from './StudentsSection';

interface CourseStudentsTabProps {
  courseId: string;
  courseName: string;
}

const CourseStudentsTab: React.FC<CourseStudentsTabProps> = ({ courseId, courseName }) => {
  return (
    <PageSection variant="card" title="Estudiantes Inscritos" description="Gestión de participantes">
      <StudentsSection courseId={courseId} courseName={courseName} />
    </PageSection>
  );
};

export default CourseStudentsTab;
