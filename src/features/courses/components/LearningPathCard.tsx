
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Signal, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface LearningPathCategory {
  id: string;
  name: string;
  icon: React.ElementType;
}

interface LearningPathProps {
  id: string; // Changed from number to string
  title: string;
  description: string;
  image: string;
  courses: number;
  duration: string;
  level: string;
  categories: string[];
  badge?: string;
  index: number;
  availableCategories: {
    id: string;
    name: string;
    icon: React.ElementType;
  }[];
}

export const LearningPathCard: React.FC<LearningPathProps> = ({
  id,
  title,
  description,
  image,
  courses,
  duration,
  level,
  categories,
  badge,
  index,
  availableCategories
}) => {
  // Función para obtener el ícono de la categoría
  const getCategoryIcon = (categoryId: string) => {
    const category = availableCategories.find(c => c.id === categoryId);
    const Icon = category?.icon || BookOpen;
    return <Icon className="h-4 w-4" />;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link to={`/learning-paths/${id}`}>
        <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300">
          <div className="aspect-video relative">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            {badge && (
              <Badge className="absolute top-3 right-3 bg-primary">{badge}</Badge>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-4">
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>{courses} cursos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Signal className="h-4 w-4 text-primary" />
                <span>{level}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {categories.map(cat => (
                  <Badge key={cat} variant="outline" className="flex items-center gap-1">
                    {getCategoryIcon(cat)}
                    <span className="hidden sm:inline">{availableCategories.find(c => c.id === cat)?.name}</span>
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                Ver detalle <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};
