
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, UserCheck, Star, Award, Calendar, Check, ArrowRight, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { Course } from "@/types/course";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  return (
    <section 
      className={cn(
        "relative overflow-hidden pt-16 pb-24 md:min-h-[70vh] flex items-center",
        "bg-gradient-to-br from-primary/5 via-background to-background",
        "after:absolute after:inset-0 after:bg-noise-pattern after:opacity-30 after:z-0"
      )}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-40 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-primary text-primary-foreground">{course.level || 'Curso completo'}</Badge>
              {course.category && (
                <Badge variant="outline" className="border-primary/20 bg-primary/5">{course.category}</Badge>
              )}
              {course.rating && course.rating >= 4.5 && (
                <Badge className="bg-amber-500 text-white flex items-center gap-1">
                  <Star className="h-3 w-3 fill-white" />
                  <span>Top Rated</span>
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {course.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              {course.seo_description || course.description}
            </p>
            
            {course.featured_instructor && (
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{course.featured_instructor}</p>
                  <p className="text-sm text-muted-foreground">Instructor destacado</p>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Clock className="h-5 w-5" />
                  <span>Duración</span>
                </div>
                <div className="text-sm">{course.duration_text || "Acceso completo"}</div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <BookOpen className="h-5 w-5" />
                  <span>Lecciones</span>
                </div>
                <div className="text-sm">{totalLessons} lecciones completas</div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <UserCheck className="h-5 w-5" />
                  <span>Nivel</span>
                </div>
                <div className="text-sm">{course.level || "Todos los niveles"}</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={handleEnroll}
                disabled={isEnrolled || isEnrolling}
                className="shadow-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  {isEnrolled ? (
                    <>Ya estás inscrito</>
                  ) : isEnrolling ? (
                    <>Inscribiendo...</>
                  ) : course.price > 0 ? (
                    <>Inscribirme por {formatCurrency(course.price, course.currency)}</>
                  ) : (
                    <>Inscribirme gratis</>
                  )}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
              </Button>
              
              {isEnrolled && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => navigate(`/courses/${course.id}/learn`)}
                  className="group"
                >
                  Continuar aprendiendo
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              )}
            </div>
            
            {/* Garantía */}
            {course.price > 0 && (
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                  <Shield className="h-3 w-3 mr-1" /> 30 días de garantía
                </Badge>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-200">
                  <Crown className="h-3 w-3 mr-1" /> Certificado incluido
                </Badge>
              </div>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Fancy border decoration */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 opacity-70 blur-sm"></div>
              
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
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
                
                {/* Floating stats card */}
                <div className="absolute -bottom-6 -left-6 bg-card shadow-lg rounded-lg p-4 border border-border/50 backdrop-blur-sm bg-white/90 dark:bg-black/70 max-w-[280px]">
                  <h3 className="font-semibold text-lg mb-2">Lo que aprenderás</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">Dominarás los conceptos clave de este curso</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">Aplicarás conocimientos con ejercicios prácticos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span className="text-sm">Obtendrás un certificado al finalizar</span>
                    </li>
                  </ul>
                </div>
                
                {/* Floating price tag */}
                {course.price > 0 && (
                  <div className="absolute top-4 right-4 bg-white dark:bg-black shadow-lg rounded-full py-2 px-4 font-bold text-lg border-2 border-primary/20 flex items-center gap-2">
                    {formatCurrency(course.price, course.currency)}
                    {course.discount && course.discount > 0 && (
                      <span className="line-through text-sm text-muted-foreground">
                        {formatCurrency(course.price * (1 + course.discount/100), course.currency)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Missing component used in the hero
const Shield = ({ className }: { className?: string }) => {
  return (
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
};
