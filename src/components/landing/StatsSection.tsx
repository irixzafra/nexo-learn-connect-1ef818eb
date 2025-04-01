
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Globe, Sparkles } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    { icon: <BookOpen className="h-6 w-6 text-primary" />, value: "200+", label: "Cursos disponibles", description: "Formación especializada en múltiples áreas" },
    { icon: <Users className="h-6 w-6 text-primary" />, value: "25.000+", label: "Estudiantes", description: "Comunidad internacional de aprendizaje" },
    { icon: <Award className="h-6 w-6 text-primary" />, value: "98%", label: "Tasa de satisfacción", description: "Valoración media de nuestros graduados" },
    { icon: <Globe className="h-6 w-6 text-primary" />, value: "40+", label: "Países", description: "Impacto global en la educación online" },
  ];

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Nuestro impacto</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transformando la educación en cifras</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre el alcance de nuestra plataforma y el impacto que estamos generando en la comunidad educativa global.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="font-medium text-lg mb-2">{stat.label}</p>
              <p className="text-muted-foreground text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Animated Blob Background */}
      <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl">
        <motion.div 
          className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, 40, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-secondary/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
};

export default StatsSection;
