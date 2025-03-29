
import React from 'react';
import { motion } from 'framer-motion';

export const CoursesHeader: React.FC = () => {
  return (
    <div className="text-center mb-12 md:mb-16">
      <motion.h1 
        className="text-3xl md:text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explora Nuestros Cursos
      </motion.h1>
      <motion.p 
        className="text-lg text-muted-foreground max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Descubre contenido educativo de alta calidad creado por expertos en la industria
      </motion.p>
    </div>
  );
};
