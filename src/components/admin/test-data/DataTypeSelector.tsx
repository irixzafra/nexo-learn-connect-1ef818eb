
import React, { useState } from 'react';
import { useTestData, TestDataType } from '@/contexts/TestDataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="data-type">Tipo de datos</Label>
            <Tabs 
              defaultValue="course" 
              value={selectedType}
              onValueChange={(value) => setSelectedType(value as TestDataType)}
              className="mt-2"
            >
              <TabsList className="grid grid-cols-4 md:grid-cols-6">
                {Object.entries(dataTypeLabels).map(([type, label]) => (
                  <TabsTrigger key={type} value={type}>
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div>
            <Label htmlFor="count">Cantidad</Label>
            <div className="flex items-center mt-2">
              <Input
                id="count"
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={handleCountChange}
                className="w-24"
              />
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="ml-2"
              >
                <Plus className="h-4 w-4 mr-1" />
                Generar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
