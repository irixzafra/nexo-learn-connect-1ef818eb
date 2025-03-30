
import { useState, useEffect } from 'react';
import { useCoursePublicData, useCoursePublicDataBySlug } from './useCoursePublicData';
import { Module, Lesson } from '@/types/course';

export const useCourseLanding = (identifier: string, isSlug: boolean = false) => {
  // State for expandable FAQ items
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);
  
  // Use the appropriate hook based on identifier type
  const { 
    course: courseData, 
    isLoading 
  } = isSlug ? useCoursePublicDataBySlug(identifier) : useCoursePublicData(identifier);
  
  // Extract modulesWithLessons from course data
  const modulesWithLessons = courseData?.modules as Array<Module & { lessons: Lesson[] }> || [];
  
  // Calculate total lessons and previewable lessons counts
  const totalLessons = modulesWithLessons.reduce(
    (acc, module) => acc + (module.lessons?.length || 0), 
    0
  );
  
  const previewableLessons = modulesWithLessons.reduce(
    (acc, module) => 
      acc + (module.lessons?.filter(lesson => lesson.is_previewable).length || 0),
    0
  );
  
  // Mock enrollment state (to be replaced with actual enrollment logic)
  const isEnrolled = false;
  const isEnrolling = false;
  const isChecking = false;
  
  // Mock enrollment handler
  const handleEnroll = async () => {
    console.log("Enrolling in course", identifier);
    // Implement actual enrollment logic
  };
  
  // Format currency helper
  const formatCurrency = (price: number, currency: string = 'eur') => {
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2
    });
    
    return formatter.format(price);
  };
  
  return {
    course: courseData,
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
