
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/hooks/useLocalization';
import { useEnrollment } from '@/features/courses/hooks/useEnrollment';
import { useCourseDetails } from '@/features/courses/hooks/useCourseDetails';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const CourseEnrollment: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { t } = useLocalization();
  const navigate = useNavigate();
  
  const { course, isLoading: isLoadingCourse } = useCourseDetails(courseId);
  const { 
    isEnrolled, 
    isEnrolling, 
    isChecking,
    handleEnroll 
  } = useEnrollment(courseId || '');

  // Redirect if already enrolled
  useEffect(() => {
    if (isEnrolled && !isChecking && courseId) {
      navigate(`/courses/${courseId}/learn`);
    }
  }, [isEnrolled, isChecking, courseId, navigate]);

  if (isLoadingCourse || isChecking) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('course.not_found', { default: 'Course Not Found' })}</CardTitle>
            <CardDescription>
              {t('course.not_found_description', { default: 'The requested course could not be found' })}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate('/courses')}>
              {t('course.browse_courses', { default: 'Browse Courses' })}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(`/courses/${courseId}`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> 
        {t('course.back_to_course', { default: 'Back to Course' })}
      </Button>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{t('course.enrollment.title', { default: 'Complete Your Enrollment' })}</CardTitle>
          <CardDescription>
            {t('course.enrollment.description', { default: 'You are about to enroll in the following course' })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium text-lg mb-2">{course.title}</h3>
            
            {course.instructor && (
              <p className="text-sm text-muted-foreground mb-4">
                {t('course.by_instructor', { default: 'By' })} {course.instructor.full_name}
              </p>
            )}
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <span className="font-semibold">
                  {course.price ? formatCurrency(course.price, course.currency || 'eur') : t('course.free', { default: 'Free' })}
                </span>
                {course.original_price && course.original_price > course.price && (
                  <span className="text-muted-foreground line-through ml-2">
                    {formatCurrency(course.original_price, course.currency || 'eur')}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <p>{t('course.enrollment.benefit1', { default: 'Full lifetime access to course content' })}</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <p>{t('course.enrollment.benefit2', { default: 'Access to all course materials and resources' })}</p>
            </div>
            {course.grants_certificate && (
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <p>{t('course.enrollment.benefit3', { default: 'Certificate of completion' })}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            className="w-full" 
            onClick={handleEnroll}
            disabled={isEnrolling}
          >
            {isEnrolling ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('course.processing', { default: 'Processing...' })}
              </>
            ) : (
              course.price > 0 
                ? t('course.proceed_to_payment', { default: 'Proceed to Payment' })
                : t('course.complete_enrollment', { default: 'Complete Enrollment' })
            )}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            {course.price > 0 
              ? t('course.money_back_guarantee', { default: '30-day money-back guarantee' })
              : t('course.no_commitment', { default: 'No commitment, cancel anytime' })}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CourseEnrollment;
