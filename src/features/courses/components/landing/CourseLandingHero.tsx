
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Course } from "@/types/course";

interface CourseLandingHeroProps {
  course: Course;
  totalLessons: number;
  isEnrolled: boolean;
  isEnrolling: boolean;
  handleEnroll: () => Promise<void>;
  formatCurrency: (price: number, currency: string) => string;
}

export const CourseLandingHero: React.FC<CourseLandingHeroProps> = ({
  course,
  totalLessons,
  isEnrolled,
  isEnrolling,
  handleEnroll,
  formatCurrency,
}) => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-background to-primary/5 pt-16 pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4">{course.level || 'Curso completo'}</Badge>
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{course.seo_description || course.description}</p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>{course.duration_text || "Curso completo"}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>{totalLessons} lecciones</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                <span>Acceso completo</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={handleEnroll}
                disabled={isEnrolled || isEnrolling}
              >
                {isEnrolled ? "Ya estás inscrito" : 
                 isEnrolling ? "Inscribiendo..." : 
                 course.price > 0 ? "Inscribirme por " + formatCurrency(course.price, course.currency) : "Inscribirme gratis"}
              </Button>
              
              {isEnrolled && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => navigate(`/courses/${course.id}/learn`)}
                >
                  Continuar aprendiendo
                </Button>
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block rounded-lg overflow-hidden shadow-xl"
          >
            {course.cover_image_url ? (
              <img 
                src={course.cover_image_url} 
                alt={course.title} 
                className="w-full h-[400px] object-cover"
              />
            ) : (
              <div className="w-full h-[400px] bg-muted flex items-center justify-center">
                <BookOpen className="h-24 w-24 text-muted-foreground/30" />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
