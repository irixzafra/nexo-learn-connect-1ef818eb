import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarIcon, CheckCircle, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Course } from "@/types/course";

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
  const rating = course.rating || 4.5;
  const roundedRating = Math.floor(rating);
  const hasDiscount = course.price !== course.original_price && course.original_price !== undefined;
  const originalPrice = course.price;

  return (
    <section className="bg-primary/10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          {/* Course Image */}
          <div className="order-2 md:order-1">
            <motion.img
              src={course.cover_image_url || "https://via.placeholder.com/500x300"}
              alt={course.title}
              className="rounded-xl shadow-lg aspect-video w-full h-auto object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Course Information */}
          <div className="order-1 md:order-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <Badge className="bg-secondary/80 text-secondary-foreground rounded-full px-3 py-1.5 text-sm font-medium">
                {course.category || "General"}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {course.title}
              </h1>
              
              <p className="text-lg text-muted-foreground">
                {course.description || "Descripción no disponible"}
              </p>
              
              {/* Price and Enrollment */}
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">
                  {originalPrice === 0 ? "Gratis" : formatCurrency(originalPrice)}
                </span>
                {hasDiscount && course.original_price && (
                  <span className="text-lg line-through text-muted-foreground">
                    {formatCurrency(course.original_price)}
                  </span>
                )}
              </div>
              
              <Button 
                size="lg" 
                onClick={handleEnroll}
                disabled={isEnrolled || isEnrolling}
              >
                {isEnrolling ? "Procesando..." : isEnrolled ? "Ir al curso" : "Inscríbete ahora"}
              </Button>
              
              {/* Course Stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <StarIcon className="h-5 w-5 text-amber-500" />
                  <span>{rating} ({roundedRating}.0)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>{course.duration_text || "A tu ritmo"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>+1000 estudiantes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                  <span>{totalLessons} lecciones</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
