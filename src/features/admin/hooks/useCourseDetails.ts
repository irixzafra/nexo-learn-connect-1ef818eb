
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import useCourseDetail from './useCourseDetail';

export const useCourseDetails = () => {
  // This function wraps the existing useCourseDetail hook to ensure compatibility
  const { toast } = useToast();
  const [courseId, setCourseId] = useState<string | undefined>(undefined);
  
  const courseDetails = useCourseDetail({
    courseId,
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cargar la información del curso."
      });
    }
  });

  const fetchCourseDetails = (id: string) => {
    setCourseId(id);
    return courseDetails.fetchCourseDetails(id);
  };

  return {
    ...courseDetails,
    fetchCourseDetails
  };
};

export default useCourseDetails;
