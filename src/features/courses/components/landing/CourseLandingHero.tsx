
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Course } from "@/types/courses";
import { useIsMobile } from "@/hooks/use-mobile";

interface CourseLandingHeroProps {
  course: Course;
  totalLessons: number;
  isEnrolled: boolean;
  isEnrolling: boolean;
  handleEnroll: () => Promise<void>;
  formatCurrency: (price: number) => string;
}

export const CourseLandingHero: React.FC<CourseLandingHeroProps> = ({
  course,
  totalLessons,
  isEnrolled,
  isEnrolling,
  handleEnroll,
  formatCurrency
}) => {
  const isMobile = useIsMobile();
  
  // Estilo de fondo para cuando hay imagen de portada
  const backgroundStyle = course.cover_image_url
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.85)), url(${course.cover_image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
      };
  
  // Función para renderizar calificación con estrellas
  const renderRating = () => {
    const rating = 4.7; // Rating de ejemplo
    return (
      <div className="flex items-center">
        <div className="flex mr-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= Math.floor(rating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : star - 0.5 <= rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        <span className="mx-1.5 text-sm text-gray-400">•</span>
        <span className="text-sm text-gray-400">328 valoraciones</span>
      </div>
    );
  };

  // Animación para elementos
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Asumimos que no hay descuento si no existe en el tipo
  const hasDiscount = false;
  const originalPrice = course.price;

  return (
    <section
      className="relative py-12 md:py-20 overflow-hidden"
      style={backgroundStyle}
    >
      {/* Patrones de fondo */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Círculos decorativos */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto md:text-center"
        >
          {/* Badges de categoría y nivel */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap gap-2 mb-4 md:justify-center"
          >
            {course.category && (
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {course.category}
              </Badge>
            )}
            {course.level && (
              <Badge variant="outline" className="capitalize bg-secondary/10 text-secondary border-secondary/20">
                {course.level}
              </Badge>
            )}
          </motion.div>
          
          {/* Título del curso */}
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-white"
          >
            {course.title}
          </motion.h1>
          
          {/* Descripción del curso */}
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-200 mb-6 max-w-3xl mx-auto"
          >
            {course.description}
          </motion.p>
          
          {/* Valoraciones */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4 mb-8 text-white md:justify-center"
          >
            {renderRating()}
            <span className="text-gray-300">•</span>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-gray-300" />
              <span className="text-sm">+1000 estudiantes</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-gray-300" />
              <span className="text-sm">Actualizado recientemente</span>
            </div>
          </motion.div>
          
          {/* Pricing */}
          <motion.div 
            variants={fadeInUp}
            className="flex items-baseline gap-2 mb-8 md:justify-center"
          >
            <span className="text-3xl font-bold text-white">
              {originalPrice === 0 ? "Gratis" : formatCurrency(originalPrice)}
            </span>
            {hasDiscount && (
              <span className="text-lg line-through text-gray-400">
                {formatCurrency(originalPrice)}
              </span>
            )}
          </motion.div>
          
          {/* Call to action */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 sm:items-center justify-center"
          >
            <Button 
              size="lg" 
              onClick={handleEnroll}
              disabled={isEnrolled || isEnrolling}
              className="relative group overflow-hidden bg-primary hover:bg-primary/90"
            >
              <span className="relative z-10 flex items-center">
                {isEnrolling ? (
                  "Procesando..."
                ) : isEnrolled ? (
                  "Continuar aprendiendo"
                ) : (
                  <>
                    Inscribirme ahora
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
            </Button>
            
            {/* Progress indicator */}
            <div className="flex items-center text-white text-sm">
              <Clock className="mr-2 h-4 w-4" />
              <span>{course.duration_text || "Aprende a tu ritmo"}</span>
              <span className="mx-2">•</span>
              <span>{totalLessons} lecciones</span>
            </div>
          </motion.div>
          
          {/* Instructor */}
          {course.featured_instructor && (
            <motion.div 
              variants={fadeInUp}
              className="mt-8 flex items-center justify-center gap-2"
            >
              <span className="text-sm text-gray-300">Creado por </span>
              <span className="font-medium text-white">{course.featured_instructor}</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
