
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import LandingNav from '@/components/LandingNav';
import { motion } from 'framer-motion';
import { BookOpen, Award, Users } from 'lucide-react';

const LandingPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Descubre el <span className="text-primary">ecosistema creativo</span> de Nexo
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Aprende y conecta con una comunidad de profesionales creativos. 
            Cursos, recursos y networking para impulsar tu carrera.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {isAuthenticated ? (
              <Button size="lg" asChild>
                <Link to="/home">Ir al panel de control</Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/courses">Explorar cursos</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/auth/register">Crear cuenta</Link>
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Feature sections linking to new pages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <motion.div 
            className="bg-accent/50 rounded-lg p-6 text-center flex flex-col items-center"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Cursos</h2>
            <p className="text-muted-foreground mb-4">
              Explora nuestra amplia biblioteca de cursos diseñados por expertos en diversas áreas.
            </p>
            <Button asChild variant="link" className="mt-auto">
              <Link to="/courses">Ver Cursos</Link>
            </Button>
          </motion.div>
          
          <motion.div 
            className="bg-accent/50 rounded-lg p-6 text-center flex flex-col items-center"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Becas y Ayudas</h2>
            <p className="text-muted-foreground mb-4">
              Descubre nuestros programas de becas y opciones de financiación para tu educación.
            </p>
            <Button asChild variant="link" className="mt-auto">
              <Link to="/scholarships">Conocer Más</Link>
            </Button>
          </motion.div>
          
          <motion.div 
            className="bg-accent/50 rounded-lg p-6 text-center flex flex-col items-center"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Nosotros</h2>
            <p className="text-muted-foreground mb-4">
              Conoce más sobre nuestra historia, misión y el equipo detrás de Nexo.
            </p>
            <Button asChild variant="link" className="mt-auto">
              <Link to="/about-us">Conocer Nexo</Link>
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
