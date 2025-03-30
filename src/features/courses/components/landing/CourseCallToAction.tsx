
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Users, Award, BookOpen } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface CourseCallToActionProps {
  isEnrolled: boolean;
  isEnrolling: boolean;
  handleEnroll: () => Promise<void>;
}

export const CourseCallToAction: React.FC<CourseCallToActionProps> = ({
  isEnrolled,
  isEnrolling,
  handleEnroll,
}) => {
  const isMobile = useIsMobile();

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with subtle patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background"></div>
      <div className="absolute inset-0 bg-noise-pattern opacity-30"></div>
      
      {/* Animated circles */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-5xl mx-auto"
        >
          <div className="md:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
              ¿Listo para dar el siguiente paso?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Únete a miles de estudiantes que ya están mejorando sus habilidades y avanzando en sus carreras.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <span>Acceso de por vida a todos los materiales</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <span>Certificado oficial al completar el curso</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <span>Aprende a tu ritmo, sin plazos ni presiones</span>
              </li>
            </ul>
            
            <Button 
              size="lg" 
              onClick={handleEnroll}
              disabled={isEnrolled || isEnrolling}
              className="group shadow-lg relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {isEnrolled ? "Continuar aprendiendo" : "Inscribirme ahora"}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
            </Button>
            
            {!isEnrolled && (
              <p className="text-sm text-muted-foreground mt-3">
                30 días de garantía de devolución, sin riesgos
              </p>
            )}
          </div>
          
          <div className="md:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card/80 backdrop-blur-sm border border-primary/10 p-6 rounded-xl"
              >
                <Users className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Comunidad activa</h3>
                <p className="text-muted-foreground">
                  Únete a una comunidad de estudiantes y profesionales para compartir conocimientos.
                </p>
              </Card>
              
              <Card
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card/80 backdrop-blur-sm border border-primary/10 p-6 rounded-xl"
              >
                <Award className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Certificación profesional</h3>
                <p className="text-muted-foreground">
                  Obtén un certificado reconocido al completar satisfactoriamente el curso.
                </p>
              </Card>
              
              <Card
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-card/80 backdrop-blur-sm border border-primary/10 p-6 rounded-xl sm:col-span-2"
              >
                <BookOpen className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Contenido actualizado</h3>
                <p className="text-muted-foreground">
                  Materiales constantemente actualizados para mantenerte al día con las últimas tendencias e innovaciones del sector.
                </p>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Custom motion div for cards
const Card = motion.div;
