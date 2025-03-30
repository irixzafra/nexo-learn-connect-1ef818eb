
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourseLanding } from "@/features/courses/hooks/useCourseLanding";
import PublicLayout from "@/layouts/PublicLayout";
import { Loader2 } from "lucide-react";
import { CourseLandingHero } from "@/features/courses/components/landing/CourseLandingHero";
import { CourseOverview } from "@/features/courses/components/landing/CourseOverview";
import { CourseInfoSidebar } from "@/features/courses/components/landing/CourseInfoSidebar";
import { CourseCallToAction } from "@/features/courses/components/landing/CourseCallToAction";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CourseLanding: React.FC = () => {
  // Obtener ID o slug desde los parámetros
  const { id, courseId, slug } = useParams<{ id?: string; courseId?: string; slug?: string }>();
  const navigate = useNavigate();
  
  // Usar el ID si está disponible, de lo contrario usar el slug
  const identifier = id || courseId || slug || '';
  const isSlug = !id && !courseId && !!slug;
  
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
    formatCurrency: formatCurrencyFn,
    totalLessons,
    previewableLessons
  } = useCourseLanding(identifier, isSlug);
  
  // Create a wrapper function that matches the expected signature
  const formatCurrency = (price: number) => {
    return formatCurrencyFn(price);
  };

  if (isLoading || isChecking) {
    return (
      <PublicLayout>
        <div className="flex flex-col justify-center items-center min-h-[70vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg text-muted-foreground">Cargando información del curso...</p>
        </div>
      </PublicLayout>
    );
  }
  
  if (!course) {
    return (
      <PublicLayout>
        <div className="container mx-auto px-4 py-24 max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-6">Curso no encontrado</h1>
          <p className="text-lg text-muted-foreground mb-10">El curso que estás buscando no está disponible o ha sido eliminado.</p>
          <Button size="lg" onClick={() => navigate('/courses')}>
            Ver todos los cursos
          </Button>
        </div>
      </PublicLayout>
    );
  }
  
  return (
    <PublicLayout>
      {/* SEO Optimization */}
      <Helmet>
        <title>{course.seo_title || course.title}</title>
        <meta name="description" content={course.seo_description || course.description} />
        <meta property="og:title" content={course.seo_title || course.title} />
        <meta property="og:description" content={course.seo_description || course.description} />
        {course.cover_image_url && <meta property="og:image" content={course.cover_image_url} />}
        <meta property="og:type" content="website" />
        <meta name="keywords" content={`curso, educación, aprendizaje, ${course.title}, ${course.category}`} />
        <meta name="author" content={course.featured_instructor || 'Nexo Learning'} />
      </Helmet>
      
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
      <section className="py-12 md:py-16 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <CourseOverview 
              course={course}
              modulesWithLessons={modulesWithLessons || []}
              expandedFAQs={expandedFAQs}
              setExpandedFAQs={setExpandedFAQs}
            />
            
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
      
      {/* Related Courses or Testimonials Section could be added here */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros estudiantes</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Descubre por qué miles de estudiantes nos eligen para su formación profesional.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-background p-6 rounded-xl border shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-5 w-5 text-amber-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="italic text-muted-foreground mb-6 text-sm text-left">
                    "{['Este curso superó todas mis expectativas. El contenido es excelente y muy bien estructurado.',
                      'Increíble experiencia de aprendizaje. Los conceptos se explican de forma clara y concisa.',
                      'Gracias a este curso he podido mejorar mis habilidades y conseguir un mejor trabajo.'][i-1]}"
                  </p>
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">{['María G.', 'Carlos R.', 'Elena M.'][i-1]}</p>
                      <p className="text-xs text-muted-foreground">Estudiante verificado</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default CourseLanding;
