
import React from 'react';
import { PageSection } from '@/layouts/SectionPageLayout';
import { StudentsSection } from './students';

export interface CourseStudentsTabProps {
  courseId: string;
  courseName: string;
}

const CourseStudentsTab: React.FC<CourseStudentsTabProps> = ({ courseId, courseName }) => {
  return (
    <PageSection variant="card" title="Estudiantes Inscritos" description="Gestión de participantes del curso">
      <StudentsSection courseId={courseId} courseName={courseName} showTitle={false} />
    </PageSection>
  );
};

export default CourseStudentsTab;
