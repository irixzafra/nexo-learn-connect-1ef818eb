
import React from 'react';
import { usePostCategories } from '../hooks/useCommunityFeed';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarDays, MessageSquare, HelpCircle, Briefcase, Rocket, BookOpen, FileText, Flame } from 'lucide-react';

interface CategoryFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'general': <MessageSquare className="h-4 w-4 mr-1" />,
  'eventos': <CalendarDays className="h-4 w-4 mr-1" />,
  'preguntas': <HelpCircle className="h-4 w-4 mr-1" />,
  'empleos': <Briefcase className="h-4 w-4 mr-1" />,
  'proyectos': <Rocket className="h-4 w-4 mr-1" />,
  'recursos': <BookOpen className="h-4 w-4 mr-1" />,
  'tutoriales': <FileText className="h-4 w-4 mr-1" />,
  'debates': <Flame className="h-4 w-4 mr-1" />
};

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({ 
  selectedCategory, 
  onCategoryChange 
}) => {
  const { data: categories = [], isLoading } = usePostCategories();

  const getAllFilter = () => (
    <Button
      key="all"
      variant={selectedCategory === null ? "default" : "outline"}
      size="sm"
      className={cn(
        "rounded-full",
        selectedCategory === null ? "bg-primary text-primary-foreground" : "bg-background"
      )}
      onClick={() => onCategoryChange(null)}
    >
      All
    </Button>
  );

  if (isLoading) {
    return (
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-9 w-24 rounded-full bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {getAllFilter()}
      
      {categories.map(category => {
        // Normalizar el nombre de la categoría para buscar el icono
        const normalizedName = category.name.toLowerCase().trim();
        const icon = categoryIcons[normalizedName] || category.icon || null;
        
        return (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            className={cn(
              "rounded-full",
              selectedCategory === category.id ? "bg-primary text-primary-foreground" : "bg-background"
            )}
            onClick={() => onCategoryChange(category.id)}
          >
            {icon}
            {category.name}
          </Button>
        );
      })}
    </div>
  );
};
