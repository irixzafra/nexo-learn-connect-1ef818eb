
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface CallToActionSectionProps {
  isAuthenticated?: boolean;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ isAuthenticated = false }) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-tr from-primary/20 via-primary/10 to-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Invierte en tu futuro con nuestra formación de calidad
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Da el primer paso hacia tu crecimiento profesional y accede a contenidos de primer nivel, mentorías personalizadas y una comunidad de profesionales.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                "Metodología práctica orientada a resultados",
                "Flexibilidad para aprender a tu ritmo",
                "Instructores expertos en activo en la industria",
                "Certificaciones reconocidas por empresas líderes"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group">
                <Link to="/courses">
                  Explorar cursos
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              {!isAuthenticated && (
                <Button asChild variant="outline" size="lg">
                  <Link to="/auth/register">
                    Crear cuenta gratuita
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-[4/3] md:aspect-video relative bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl overflow-hidden">
                <motion.div
                  initial={{ scale: 0.95 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                    alt="Estudiantes aprendiendo juntos" 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </motion.div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute -bottom-8 -left-8 bg-background p-4 rounded-xl shadow-lg max-w-xs"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="https://randomuser.me/api/portraits/women/42.jpg" 
                    alt="Estudiante" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Laura Pérez</p>
                  <p className="text-sm text-muted-foreground">"Mi mejor decisión fue invertir en mi educación con Nexo Learning"</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -z-10 top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute -z-10 -top-10 -left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -z-10 bottom-10 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      
      {/* Abstract shapes */}
      <div className="absolute top-1/4 left-1/4 w-12 h-12 border-4 border-primary/20 rounded-full hidden lg:block"></div>
      <div className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-secondary/30 rounded-full hidden lg:block"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-4 bg-primary/10 rounded-full hidden lg:block"></div>
    </section>
  );
};

export default CallToActionSection;
