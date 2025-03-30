
import React from 'react';
import { usePostCategories } from '../hooks/useCommunityFeed';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface FeedFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export const FeedFilters: React.FC<FeedFiltersProps> = ({ 
  selectedCategory, 
  onCategoryChange 
}) => {
  const { data: categories = [], isLoading } = usePostCategories();

  if (isLoading) {
    return (
      <div className="flex overflow-x-auto py-2 mb-4 gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 w-24 bg-muted rounded-full animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap mb-4">
      <div className="flex space-x-2 py-2">
        <Badge
          variant={selectedCategory === null ? "default" : "outline"}
          className={cn(
            "px-3 py-1 cursor-pointer hover:bg-secondary/80",
            selectedCategory === null 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary/50 hover:text-foreground"
          )}
          onClick={() => onCategoryChange(null)}
        >
          Todos
        </Badge>
        
        {categories.map(category => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={cn(
              "px-3 py-1 cursor-pointer hover:bg-secondary/80",
              selectedCategory === category.id 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary/50 hover:text-foreground"
            )}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.icon && <span className="mr-1">{category.icon}</span>}
            {category.name}
          </Badge>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
