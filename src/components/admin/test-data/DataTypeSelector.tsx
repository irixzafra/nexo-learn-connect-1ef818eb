
import React, { useState } from 'react';
import { useTestData, TestDataType } from '@/contexts/TestDataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Plus, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

// Data types with their display names
export const dataTypeLabels: Record<TestDataType, string> = {
  course: 'Cursos',
  user: 'Usuarios',
  lesson: 'Lecciones',
  message: 'Mensajes',
  module: 'Módulos',
  profile: 'Perfiles',
  assignment: 'Tareas',
  category: 'Categorías',
  enrollment: 'Inscripciones',
  quiz: 'Evaluaciones',
  certificate: 'Certificados',
  payment: 'Pagos'
};

export const DataTypeSelector: React.FC = () => {
  const { generateTestData, isGenerating } = useTestData();
  const [selectedTypes, setSelectedTypes] = useState<TestDataType[]>(['course']);
  const [count, setCount] = useState(1);

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCount(isNaN(value) ? 1 : Math.max(1, Math.min(100, value)));
  };

  const handleTypeToggle = (type: TestDataType) => {
    setSelectedTypes(prev => {
      if (prev.includes(type)) {
        // Remove the type if it's already selected
        const newTypes = prev.filter(t => t !== type);
        // Ensure at least one type is selected
        return newTypes.length > 0 ? newTypes : prev;
      } else {
        // Add the type if it's not already selected
        return [...prev, type];
      }
    });
  };

  const handleGenerate = async () => {
    // Generate data for each selected type
    for (const type of selectedTypes) {
      await generateTestData(type, count);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="data-type" className="text-sm font-medium mb-1.5 block">Tipo de datos</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
          {Object.entries(dataTypeLabels).map(([type, label]) => {
            const isSelected = selectedTypes.includes(type as TestDataType);
            return (
              <Button
                key={type}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className={cn(
                  "justify-between h-9 font-normal transition-all", 
                  isSelected ? 'pr-1.5' : 'text-muted-foreground'
                )}
                onClick={() => handleTypeToggle(type as TestDataType)}
              >
                <span>{label}</span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-center"
                  >
                    <CheckCircle2 className="h-4 w-4 ml-2 text-primary-foreground" />
                  </motion.div>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      <div>
        <Label htmlFor="count" className="text-sm font-medium mb-1.5 block">Cantidad por tipo</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={handleCountChange}
            className="w-28"
          />
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="transition-all duration-200 relative"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Generar
              </>
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Generar {count} {count === 1 ? 'elemento' : 'elementos'} de 
          {selectedTypes.length === 1 
            ? ` tipo "${dataTypeLabels[selectedTypes[0]]}"` 
            : ` cada tipo seleccionado (${selectedTypes.length} tipos)`}
        </p>
      </div>
    </div>
  );
};
