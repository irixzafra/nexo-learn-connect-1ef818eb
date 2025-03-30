
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Course } from "@/types/course";

interface CourseInfoSidebarProps {
  course: Course;
  totalLessons: number;
  previewableLessons: number;
  isEnrolled: boolean;
  isEnrolling: boolean;
  handleEnroll: () => Promise<void>;
  formatCurrency: (price: number) => string;
}

export const CourseInfoSidebar: React.FC<CourseInfoSidebarProps> = ({
  course,
  totalLessons,
  previewableLessons,
  isEnrolled,
  isEnrolling,
  handleEnroll,
  formatCurrency
}) => {
  // Check if there's a discount by comparing price and original_price
  const hasDiscount = course.original_price !== undefined && course.price !== course.original_price;
  const originalPrice = course.price;
  
  const benefits = [
    "Acceso de por vida al contenido",
    "Certificado de finalización",
    "Proyectos prácticos",
    "Recursos descargables",
    "Atención personalizada"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="col-span-1 space-y-6 lg:sticky lg:top-24"
    >
      {/* Tarjeta principal de información */}
      <Card className="overflow-hidden border border-primary/10 shadow-lg">
        {/* Cabecera con precio */}
        <div className="bg-primary/5 p-6">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-primary">
              {originalPrice === 0 ? "Gratis" : formatCurrency(originalPrice)}
            </span>
            {hasDiscount && course.original_price && (
              <span className="text-lg line-through text-muted-foreground">
                {formatCurrency(course.original_price)}
              </span>
            )}
          </div>
          
          <Button
            onClick={handleEnroll}
            disabled={isEnrolled || isEnrolling}
            className="mt-4 w-full"
            size="lg"
          >
            {isEnrolling ? (
              "Procesando..."
            ) : isEnrolled ? (
              "Continuar aprendiendo"
            ) : (
              "Inscribirme ahora"
            )}
          </Button>
          
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {originalPrice === 0 
              ? "Acceso completo sin costo" 
              : "30 días de garantía de devolución"}
          </p>
        </div>
        
        <CardContent className="p-6">
          {/* Información del curso */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Duración:</span>
              <span className="font-medium">{course.duration_text || "A tu ritmo"}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Nivel:</span>
              <span className="font-medium capitalize">{course.level || "Todos los niveles"}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Lecciones:</span>
              <span className="font-medium">{totalLessons}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Instructor:</span>
              <span className="font-medium">{course.featured_instructor || "Equipo Nexo"}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Categoría:</span>
              <Badge variant="outline" className="capitalize">
                {course.category || "General"}
              </Badge>
            </div>
            
            <Separator />
            
            {/* Acceso a contenido previo */}
            {!isEnrolled && previewableLessons > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Contenido disponible:</span>
                  <span className="font-medium">{previewableLessons} / {totalLessons} lecciones</span>
                </div>
                <Progress 
                  value={(previewableLessons / totalLessons) * 100} 
                  className="h-2"
                />
              </div>
            )}
          </div>
          
          {/* Beneficios del curso */}
          <div className="mt-6 space-y-4">
            <h4 className="font-medium">Este curso incluye:</h4>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Estadísticas del curso */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center rounded-lg bg-primary/5 p-3">
              <Users className="mb-1 h-5 w-5 text-primary" />
              <span className="text-xs text-center">+1000 Estudiantes</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg bg-primary/5 p-3">
              <Clock className="mb-1 h-5 w-5 text-primary" />
              <span className="text-xs text-center">Actualizado recientemente</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Certificación */}
      <Card className="border border-primary/10 shadow-sm overflow-hidden">
        <div className="p-6 flex items-start space-x-4">
          <Award className="h-8 w-8 text-amber-500 mt-1" />
          <div>
            <h3 className="font-medium mb-1">Certificado oficial</h3>
            <p className="text-sm text-muted-foreground">
              Obtén un certificado reconocido al completar el curso
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
