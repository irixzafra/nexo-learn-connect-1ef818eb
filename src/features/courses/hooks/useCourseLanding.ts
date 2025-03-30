
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useCourseDetails } from "./useCourseDetails";
import { useEnrollment } from "./useEnrollment";
import { useAuth } from "@/contexts/AuthContext";

export const useCourseLanding = (identifier: string, isSlug: boolean = false) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>(['faq-1']);
  
  // Obtener detalles del curso usando ID o slug
  const { course, modulesWithLessons, isLoading } = useCourseDetails(
    isSlug ? undefined : identifier,
    isSlug ? identifier : undefined
  );
  
  // Funcionalidad de inscripción
  const { 
    isEnrolled, 
    isEnrolling, 
    isChecking, 
    handleEnroll 
  } = useEnrollment(course?.id);
  
  // Calcular estadísticas del curso
  const totalLessons = modulesWithLessons?.reduce((acc, module) => 
    acc + (module.lessons?.length || 0), 0) || 0;
  
  const previewableLessons = modulesWithLessons?.reduce((acc, module) => 
    acc + (module.lessons?.filter(lesson => lesson.is_previewable)?.length || 0), 0) || 0;
  
  // Manejar inscripción
  const handleEnrollment = async () => {
    if (!isAuthenticated) {
      // Redirigir a login y guardar la URL actual para volver después
      const returnUrl = window.location.pathname;
      sessionStorage.setItem('redirectAfterLogin', returnUrl);
      navigate('/auth/login');
      toast({
        title: "Inicia sesión para inscribirte",
        description: "Necesitas tener una cuenta para inscribirte en el curso.",
      });
      return;
    }
    
    if (!course?.id) return;
    
    try {
      await handleEnroll();
      toast({
        title: "¡Inscripción exitosa!",
        description: "Te has inscrito correctamente al curso."
      });
    } catch (error) {
      console.error("Error al inscribirse:", error);
      toast({
        variant: "destructive",
        title: "Error de inscripción",
        description: "No se pudo completar la inscripción. Inténtalo de nuevo más tarde."
      });
    }
  };
  
  // Formateador de moneda
  const formatCurrency = (price: number, currency: string = 'eur') => {
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2
    });
    
    return formatter.format(price);
  };
  
  return {
    course,
    modulesWithLessons,
    isLoading,
    isEnrolled,
    isEnrolling,
    isChecking,
    handleEnroll: handleEnrollment,
    expandedFAQs,
    setExpandedFAQs,
    formatCurrency,
    totalLessons,
    previewableLessons
  };
};
