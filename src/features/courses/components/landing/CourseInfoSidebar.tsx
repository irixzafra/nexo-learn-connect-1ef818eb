
import React from "react";
import { useNavigate } from "react-router-dom";
import { Course } from "@/types/course";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, BookOpen, FileText, Award, UserCheck, Heart, PlayCircle, ShieldCheck, ArrowRight, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CourseInfoSidebarProps {
  course: Course;
  totalLessons: number;
  previewableLessons: number;
  isEnrolled: boolean;
  isEnrolling: boolean;
  handleEnroll: () => Promise<void>;
  formatCurrency: (price: number, currency: string) => string;
}

export const CourseInfoSidebar: React.FC<CourseInfoSidebarProps> = ({
  course,
  totalLessons,
  previewableLessons,
  isEnrolled,
  isEnrolling,
  handleEnroll,
  formatCurrency,
}) => {
  const navigate = useNavigate();
  
  // Random stats for UI enhancement
  const studentsEnrolled = course.student_count || Math.floor(Math.random() * 500) + 50;
  const recentEnrollments = Math.floor(Math.random() * 20) + 5;
  const availableSeats = Math.floor(Math.random() * 30) + 10;
  const limitedOffer = Math.random() > 0.5;
  const discount = course.discount || Math.floor(Math.random() * 30) + 10;
  const originalPrice = course.price > 0 ? course.price * (1 + discount/100) : 0;
  const randomProgressValue = Math.floor(Math.random() * 70) + 20;

  return (
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <Card className="shadow-lg border-primary/20 overflow-hidden">
          {course.price > 0 && (
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 relative">
              <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                <div className="bg-yellow-500 text-xs text-black font-bold text-center py-1 shadow-lg -rotate-45 transform origin-top-left absolute top-0 right-[-65px] w-[150px]">
                  {discount}% OFF
                </div>
              </div>
              
              <div className="flex items-end gap-3">
                <CardTitle className="text-3xl">{formatCurrency(course.price, course.currency)}</CardTitle>
                {originalPrice > 0 && (
                  <span className="text-lg line-through opacity-70">{formatCurrency(originalPrice, course.currency)}</span>
                )}
              </div>
              
              {limitedOffer && (
                <div className="mt-2 text-sm flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Oferta especial - Quedan {availableSeats} plazas</span>
                </div>
              )}
            </div>
          )}
          
          {course.price === 0 && (
            <div className="bg-green-500 text-white p-4">
              <CardTitle className="text-2xl mb-1">Curso Gratuito</CardTitle>
              <p className="text-sm opacity-90">Acceso completo sin costo</p>
            </div>
          )}
          
          <CardContent className="space-y-6 p-6">
            {limitedOffer && course.price > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Plazas cubiertas</span>
                  <span className="font-semibold">{randomProgressValue}%</span>
                </div>
                <Progress value={randomProgressValue} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Solo quedan <span className="text-primary font-semibold">{availableSeats} plazas</span> con este precio
                </p>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-primary" />
              <span>{studentsEnrolled} estudiantes ya inscritos</span>
            </div>
            
            {recentEnrollments > 0 && (
              <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200 w-full justify-center py-1">
                <Users className="h-3.5 w-3.5 mr-1" />
                {recentEnrollments} personas se inscribieron recientemente
              </Badge>
            )}
            
            <div className="space-y-1">
              <h4 className="font-medium">Este curso incluye:</h4>
              <ul className="space-y-3 mt-2">
                <li className="flex gap-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <span>{course.duration_text || "Acceso completo"}</span>
                    <p className="text-xs text-muted-foreground">Aprende a tu ritmo</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <span>{totalLessons} lecciones</span>
                    <p className="text-xs text-muted-foreground">Contenido estructurado</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <span>Recursos descargables</span>
                    <p className="text-xs text-muted-foreground">PDF, ejercicios y plantillas</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Award className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <span>Certificado de finalización</span>
                    <p className="text-xs text-muted-foreground">Acreditación oficial</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
              >
                <Heart className="h-4 w-4 mr-2" />
                Guardar
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                Vista previa
              </Button>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-3 p-6 pt-0">
            <Button 
              className="w-full text-base group relative overflow-hidden shadow-md"
              size="lg"
              onClick={handleEnroll}
              disabled={isEnrolled || isEnrolling}
            >
              <span className="relative z-10 flex items-center">
                {isEnrolled ? "Ya estás inscrito" : 
                isEnrolling ? "Inscribiendo..." : 
                "Inscribirme ahora"}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
            </Button>
            
            {isEnrolled && (
              <Button 
                variant="outline" 
                className="w-full group"
                onClick={() => navigate(`/courses/${course.id}/learn`)}
              >
                Ir al curso
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
            
            {course.price > 0 && (
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-2">
                <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                <span>30 días de garantía de devolución</span>
              </div>
            )}
          </CardFooter>
        </Card>
        
        {course.featured_instructor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mt-6 overflow-hidden">
              <CardHeader className="bg-muted/30 pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  Instructor
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">{course.featured_instructor}</h4>
                    <p className="text-sm text-muted-foreground mb-2">Instructor certificado</p>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-current" />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">({Math.floor(Math.random() * 500) + 100} valoraciones)</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {Math.floor(Math.random() * 80) + 20} cursos • {Math.floor(Math.random() * 50000) + 10000} estudiantes
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="mt-6 border-amber-200 bg-amber-50/50 dark:bg-amber-900/10 dark:border-amber-900/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Comienza cuando quieras</h4>
                  <p className="text-sm text-muted-foreground">
                    Acceso inmediato tras la inscripción. Avanza a tu propio ritmo con acceso completo a todos los materiales.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

// Missing icons used in the sidebar
const ShieldCheck = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const Star = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
