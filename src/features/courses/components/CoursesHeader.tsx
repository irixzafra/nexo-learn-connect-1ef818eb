
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface CoursesHeaderProps {
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  onToggleFilters?: () => void;
}

export const CoursesHeader: React.FC<CoursesHeaderProps> = ({ 
  title = "Oferta Académica",
  subtitle = "Explora nuestra selección premium de programas formativos diseñados para potenciar tu carrera profesional",
  showFilters,
  onToggleFilters
}) => {
  return (
    <div className="text-center mb-12 md:mb-16">
      <motion.div
        className="flex items-center justify-center gap-2 mb-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GraduationCap className="h-6 w-6 text-primary" />
        <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
      </motion.div>
      
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
