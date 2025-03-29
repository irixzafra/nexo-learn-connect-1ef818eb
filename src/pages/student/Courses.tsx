
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Course } from "@/types/course";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Clock, BarChart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const StudentCourses: React.FC = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Obtener los cursos en los que el usuario está matriculado
        const { data: enrollments, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select('course_id')
          .eq('user_id', user.id);
        
        if (enrollmentsError) {
          console.error('Error fetching enrollments:', enrollmentsError);
          toast({
            title: "Error",
            description: "No se pudieron cargar tus cursos. Por favor, inténtalo de nuevo.",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }
        
        if (!enrollments || enrollments.length === 0) {
          setIsLoading(false);
          return;
        }
        
        const courseIds = enrollments.map(enrollment => enrollment.course_id);
        
        // Obtener los detalles de los cursos
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select(`
            id, 
            title, 
            description, 
            cover_image_url,
            duration_text,
            level,
            instructor_id,
            price,
            currency,
            is_published,
            created_at,
            updated_at,
            profiles:instructor_id (
              id, full_name
            )
          `)
          .in('id', courseIds);
        
        if (coursesError) {
          console.error('Error fetching courses:', coursesError);
          toast({
            title: "Error",
            description: "No se pudieron cargar los detalles de tus cursos.",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }
        
        // Transform the data to match Course type
        const formattedCourses = coursesData.map(course => {
          // The type of profiles from Supabase is { id: string, full_name: string } not an array
          const instructorData = course.profiles && typeof course.profiles === 'object' ? {
            id: course.profiles.id,
            full_name: course.profiles.full_name
          } : undefined;
          
          return {
            ...course,
            instructor: instructorData
          } as Course;
        });
        
        setEnrolledCourses(formattedCourses);
      } catch (error) {
        console.error('Error in fetchEnrolledCourses:', error);
        toast({
          title: "Error",
          description: "Ocurrió un error al cargar tus cursos.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEnrolledCourses();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Mis Cursos</h1>
      
      {isLoading ? (
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      ) : enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              {course.cover_image_url && (
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={course.cover_image_url} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                <CardDescription>
                  {course.instructor?.full_name ? `Instructor: ${course.instructor.full_name}` : ''}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {course.level && (
                    <div className="flex items-center gap-1">
                      <BarChart className="h-4 w-4" />
                      <span className="capitalize">{course.level}</span>
                    </div>
                  )}
                  {course.duration_text && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration_text}</span>
                    </div>
                  )}
                </div>
                
                <Button asChild className="w-full mt-4">
                  <Link to={`/courses/${course.id}/learn`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Continuar Aprendiendo
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-10 border rounded-lg bg-background">
          <h3 className="text-lg font-medium mb-2">No estás matriculado en ningún curso</h3>
          <p className="text-muted-foreground mb-4">Explora nuestro catálogo de cursos y matricúlate en los que te interesen.</p>
          <Button asChild>
            <Link to="/courses">Ver Cursos Disponibles</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
