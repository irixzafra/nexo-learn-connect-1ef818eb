
import { useState } from "react";
import { useCourseDetails } from "./useCourseDetails";
import { useEnrollment } from "./useEnrollment";

export const useCourseLanding = (courseId: string) => {
  const { course, modules, modulesWithLessons, isLoading } = useCourseDetails(courseId);
  const { isEnrolled, isEnrolling, isChecking, handleEnroll } = useEnrollment(courseId);
  
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);
  
  // Helper function to format currency
  const formatCurrency = (price: number, currency: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price);
  };
  
  // Count total lessons
  const totalLessons = modulesWithLessons?.reduce(
    (total, module) => total + module.lessons.length,
    0
  ) || 0;
  
  // Count previewable lessons
  const previewableLessons = modulesWithLessons?.reduce(
    (total, module) => 
      total + module.lessons.filter(lesson => lesson.is_previewable).length,
    0
  ) || 0;
  
  return {
    course,
    modules,
    modulesWithLessons,
    isLoading,
    isEnrolled,
    isEnrolling,
    isChecking,
    handleEnroll,
    expandedFAQs,
    setExpandedFAQs,
    formatCurrency,
    totalLessons,
    previewableLessons
  };
};
