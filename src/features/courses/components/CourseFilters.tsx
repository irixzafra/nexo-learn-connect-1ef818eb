
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CourseFiltersProps {
  selectedLevel: string | null;
  setSelectedLevel: (level: string | null) => void;
  onClearFilters: () => void;
}

export const CourseFilters: React.FC<CourseFiltersProps> = ({
  selectedLevel,
  setSelectedLevel,
  onClearFilters,
}) => {
  const levels = [
    { value: "principiante", label: "Principiante" },
    { value: "intermedio", label: "Intermedio" },
    { value: "avanzado", label: "Avanzado" },
  ];

  const handleLevelChange = (value: string) => {
    setSelectedLevel(value === "todos" ? null : value);
  };

  const isFiltersActive = selectedLevel !== null;

  return (
    <Card className="mb-6">
      <CardContent className="flex flex-wrap gap-4 py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filtros:</span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <span>Nivel</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel>Nivel del curso</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={selectedLevel || "todos"}
                onValueChange={handleLevelChange}
              >
                <DropdownMenuRadioItem value="todos" className="flex items-center gap-2">
                  Todos los niveles
                  {selectedLevel === null && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuRadioItem>
                
                {levels.map((level) => (
                  <DropdownMenuRadioItem key={level.value} value={level.value} className="flex items-center gap-2">
                    {level.label}
                    {selectedLevel === level.value && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isFiltersActive && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Limpiar filtros
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
