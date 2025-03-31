
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Lesson } from "@/types/course";
import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { CourseNotesList } from "@/features/lessons/components/CourseNotesList";

const CourseNotes: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [courseName, setCourseName] = useState("");
  const [lessons, setLessons] = useState<Array<{ id: string; title: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
      if (user) {
        checkEnrollmentStatus();
      } else {
        setIsLoading(false);
      }
    }
  }, [courseId, user]);

  const checkEnrollmentStatus = async () => {
    if (!user || !courseId) {
      setIsEnrolled(false);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      setIsEnrolled(!!data);
    } catch (error) {
      console.error("Error checking enrollment status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourseData = async () => {
    setIsLoading(true);
    try {
      // Obtener el nombre del curso
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("title")
        .eq("id", courseId)
        .single();

      if (courseError) throw courseError;
      setCourseName(courseData.title);

      // Obtener todas las lecciones del curso
      const { data: lessonData, error: lessonError } = await supabase
        .from("lessons")
        .select("id, title")
        .eq("course_id", courseId)
        .order("lesson_order", { ascending: true });

      if (lessonError) throw lessonError;
      setLessons(lessonData);
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6 flex justify-center items-center min-h-[80vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  if (!isEnrolled && !user) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Acceso restringido</h2>
            <p className="mb-6">Debes iniciar sesión para acceder a esta página.</p>
            <Button 
              onClick={() => navigate('/auth/login', { state: { from: `/courses/${courseId}/notes` } })}
            >
              Iniciar sesión
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!isEnrolled) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Acceso restringido</h2>
            <p className="mb-6">Debes inscribirte en este curso para acceder a las notas.</p>
            <Button onClick={() => navigate(`/courses/${courseId}`)}>
              Ver detalles del curso
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(`/courses/${courseId}/learn`)}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Volver al curso
          </Button>
          <h1 className="text-2xl font-bold">Mis notas: {courseName}</h1>
          <p className="text-muted-foreground mt-1">
            Todas tus notas del curso organizadas por lecciones
          </p>
        </div>

        {user && courseId && (
          <CourseNotesList
            userId={user.id}
            courseId={courseId}
            lessons={lessons}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default CourseNotes;
