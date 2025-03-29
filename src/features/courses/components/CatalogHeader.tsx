
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface CatalogHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const CatalogHeader: React.FC<CatalogHeaderProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="mb-6">
      <motion.div 
        className="flex flex-col md:flex-row md:items-start md:justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Catálogo de Cursos</h1>
            <div className="ml-2 hidden sm:flex">
              <Sparkles className="h-5 w-5 text-amber-500" />
            </div>
          </motion.div>
          <motion.p 
            className="text-muted-foreground mt-2 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Explora nuestros cursos y comienza a aprender hoy mismo con contenido creado por expertos en la industria. Personaliza tu búsqueda utilizando los filtros avanzados.
          </motion.p>
        </div>
        
        <motion.div 
          className="relative mt-4 md:mt-0 md:w-[300px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar cursos, temas, instructores..."
            className="pl-8 w-full bg-background border-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
