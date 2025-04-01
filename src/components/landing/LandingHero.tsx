
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Users, Layers, Zap, PaintBucket, Brain } from 'lucide-react';
import { routeMap } from '@/utils/routeUtils';

interface LandingHeroProps {
  isAuthenticated: boolean;
}

const LandingHero: React.FC<LandingHeroProps> = ({ isAuthenticated }) => {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-blue-50/80 to-white"></div>
      
      {/* Background patterns */}
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
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-[10%] w-40 h-40 rounded-full bg-blue-200/30 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-40 right-[15%] w-60 h-60 rounded-full bg-indigo-200/30 blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2] 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1 
        }}
      />

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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="group shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
                    <Link to="/home">
                      Ir al panel de control
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </motion.div>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="group shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
                      <Link to="/courses">
                        Explorar cursos
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" className="border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5" asChild>
                      <Link to="/auth/register">Crear cuenta</Link>
                    </Button>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
          
          {/* New Feature Highlights Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full mt-20"
          >
            {/* 3D Features Display */}
            <div className="relative max-w-6xl mx-auto">
              {/* Central Image */}
              <div className="relative z-10 aspect-video max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/public/lovable-uploads/5896bc74-e132-43f4-bfed-8b52fa73c627.png"
                  alt="Plataforma Nexo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Aprende, crea y comparte</h3>
                  <p className="text-white/90">Explora el siguiente nivel de aprendizaje creativo</p>
                </div>
              </div>
              
              {/* Feature Cards - Positioned Absolutely */}
              <div className="absolute grid grid-cols-3 gap-6 w-full -bottom-16 left-0 right-0 px-8 md:px-0">
                <motion.div 
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="bg-white rounded-xl shadow-lg p-5 border border-blue-100 hover:border-blue-300 transition-all duration-300"
                >
                  <div className="bg-blue-50 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                    <Sparkles className="text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Cursos Interactivos</h3>
                  <p className="text-sm text-muted-foreground">Experiencias de aprendizaje inmersivas con feedback en tiempo real</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="bg-white rounded-xl shadow-lg p-5 border border-indigo-100 hover:border-indigo-300 transition-all duration-300"
                >
                  <div className="bg-indigo-50 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Comunidad Activa</h3>
                  <p className="text-sm text-muted-foreground">Conecta con profesionales y crea oportunidades en el ecosistema creativo</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="bg-white rounded-xl shadow-lg p-5 border border-purple-100 hover:border-purple-300 transition-all duration-300"
                >
                  <div className="bg-purple-50 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                    <Layers className="text-purple-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Aprendizaje Adaptativo</h3>
                  <p className="text-sm text-muted-foreground">Contenido personalizado que se adapta a tu nivel y a tus objetivos</p>
                </motion.div>
              </div>
            </div>
            
            <div className="pt-32 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Zap className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">Innovación Constante</h3>
                <p className="text-sm text-muted-foreground">Nuestro contenido se actualiza continuamente con las últimas tendencias</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <PaintBucket className="h-10 w-10 text-green-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">Proyectos Prácticos</h3>
                <p className="text-sm text-muted-foreground">Aprende haciendo con proyectos reales y feedback personalizado</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Brain className="h-10 w-10 text-purple-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">IA Educativa</h3>
                <p className="text-sm text-muted-foreground">Sistemas inteligentes que optimizan tu trayectoria de aprendizaje</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Users className="h-10 w-10 text-amber-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">Mentorías</h3>
                <p className="text-sm text-muted-foreground">Acceso a mentores experimentados para guiar tu desarrollo profesional</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
