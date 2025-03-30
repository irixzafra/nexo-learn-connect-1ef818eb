
import React from 'react';
import { motion } from 'framer-motion';

interface CoursesHeaderProps {
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  onToggleFilters?: () => void;
}

export const CoursesHeader: React.FC<CoursesHeaderProps> = ({ 
  title = "Explora Nuestros Cursos",
  subtitle = "Descubre contenido educativo de alta calidad creado por expertos en la industria",
  showFilters,
  onToggleFilters
}) => {
  return (
    <div className="text-center mb-12 md:mb-16">
      <motion.h1 
        className="text-3xl md:text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      <motion.p 
        className="text-lg text-muted-foreground max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
      
      {onToggleFilters && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={onToggleFilters}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            {showFilters ? 'Ocultar filtros avanzados' : 'Mostrar filtros avanzados'}
          </button>
        </motion.div>
      )}
    </div>
  );
};
