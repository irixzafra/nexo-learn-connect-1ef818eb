
import React from 'react';
import { Helmet } from 'react-helmet';
import { Course } from '@/types/course';

interface CourseLandingPageProps {
  course: Course;
  isEnrolled: boolean;
  isEnrolling: boolean;
  formatCurrency: (price: number) => string;
  handleEnroll: () => Promise<void>;
  totalLessons: number;
  previewableLessons: number;
}

export const CourseLandingPage: React.FC<CourseLandingPageProps> = ({
  course,
  isEnrolled,
  isEnrolling,
  formatCurrency,
  handleEnroll,
  totalLessons,
  previewableLessons
}) => {
  // This component is now deprecated in favor of the more modular approach
  // with separate components in src/features/courses/components/landing/
  console.warn('CourseLandingPage is deprecated. Use the modular components instead.');
  return (
    <div className="p-4">
      <Helmet>
        <title>{course.title} | Component Deprecated</title>
      </Helmet>
      <h1>This component is deprecated</h1>
      <p>Please use the new modular components in src/features/courses/components/landing/ instead.</p>
    </div>
  );
};
