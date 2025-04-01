
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PublicLayout from '@/layouts/PublicLayout';
import { NexoLogo } from '@/components/ui/logo';
import EditModeToggle from '@/components/admin/EditModeToggle';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Compass, Award, Heart, Globe, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  const { user, userRole } = useAuth();
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };
  
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const AboutUsContent = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-50">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-blue-200/40 blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-indigo-200/40 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Nuestra historia
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Somos un ecosistema educativo innovador que fusiona tecnología, creatividad y comunidad para transformar la forma en que aprendemos y nos conectamos.
            </p>
            
            {/* Edit Mode Toggle for admin and sistemas users */}
            {(userRole === 'admin' || userRole === 'sistemas') && (
              <div className="flex justify-center mt-4">
                <EditModeToggle />
              </div>
            )}
          </motion.div>
        </div>
      </section>
      
      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="relative" variants={fadeIn}>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-lg"></div>
              <img 
                src="/lovable-uploads/f1432cd5-57e8-488e-a71c-d88ae7e3b0a2.png" 
                alt="Nuestra misión" 
                className="w-full h-auto object-cover rounded-lg shadow-xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-100 rounded-lg"></div>
            </motion.div>
            
            <motion.div className="space-y-6" variants={fadeIn}>
              <div className="inline-block px-4 py-2 bg-blue-100 rounded-full text-blue-800 font-medium mb-2">
                Nuestra misión
              </div>
              <h2 className="text-3xl font-bold">Crear un espacio donde la educación evoluciona</h2>
              <p className="text-lg text-muted-foreground">
                Buscamos democratizar el acceso al conocimiento digital y fomentar la innovación colaborativa, 
                creando un espacio donde la educación, la tecnología y la creatividad se unen para formar 
                una comunidad de aprendizaje continuo.
              </p>
              <div className="pt-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Aprendizaje continuo</h3>
                    <p className="text-muted-foreground">Cursos actualizados constantemente con las últimas tendencias</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="space-y-6 order-2 md:order-1" variants={fadeIn}>
              <div className="inline-block px-4 py-2 bg-indigo-100 rounded-full text-indigo-800 font-medium mb-2">
                Nuestra visión
              </div>
              <h2 className="text-3xl font-bold">Ser el puente entre el talento y las oportunidades</h2>
              <p className="text-lg text-muted-foreground">
                Aspiramos a convertirse en el punto de referencia para quienes desean aprender y crecer en 
                el ámbito digital. Queremos ser el puente que conecta el talento con las 
                oportunidades, y la creatividad con la tecnología.
              </p>
              <div className="pt-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <Compass className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Orientación profesional</h3>
                    <p className="text-muted-foreground">Guiamos tu crecimiento con mentores expertos en la industria</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div className="relative order-1 md:order-2" variants={fadeIn}>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-100 rounded-lg"></div>
              <img 
                src="/lovable-uploads/ab16dc8b-143e-45bb-8cd6-b634344e8e1f.png" 
                alt="Nuestra visión" 
                className="w-full h-auto object-cover rounded-lg shadow-xl relative z-10"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-100 rounded-lg"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6">Nuestros valores</h2>
            <p className="text-lg text-muted-foreground">
              Los principios que guían todas nuestras decisiones y definen quiénes somos como ecosistema.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Innovación</h3>
              <p className="text-muted-foreground">
                Buscamos constantemente nuevas formas de enseñar y aprender, abrazando la tecnología y los métodos pedagógicos más avanzados.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Comunidad</h3>
              <p className="text-muted-foreground">
                Creemos en el poder del aprendizaje colaborativo y compartido, fomentando conexiones significativas entre estudiantes y profesionales.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Accesibilidad</h3>
              <p className="text-muted-foreground">
                Trabajamos para que el conocimiento sea accesible para todos, eliminando barreras y creando oportunidades inclusivas de aprendizaje.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Global Impact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="flex-1" variants={fadeIn}>
              <div className="inline-block px-4 py-2 bg-blue-100 rounded-full text-blue-800 font-medium mb-4">
                Nuestro impacto
              </div>
              <h2 className="text-3xl font-bold mb-6">Transformando vidas a través de la educación</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Desde nuestros inicios, hemos ayudado a miles de estudiantes a desarrollar habilidades 
                que transforman sus carreras y sus vidas, creando un efecto multiplicador en sus comunidades.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <h3 className="text-3xl font-bold text-blue-600 mb-1">+15,000</h3>
                  <p className="text-sm text-muted-foreground">Estudiantes activos</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <h3 className="text-3xl font-bold text-indigo-600 mb-1">+25</h3>
                  <p className="text-sm text-muted-foreground">Países alcanzados</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <h3 className="text-3xl font-bold text-purple-600 mb-1">+300</h3>
                  <p className="text-sm text-muted-foreground">Instructores expertos</p>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 text-center">
                  <h3 className="text-3xl font-bold text-pink-600 mb-1">+1,200</h3>
                  <p className="text-sm text-muted-foreground">Proyectos completados</p>
                </div>
              </div>
              
              <Button size="lg" className="group" asChild>
                <Link to="/scholarships">
                  Conoce nuestras becas
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div className="flex-1 relative" variants={fadeIn}>
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/3]">
                  <img 
                    src="/lovable-uploads/76db81f1-1b84-4977-963b-69a243d7f86a.png"
                    alt="Impacto global" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <Globe className="h-10 w-10 mb-3" />
                    <h3 className="text-2xl font-bold mb-2">Alcance global</h3>
                    <p className="text-sm text-white/80">Conectando talentos y oportunidades alrededor del mundo</p>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-blue-200 to-indigo-200 rounded-2xl"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <NexoLogo className="h-16 w-auto mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">¿Quieres formar parte de nuestra comunidad?</h2>
            <p className="text-xl mb-8 text-white/80">
              Únete a Nexo y descubre un mundo de posibilidades para tu desarrollo profesional y personal.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="text-blue-600 font-medium" asChild>
                <Link to="/courses">
                  Explorar cursos
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white border-2 hover:bg-white/20" asChild>
                <Link to="/contact">
                  Contactar
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );

  // Use PublicLayout wrapper
  return (
    <PublicLayout>
      <AboutUsContent />
    </PublicLayout>
  );
};

export default AboutUs;
