
import React, { useState } from 'react';
import { X, Plus, Tag as TagIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ElementTaggerProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  className?: string;
}

const ElementTagger: React.FC<ElementTaggerProps> = ({ 
  tags = [], 
  onChange,
  className
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTag = () => {
    if (inputValue.trim()) {
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        const newTags = [...tags, newTag];
        onChange(newTags);
      }
      setInputValue('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setInputValue('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    onChange(newTags);
  };

  return (
    <div className={cn("flex flex-wrap gap-2 items-center", className)}>
      {tags.map(tag => (
        <Badge 
          key={tag} 
          variant="outline" 
          className="flex items-center gap-1 bg-primary/5 border-primary/20"
        >
          <TagIcon className="h-3 w-3 text-primary/70" />
          <span>{tag}</span>
          <Button
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground rounded-full"
            onClick={() => handleRemoveTag(tag)}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove tag</span>
          </Button>
        </Badge>
      ))}

      {isAdding ? (
        <div className="flex items-center gap-1">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="Añadir etiqueta..."
            className="h-7 py-1 px-2 text-sm w-32"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-primary"
            onClick={handleAddTag}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-muted-foreground"
            onClick={() => setIsAdding(false)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-6 py-1 px-2 text-xs text-muted-foreground hover:text-foreground"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="h-3 w-3 mr-1" />
          Añadir etiqueta
        </Button>
      )}
    </div>
  );
};

export default ElementTagger;
