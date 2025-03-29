
import React, { useState } from 'react';
import { useTestData, TestDataType } from '@/contexts/TestDataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';

// Map of data types to their labels
export const dataTypeLabels: Record<TestDataType, string> = {
  course: 'Cursos',
  user: 'Usuarios',
  lesson: 'Lecciones',
  message: 'Mensajes'
};

export const DataTypeSelector: React.FC = () => {
  const { generateTestData, isGenerating } = useTestData();
  const [selectedType, setSelectedType] = useState<TestDataType>('course');
  const [count, setCount] = useState<number>(5);

  const handleGenerate = () => {
    if (count > 0 && count <= 100) {
      generateTestData(selectedType, count);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 space-y-2">
        <Label htmlFor="dataType">Tipo de datos</Label>
        <Select 
          value={selectedType} 
          onValueChange={(value) => setSelectedType(value as TestDataType)}
        >
          <SelectTrigger id="dataType">
            <SelectValue placeholder="Selecciona un tipo de datos" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(dataTypeLabels).map(([type, label]) => (
              <SelectItem key={type} value={type}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 space-y-2">
        <Label htmlFor="count">Cantidad</Label>
        <div className="flex items-center gap-2">
          <Input
            id="count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 0)}
          />
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || count <= 0 || count > 100}
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Generar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
