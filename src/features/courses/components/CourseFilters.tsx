
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

interface CourseFiltersProps {
  categories: { id: string; name: string }[];
  category: string | null;
  setCategory: (category: string | null) => void;
  level: string | null;
  setLevel: (level: string | null) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

export const CourseFilters: React.FC<CourseFiltersProps> = ({
  categories,
  category,
  setCategory,
  level,
  setLevel,
  sortBy,
  setSortBy,
}) => {
  const handleReset = () => {
    setCategory(null);
    setLevel(null);
    setSortBy('latest');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Filtros</h3>
        {(category || level || sortBy !== 'latest') && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-8 px-2 text-xs"
          >
            <XIcon className="h-3 w-3 mr-1" />
            Borrar
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={['sort', 'level', 'category']}>
        <AccordionItem value="sort">
          <AccordionTrigger>Ordenar por</AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={sortBy}
              onValueChange={setSortBy}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="latest" id="sort-latest" />
                <Label htmlFor="sort-latest">Más recientes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="popular" id="sort-popular" />
                <Label htmlFor="sort-popular">Más populares</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-low" id="sort-price-low" />
                <Label htmlFor="sort-price-low">Precio: menor a mayor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-high" id="sort-price-high" />
                <Label htmlFor="sort-price-high">Precio: mayor a menor</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="level">
          <AccordionTrigger>Nivel</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="level-beginner"
                  checked={level === 'beginner'}
                  onCheckedChange={() =>
                    setLevel(level === 'beginner' ? null : 'beginner')
                  }
                />
                <Label htmlFor="level-beginner">Principiante</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="level-intermediate"
                  checked={level === 'intermediate'}
                  onCheckedChange={() =>
                    setLevel(level === 'intermediate' ? null : 'intermediate')
                  }
                />
                <Label htmlFor="level-intermediate">Intermedio</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="level-advanced"
                  checked={level === 'advanced'}
                  onCheckedChange={() =>
                    setLevel(level === 'advanced' ? null : 'advanced')
                  }
                />
                <Label htmlFor="level-advanced">Avanzado</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger>Categoría</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${cat.id}`}
                    checked={category === cat.id}
                    onCheckedChange={() =>
                      setCategory(category === cat.id ? null : cat.id)
                    }
                  />
                  <Label htmlFor={`category-${cat.id}`}>{cat.name}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
