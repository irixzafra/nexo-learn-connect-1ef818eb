
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Zap, Globe, Award, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Cursos de Calidad',
    description: 'Contenido actualizado y creado por expertos de la industria'
  },
  {
    icon: Users,
    title: 'Comunidad Activa',
    description: 'Conecta con profesionales y expande tu red de contactos'
  },
  {
    icon: Zap,
    title: 'Aprendizaje Ágil',
    description: 'Metodología práctica para una rápida aplicación de conocimientos'
  },
  {
    icon: Globe,
    title: 'Acceso Global',
    description: 'Disponible en cualquier momento y desde cualquier dispositivo'
  },
  {
    icon: Award,
    title: 'Certificaciones',
    description: 'Obtén reconocimiento oficial al completar tus cursos'
  },
  {
    icon: ShieldCheck,
    title: 'Contenido Actualizado',
    description: 'Materiales siempre al día con las últimas tendencias'
  }
];

const FeatureGrid: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">¿Por qué elegir Nexo?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nuestra plataforma ofrece todo lo que necesitas para avanzar en tu carrera creativa
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border/50"
              variants={item}
            >
              <div className="bg-primary/10 p-3 inline-flex rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureGrid;
