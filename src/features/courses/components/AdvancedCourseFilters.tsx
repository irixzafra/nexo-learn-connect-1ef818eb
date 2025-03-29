
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import {
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Filter,
  Flame,
  SlidersHorizontal,
  Star,
  Tag,
  Users,
  X
} from "lucide-react";
import { motion } from "framer-motion";

interface FiltersProps {
  selectedLevel: string | null;
  setSelectedLevel: (level: string | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  showPopular: boolean;
  setShowPopular: (show: boolean) => void;
  showUpcoming: boolean;
  setShowUpcoming: (show: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onClearFilters: () => void;
  availableCategories: string[];
  availableTags: string[];
}

export const AdvancedCourseFilters: React.FC<FiltersProps> = ({
  selectedLevel,
  setSelectedLevel,
  selectedCategory,
  setSelectedCategory,
  selectedTags,
  setSelectedTags,
  priceRange,
  setPriceRange,
  showPopular,
  setShowPopular,
  showUpcoming,
  setShowUpcoming,
  sortBy,
  setSortBy,
  onClearFilters,
  availableCategories,
  availableTags
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const levels = [
    { value: "principiante", label: "Principiante" },
    { value: "intermedio", label: "Intermedio" },
    { value: "avanzado", label: "Avanzado" },
  ];

  const sortOptions = [
    { value: "relevance", label: "Relevancia" },
    { value: "newest", label: "Más recientes" },
    { value: "popular", label: "Más populares" },
    { value: "price-low", label: "Precio: menor a mayor" },
    { value: "price-high", label: "Precio: mayor a menor" },
    { value: "rating", label: "Mejor valorados" },
  ];

  const handleLevelChange = (value: string) => {
    setSelectedLevel(value === "todos" ? null : value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "todas" ? null : value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const togglePopular = () => {
    setShowPopular(!showPopular);
  };

  const toggleUpcoming = () => {
    setShowUpcoming(!showUpcoming);
  };

  const isFiltersActive = 
    selectedLevel !== null || 
    selectedCategory !== null || 
    selectedTags.length > 0 || 
    priceRange[0] > 0 || 
    priceRange[1] < 1000 ||
    showPopular ||
    showUpcoming ||
    sortBy !== "relevance";

  const activeFilterCount = [
    selectedLevel !== null,
    selectedCategory !== null,
    selectedTags.length > 0,
    priceRange[0] > 0 || priceRange[1] < 1000,
    showPopular,
    showUpcoming,
    sortBy !== "relevance"
  ].filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Button 
                variant={isExpanded ? "default" : "outline"} 
                onClick={() => setIsExpanded(!isExpanded)}
                size="sm"
                className="flex items-center gap-1"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filtros</span>
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <span>Ordenar por</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>Ordenar cursos por</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={sortBy}
                    onValueChange={handleSortChange}
                  >
                    {sortOptions.map(option => (
                      <DropdownMenuRadioItem key={option.value} value={option.value} className="flex items-center gap-2">
                        {option.label}
                        {sortBy === option.value && <Check className="ml-auto h-4 w-4" />}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {!isExpanded && (
                <>
                  <Button 
                    variant={showPopular ? "default" : "outline"} 
                    size="sm"
                    onClick={togglePopular}
                    className="flex items-center gap-1"
                  >
                    <Flame className="h-4 w-4" />
                    <span>Más populares</span>
                  </Button>
                  
                  <Button 
                    variant={showUpcoming ? "default" : "outline"} 
                    size="sm"
                    onClick={toggleUpcoming}
                    className="flex items-center gap-1"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Próximo inicio</span>
                  </Button>
                </>
              )}
            </div>
            
            {isFiltersActive && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="mr-1 h-4 w-4" />
                Limpiar filtros
              </Button>
            )}
          </div>
          
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Nivel
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={!selectedLevel ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedLevel(null)}
                    >
                      Todos
                    </Button>
                    {levels.map(level => (
                      <Button 
                        key={level.value}
                        variant={selectedLevel === level.value ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedLevel(level.value)}
                      >
                        {level.label}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary" />
                    Categoría
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={!selectedCategory ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Todas
                    </Button>
                    {availableCategories.map(category => (
                      <Button 
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Filtros adicionales
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={showPopular ? "default" : "outline"} 
                      size="sm"
                      onClick={togglePopular}
                      className="flex items-center gap-1"
                    >
                      <Flame className="h-4 w-4" />
                      <span>Más populares</span>
                    </Button>
                    
                    <Button 
                      variant={showUpcoming ? "default" : "outline"} 
                      size="sm"
                      onClick={toggleUpcoming}
                      className="flex items-center gap-1"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Próximo inicio</span>
                    </Button>
                  </div>
                </div>
                
                {availableTags.length > 0 && (
                  <div className="lg:col-span-3">
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Tag className="h-4 w-4 text-primary" />
                      Etiquetas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map(tag => (
                        <Badge 
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                          {selectedTags.includes(tag) && <X className="ml-1 h-3 w-3" />}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="lg:col-span-3">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <span>Rango de precio (€)</span>
                  </h3>
                  <div className="px-2">
                    <Slider 
                      defaultValue={[priceRange[0], priceRange[1]]} 
                      max={1000}
                      step={10}
                      onValueChange={handlePriceChange}
                      className="my-6"
                    />
                    <div className="flex justify-between text-sm">
                      <span>{priceRange[0]}€</span>
                      <span>{priceRange[1]}€</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
