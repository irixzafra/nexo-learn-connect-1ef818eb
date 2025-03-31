
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export const useEnrollment = (courseId: string) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { toast } = useToast();

  const checkEnrollmentStatus = async () => {
    if (!courseId || !user) {
      setIsChecking(false);
      return;
    }

    setIsChecking(true);
    try {
      const { data, error } = await supabase
        .from("enrollments")
        .select("id")
        .eq("course_id", courseId)
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      setIsEnrolled(!!data);
    } catch (error) {
      // Not enrolled (no enrollment found)
      setIsEnrolled(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && courseId) {
      checkEnrollmentStatus();
    } else {
      setIsChecking(false);
      setIsEnrolled(false);
    }
  }, [courseId, isAuthenticated, user?.id]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate("/auth/login", { state: { from: `/courses/${courseId}` } });
      return;
    }

    setIsEnrolling(true);
    try {
      // Get course details to check if it's paid
      const { data: course, error: courseError } = await supabase
        .from("courses")
        .select("price, currency")
        .eq("id", courseId)
        .single();

      if (courseError) throw courseError;

      if (course?.price && course.price > 0) {
        // For paid courses, redirect to payment page
        navigate(`/checkout/${courseId}`);
        return;
      }

      // For free courses, enroll directly
      const { error } = await supabase
        .from("enrollments")
        .insert({
          user_id: user?.id,
          course_id: courseId,
        });

      if (error) throw error;

      setIsEnrolled(true);
      toast({
        title: "¡Inscripción exitosa!",
        description: "Ahora tienes acceso a todo el contenido del curso",
      });

      // Redirect to course content
      navigate(`/courses/${courseId}/learn`);
    } catch (error: any) {
      console.error("Error enrolling in course:", error);
      toast({
        title: "Error",
        description: "No se pudo completar la inscripción",
        variant: "destructive",
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  return {
    isEnrolled,
    isEnrolling,
    isChecking,
    checkEnrollmentStatus,
    handleEnroll,
  };
};
