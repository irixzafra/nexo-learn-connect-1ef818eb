import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronRight, BookOpen, Users, Bell, Settings, Award, Layout } from 'lucide-react';

export const PlatformTourStep: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      title: 'Panel de Control',
      description: 'Tu punto de partida con resumen de tus cursos y actividades recientes.',
      icon: <Layout className="h-5 w-5" />,
    },
    {
      title: 'Mis Cursos',
      description: 'Accede a todos tus cursos inscritos y continúa aprendiendo donde lo dejaste.',
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: 'Comunidad',
      description: 'Conecta con otros estudiantes y participa en discusiones sobre los cursos.',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: 'Notificaciones',
      description: 'Mantente al día con anuncios de cursos, mensajes y actualizaciones importantes.',
      icon: <Bell className="h-5 w-5" />,
    },
    {
      title: 'Logros',
      description: 'Gana insignias y certificados a medida que progresas en tu aprendizaje.',
      icon: <Award className="h-5 w-5" />,
    },
    {
      title: 'Configuración',
      description: 'Personaliza tu experiencia y gestiona tus preferencias de cuenta.',
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-2">Conoce la plataforma</h2>
        <p className="text-muted-foreground">
          Explora las principales funcionalidades que encontrarás en Nexo
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-colors duration-200 flex items-center",
                  activeFeature === index
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent/50"
                )}
                onClick={() => setActiveFeature(index)}
              >
                <span className="mr-3">{feature.icon}</span>
                <span className="font-medium">{feature.title}</span>
                {activeFeature === index && (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="bg-accent/30 rounded-lg p-4 flex items-center">
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              {features[activeFeature].icon}
            </div>
            <h3 className="font-semibold text-lg">
              {features[activeFeature].title}
            </h3>
            <p className="text-muted-foreground">
              {features[activeFeature].description}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PlatformTourStep;
