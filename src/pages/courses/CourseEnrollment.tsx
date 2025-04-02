
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/hooks/useLocalization';

const CourseEnrollment: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { t } = useLocalization();
  
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('course.enrollment.title', { default: 'Enroll in Course' })}</CardTitle>
          <CardDescription>
            {t('course.enrollment.description', { default: 'Complete your enrollment for this course' })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Course ID: {courseId}</p>
          <p>Enrollment details will be implemented here</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">{t('course.complete_enrollment', { default: 'Complete Enrollment' })}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseEnrollment;
