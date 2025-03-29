
import React, { useState } from 'react';
import { useTestData, TestDataType } from '@/contexts/TestDataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [selectedType, setSelectedType] = useState<TestDataType>('course');
  const [count, setCount] = useState(1);

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCount(isNaN(value) ? 1 : Math.max(1, Math.min(100, value)));
  };

  const handleGenerate = () => {
    generateTestData(selectedType, count);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="data-type" className="text-sm font-medium mb-1.5 block">Tipo de datos</Label>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {Object.entries(dataTypeLabels).map(([type, label]) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              className={`justify-start h-9 font-normal ${selectedType === type ? '' : 'text-muted-foreground'}`}
              onClick={() => setSelectedType(type as TestDataType)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="count" className="text-sm font-medium mb-1.5 block">Cantidad</Label>
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
          Generar {count} {count === 1 ? 'elemento' : 'elementos'} de tipo "{dataTypeLabels[selectedType]}"
        </p>
      </div>
    </div>
  );
};
