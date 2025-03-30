
import { useState } from "react";
import { useCourseDetails } from "./useCourseDetails";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useCourseLanding = (courseIdentifier: string, isSlug: boolean = false) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);
  
  // Usar el hook de detalles del curso que hemos creado
  const { 
    course, 
    modules, 
    lessons, 
    modulesWithLessons, 
    isLoading,
    error 
  } = useCourseDetails(
    isSlug ? undefined : courseIdentifier, 
    isSlug ? courseIdentifier : undefined
  );

  // Verificar si el usuario está matriculado
  const { 
    data: enrollment, 
    isLoading: isCheckingEnrollment,
    refetch: refetchEnrollment
  } = useQuery({
    queryKey: ["enrollment", user?.id, course?.id],
    queryFn: async () => {
      if (!user?.id || !course?.id) return null;
      
      const { data, error } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", user.id)
        .eq("course_id", course.id)
        .maybeSingle();
      
      if (error) {
        console.error("Error checking enrollment:", error);
        return null;
      }
      
      return data;
    },
    enabled: !!user?.id && !!course?.id,
  });

  // Estado para el proceso de inscripción
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Función para inscribirse al curso
  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión para continuar",
        description: "Necesitas iniciar sesión para inscribirte a este curso",
        variant: "default",
      });
      navigate("/auth/login");
      return;
    }

    // Fixed: Using !!enrollment instead of isEnrolled variable which is defined later
    if (!!enrollment || !course || !user?.id) return;

    setIsEnrolling(true);

    try {
      // Si el curso es gratuito, inscribir directamente
      if (course.price === 0) {
        const { error } = await supabase
          .from("enrollments")
          .insert({ user_id: user.id, course_id: course.id });

        if (error) throw error;

        toast({
          title: "¡Inscripción exitosa!",
          description: "Has sido inscrito al curso correctamente",
          variant: "default",
        });

        // Refrescar el estado de inscripción
        await refetchEnrollment();
        
        // Redirigir al curso
        navigate(`/courses/${course.id}/learn`);
      } else {
        // Para cursos de pago, redirigir a la página de checkout (a implementar)
        console.log("Redirigiendo a checkout para curso de pago");
        navigate(`/checkout/${course.id}`);
      }
    } catch (error: any) {
      console.error("Error enrolling in course:", error);
      toast({
        title: "Error al inscribirse",
        description: error.message || "Ha ocurrido un error al inscribirte en el curso",
        variant: "destructive",
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  // Contar el total de lecciones y las lecciones previsualizables
  const totalLessons = lessons.length;
  const previewableLessons = lessons.filter(lesson => lesson.is_previewable).length;

  // Función para formatear el precio
  const formatCurrency = (price: number, currency: 'eur' | 'usd' = 'eur') => {
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.toUpperCase(),
    });
    
    return formatter.format(price);
  };

  return {
    course,
    modules,
    lessons,
    modulesWithLessons,
    isLoading,
    error,
    isEnrolled: !!enrollment,
    isEnrolling,
    isChecking: isCheckingEnrollment,
    handleEnroll,
    expandedFAQs,
    setExpandedFAQs,
    formatCurrency,
    totalLessons,
    previewableLessons
  };
};
