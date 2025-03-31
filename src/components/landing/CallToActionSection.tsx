
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CallToActionSectionProps {
  isAuthenticated: boolean;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ isAuthenticated }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/90 to-blue-600 rounded-3xl p-8 md:p-16 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Comienza tu viaje de aprendizaje hoy
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            Únete a miles de profesionales que están transformando sus carreras con nuestros cursos especializados
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Button size="lg" variant="secondary" className="group" asChild>
                <Link to="/home">
                  Ir a mi panel
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" variant="secondary" className="group" asChild>
                  <Link to="/courses">
                    Explorar cursos
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20" asChild>
                  <Link to="/auth/register">
                    Crear cuenta gratuita
                  </Link>
                </Button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToActionSection;
