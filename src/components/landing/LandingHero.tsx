
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface LandingHeroProps {
  isAuthenticated: boolean;
}

const LandingHero: React.FC<LandingHeroProps> = ({ isAuthenticated }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 -z-10 opacity-30">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dotPattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="currentColor" className="text-primary/20" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Descubre el{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                ecosistema creativo
              </span>{' '}
              de Nexo
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Aprende y conecta con una comunidad de profesionales creativos.
              Cursos, recursos y networking para impulsar tu carrera.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              {isAuthenticated ? (
                <Button size="lg" className="group" asChild>
                  <Link to="/home">
                    Ir al panel de control
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" className="group" asChild>
                    <Link to="/courses">
                      Explorar cursos
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/auth/register">Crear cuenta</Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 w-full max-w-5xl"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/public/lovable-uploads/1905d13b-c9b8-4af8-ae8a-cffede4bb617.png"
                alt="Plataforma Nexo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
