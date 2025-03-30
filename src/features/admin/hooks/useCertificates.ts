
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Course } from '@/types/courses';

export interface CourseWithCertificate extends Course {
  grants_certificate: boolean;
}

export function useCertificates() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: courses, isLoading, error } = useQuery({
    queryKey: ['coursesCertificates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('title');
      
      if (error) throw new Error(error.message);
      return data as CourseWithCertificate[];
    }
  });

  const updateCourseCertificate = useMutation({
    mutationFn: async ({ 
      courseId, 
      grantsCertificate 
    }: { 
      courseId: string; 
      grantsCertificate: boolean 
    }) => {
      const { data, error } = await supabase
        .from('courses')
        .update({ grants_certificate: grantsCertificate })
        .eq('id', courseId)
        .select('*')
        .single();
      
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['coursesCertificates'] });
      toast({
        title: data.grants_certificate ? "Certificado activado" : "Certificado desactivado",
        description: `El curso "${data.title}" ${data.grants_certificate ? 'ahora' : 'ya no'} otorga certificado`
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Error al actualizar el certificado: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  const filteredCourses = courses?.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const certifiedCoursesCount = courses?.filter(course => course.grants_certificate).length || 0;
  const totalCoursesCount = courses?.length || 0;
  const certificationRate = totalCoursesCount > 0 
    ? Math.round((certifiedCoursesCount / totalCoursesCount) * 100) 
    : 0;

  return {
    courses,
    filteredCourses,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    updateCourseCertificate,
    certifiedCoursesCount,
    totalCoursesCount,
    certificationRate
  };
}
