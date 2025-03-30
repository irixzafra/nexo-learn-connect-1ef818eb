
import React, { useState } from 'react';
import { useTestData, TestDataType } from '@/contexts/TestDataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  CheckCircle2, 
  Plus, 
  Loader2,
  BookOpen,
  Users,
  FileText,
  MessageSquare,
  Folders,
  UserCircle,
  ClipboardList,
  Tag,
  GraduationCap,
  Award,
  ScrollText,
  CreditCard
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Mapping de tipos de datos a iconos
const typeIcons: Record<TestDataType, React.ReactNode> = {
  course: <BookOpen className="h-4 w-4" />,
  user: <Users className="h-4 w-4" />,
  lesson: <FileText className="h-4 w-4" />,
  message: <MessageSquare className="h-4 w-4" />,
  module: <Folders className="h-4 w-4" />,
  profile: <UserCircle className="h-4 w-4" />,
  assignment: <ClipboardList className="h-4 w-4" />,
  category: <Tag className="h-4 w-4" />,
  enrollment: <GraduationCap className="h-4 w-4" />,
  quiz: <ScrollText className="h-4 w-4" />,
  certificate: <Award className="h-4 w-4" />,
  payment: <CreditCard className="h-4 w-4" />
};

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
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {Object.entries(dataTypeLabels).map(([type, label]) => {
            const isSelected = selectedTypes.includes(type as TestDataType);
            return (
              <Button
                key={type}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className={cn(
                  "h-9 font-normal transition-all flex items-center gap-1.5", 
                  isSelected ? 'pr-1.5 bg-primary/90' : 'text-muted-foreground'
                )}
                onClick={() => handleTypeToggle(type as TestDataType)}
              >
                {typeIcons[type as TestDataType]}
                <span>{label}</span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-center ml-auto"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />
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
          {count === 1 
            ? `Generar 1 elemento de tipo "${selectedTypes.length === 1 ? dataTypeLabels[selectedTypes[0]] : 'seleccionado'}"` 
            : `Generar ${count} elementos de ${selectedTypes.length === 1 
                ? `tipo "${dataTypeLabels[selectedTypes[0]]}"` 
                : `cada tipo seleccionado (${selectedTypes.length} tipos)`}`}
        </p>
      </div>
    </div>
  );
};
