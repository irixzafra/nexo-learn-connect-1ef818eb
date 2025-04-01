
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Database, Code, LineChart, BookOpen, GraduationCap, 
  Briefcase, Gauge, Network, ShieldCheck, Wand2, 
  PenTool, PieChart, Share2, FileCode2, Laptop
} from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  categories: string[];
}

const categoryIcons: Record<string, React.ReactNode> = {
  'Big Data': <Database className="w-4 h-4 mr-2" />,
  'Blockchain': <Network className="w-4 h-4 mr-2" />,
  'Ciberseguridad': <ShieldCheck className="w-4 h-4 mr-2" />,
  'Ciencia de Datos': <PieChart className="w-4 h-4 mr-2" />,
  'Desarrollo Web': <Code className="w-4 h-4 mr-2" />,
  'DevOps': <Gauge className="w-4 h-4 mr-2" />,
  'Frontend': <FileCode2 className="w-4 h-4 mr-2" />,
  'Backend': <Laptop className="w-4 h-4 mr-2" />,
  'Gestión de Proyectos': <Briefcase className="w-4 h-4 mr-2" />,
  'IA': <Wand2 className="w-4 h-4 mr-2" />,
  'Marketing Digital': <Share2 className="w-4 h-4 mr-2" />,
  'Programación': <Code className="w-4 h-4 mr-2" />,
  'UX/UI': <PenTool className="w-4 h-4 mr-2" />,
  'Python': <Code className="w-4 h-4 mr-2" />,
  'JavaScript': <Code className="w-4 h-4 mr-2" />,
  'React': <Code className="w-4 h-4 mr-2" />,
  'Node.js': <Code className="w-4 h-4 mr-2" />,
  'Business Intelligence': <LineChart className="w-4 h-4 mr-2" />,
  'Certificación': <GraduationCap className="w-4 h-4 mr-2" />,
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  setSelectedCategory,
  categories = []
}) => {
  const isMobile = useIsMobile();
  const sortedCategories = [...categories].sort();
  
  // Include "Todos" as first category
  const allCategories = ['Todos', ...sortedCategories];
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === 'Todos' ? null : category);
  };

  return (
    <div className="container max-w-screen-xl mx-auto">
      <ScrollArea className="w-full" type="always">
        <div className="flex space-x-2 pb-2 pt-1 pr-4 no-scrollbar overflow-x-auto">
          {allCategories.map((category) => {
            const isSelected = 
              (category === 'Todos' && selectedCategory === null) || 
              category === selectedCategory;
            
            const icon = category === 'Todos' 
              ? <BookOpen className="w-4 h-4 mr-2" />
              : (categoryIcons[category] || <BookOpen className="w-4 h-4 mr-2" />);
              
            return (
              <Button
                key={category}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className={cn(
                  "flex-shrink-0 h-9 px-3 text-xs sm:text-sm whitespace-nowrap",
                  isSelected ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                )}
                onClick={() => handleCategoryClick(category)}
              >
                {icon}
                {category}
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
