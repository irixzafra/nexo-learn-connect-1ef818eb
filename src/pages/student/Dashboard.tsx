
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEnrolledCourses } from "@/features/courses/hooks/useEnrolledCourses";
import { useUserCoursesProgress } from "@/features/courses/hooks/useUserCoursesProgress";
import { CourseProgressBar } from "@/features/courses/components/CourseProgressBar";
import { BookOpen, Clock, Award, ChevronRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { enrolledCourses, isLoading: isLoadingCourses } = useEnrolledCourses(user?.id);
  
  // Get course IDs for progress calculation
  const courseIds = enrolledCourses ? enrolledCourses.map(course => course.id) : [];
  
  // Get course progress data
  const { coursesProgress, isLoading: isLoadingProgress } = useUserCoursesProgress(
    user?.id,
    courseIds
  );
  
  // Calculate recently active courses (those with progress)
  const recentCourses = React.useMemo(() => {
    if (!enrolledCourses) return [];
    
    // Sort by progress (focusing on in-progress courses)
    return [...enrolledCourses]
      .sort((a, b) => {
        const progressA = coursesProgress[a.id] || 0;
        const progressB = coursesProgress[b.id] || 0;
        
        // Prioritize courses that are in progress but not complete
        if (progressA > 0 && progressA < 100 && (progressB === 0 || progressB === 100)) return -1;
        if (progressB > 0 && progressB < 100 && (progressA === 0 || progressA === 100)) return 1;
        
        // Then sort by progress amount
        return progressB - progressA;
      })
      .slice(0, 3); // Take top 3
  }, [enrolledCourses, coursesProgress]);
  
  // Get next recommended course to continue
  const nextCourse = recentCourses[0];
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  const isLoading = isLoadingCourses || isLoadingProgress;
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold">Tu Aprendizaje</h1>
        <p className="text-muted-foreground">Bienvenido de nuevo, continúa tu aprendizaje donde lo dejaste</p>
      </motion.div>
      
      {enrolledCourses?.length === 0 ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Comienza tu viaje de aprendizaje</CardTitle>
            <CardDescription>
              Aún no te has inscrito en ningún curso. Explora nuestro catálogo para comenzar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/courses')}>Explorar cursos</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Continue Learning Section */}
          {nextCourse && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold mb-4">Continúa Aprendiendo</h2>
              <Card className="overflow-hidden">
                <div className="sm:flex">
                  <div className="relative h-48 sm:h-auto sm:w-1/3 bg-muted">
                    {nextCourse.cover_image_url && (
                      <img 
                        src={nextCourse.cover_image_url} 
                        alt={nextCourse.title} 
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4 sm:hidden">
                      <h3 className="text-white font-bold text-lg line-clamp-2">{nextCourse.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 sm:w-2/3 space-y-4">
                    <div className="hidden sm:block">
                      <h3 className="text-xl font-bold mb-2">{nextCourse.title}</h3>
                      <p className="text-muted-foreground line-clamp-2">{nextCourse.description}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Tu progreso</p>
                        <CourseProgressBar 
                          progress={coursesProgress[nextCourse.id] || 0}
                          size="md"
                        />
                      </div>
                      
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        {nextCourse.level && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>{nextCourse.level}</span>
                          </div>
                        )}
                        
                        {nextCourse.duration_text && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{nextCourse.duration_text}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button onClick={() => navigate(`/courses/${nextCourse.id}/learn`)}>
                        Continuar curso <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
          
          {/* My Courses Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Mis Cursos</h2>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/my-courses')}
                className="text-sm"
              >
                Ver todos <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {recentCourses.map((course) => (
                <motion.div key={course.id} variants={item}>
                  <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                    <div className="relative h-36 bg-muted">
                      {course.cover_image_url ? (
                        <img 
                          src={course.cover_image_url} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10">
                          <BookOpen className="h-10 w-10 text-primary/40" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <div className="bg-background/90 text-foreground text-xs rounded-full px-2 py-1 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {course.duration_text || "Curso completo"}
                        </div>
                      </div>
                    </div>
                    <CardContent className="flex-grow flex flex-col p-4">
                      <h3 className="font-semibold line-clamp-1 mb-2">{course.title}</h3>
                      
                      <div className="mt-2 mb-3">
                        <CourseProgressBar 
                          progress={coursesProgress[course.id] || 0}
                          size="sm"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          {coursesProgress[course.id] ? (
                            `${Math.round(coursesProgress[course.id])}% completado`
                          ) : (
                            "No comenzado"
                          )}
                        </p>
                      </div>
                      
                      <div className="mt-auto pt-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full"
                          onClick={() => navigate(`/courses/${course.id}/learn`)}
                        >
                          {coursesProgress[course.id] > 0 ? "Continuar" : "Comenzar"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </>
      )}
      
      {/* Course discovery section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12"
      >
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Descubre nuevos cursos</h2>
              <p className="text-muted-foreground max-w-lg">
                Explora nuestro catálogo y encuentra cursos que impulsen tu desarrollo profesional.
              </p>
            </div>
            <Button onClick={() => navigate('/courses')}>
              Ver catálogo completo
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
