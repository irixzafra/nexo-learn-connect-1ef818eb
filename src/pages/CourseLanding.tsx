
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourseLanding } from "@/features/courses/hooks/useCourseLanding";
import PublicLayout from "@/layouts/PublicLayout";
import { Loader2 } from "lucide-react";
import { CourseLandingHero } from "@/features/courses/components/landing/CourseLandingHero";
import { CourseOverview } from "@/features/courses/components/landing/CourseOverview";
import { CourseInfoSidebar } from "@/features/courses/components/landing/CourseInfoSidebar";
import { CourseCallToAction } from "@/features/courses/components/landing/CourseCallToAction";

const CourseLanding: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const {
    course,
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
  } = useCourseLanding(id || '');
  
  if (isLoading || isChecking) {
    return (
      <PublicLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PublicLayout>
    );
  }
  
  if (!course) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold mb-4">Curso no encontrado</h1>
          <p className="mb-6">El curso que estás buscando no está disponible o ha sido eliminado.</p>
          <button onClick={() => navigate('/courses')}>Ver todos los cursos</button>
        </div>
      </PublicLayout>
    );
  }
  
  return (
    <PublicLayout>
      {/* Hero Section */}
      <CourseLandingHero 
        course={course}
        totalLessons={totalLessons}
        isEnrolled={isEnrolled}
        isEnrolling={isEnrolling}
        handleEnroll={handleEnroll}
        formatCurrency={formatCurrency}
      />
      
      {/* Course Overview Section with Sidebar */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <CourseOverview 
                course={course}
                modulesWithLessons={modulesWithLessons || []}
                expandedFAQs={expandedFAQs}
                setExpandedFAQs={setExpandedFAQs}
              />
            </div>
            
            <CourseInfoSidebar 
              course={course}
              totalLessons={totalLessons}
              previewableLessons={previewableLessons}
              isEnrolled={isEnrolled}
              isEnrolling={isEnrolling}
              handleEnroll={handleEnroll}
              formatCurrency={formatCurrency}
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <CourseCallToAction 
        isEnrolled={isEnrolled}
        isEnrolling={isEnrolling}
        handleEnroll={handleEnroll}
      />
    </PublicLayout>
  );
};

export default CourseLanding;
