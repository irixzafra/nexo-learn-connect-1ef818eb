
import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { 
  Code, Database, TrendingUp, Palette, Brain, Smartphone, 
  HardDrive, Server, Shield, Blocks, BookOpen
} from "lucide-react";

interface CategorySelectorProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  categories: string[];
}

// Map para iconos de categorías
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Desarrollo Web": <Code className="mr-2 h-4 w-4" />,
  "Ciencia de Datos": <Database className="mr-2 h-4 w-4" />,
  "Marketing": <TrendingUp className="mr-2 h-4 w-4" />,
  "Diseño": <Palette className="mr-2 h-4 w-4" />,
  "Inteligencia Artificial": <Brain className="mr-2 h-4 w-4" />,
  "Desarrollo Móvil": <Smartphone className="mr-2 h-4 w-4" />,
  "Big Data": <Database className="mr-2 h-4 w-4" />,
  "Desarrollo Backend": <Server className="mr-2 h-4 w-4" />,
  "DevOps": <HardDrive className="mr-2 h-4 w-4" />,
  "Desarrollo de Videojuegos": <BookOpen className="mr-2 h-4 w-4" />,
  "Ciberseguridad": <Shield className="mr-2 h-4 w-4" />,
  "Blockchain": <Blocks className="mr-2 h-4 w-4" />,
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  const isMobile = useIsMobile();

  // Ordenar categorías
  const sortedCategories = [...categories].sort((a, b) => a.localeCompare(b));
  
  // Obtener el icono adecuado para cada categoría
  const getIcon = (category: string) => {
    return CATEGORY_ICONS[category] || <BookOpen className="mr-2 h-4 w-4" />;
  };

  // Container animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  // Item animation variants
  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="w-full">
      <ScrollArea className="w-full pb-4">
        <motion.div 
          className="flex space-x-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setSelectedCategory(null)}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Todos
            </Button>
          </motion.div>
          
          {sortedCategories.map((category) => (
            <motion.div key={category} variants={item}>
              <Button
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setSelectedCategory(category)}
              >
                {getIcon(category)}
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>
    </div>
  );
};
