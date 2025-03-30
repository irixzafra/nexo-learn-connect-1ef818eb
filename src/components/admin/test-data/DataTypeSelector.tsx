import React, { useState, useEffect } from 'react';
import { useTestData, TestDataType } from '@/contexts/test-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

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

// Agrupación de los tipos de datos en categorías lógicas
export const dataTypeGroups = {
  content: ['course', 'module', 'lesson', 'quiz', 'assignment'] as TestDataType[],
  users: ['user', 'profile'] as TestDataType[],
  classification: ['category'] as TestDataType[],
  interaction: ['message'] as TestDataType[],
  progress: ['enrollment', 'certificate'] as TestDataType[],
  finance: ['payment'] as TestDataType[]
};

// Group labels
export const groupLabels: Record<string, string> = {
  content: 'Contenido',
  users: 'Usuarios',
  classification: 'Clasificación',
  interaction: 'Interacción',
  progress: 'Progreso',
  finance: 'Finanzas'
};

// Data type dependencies
export const dataTypeDependencies: Partial<Record<TestDataType, TestDataType[]>> = {
  lesson: ['course', 'module'],
  module: ['course'],
  enrollment: ['course', 'user'],
  certificate: ['course', 'user', 'enrollment'],
  assignment: ['course', 'module'],
  quiz: ['course', 'module'],
  payment: ['course', 'user']
};

export const DataTypeSelector: React.FC = () => {
  const { generateTestData, isGenerating, testData } = useTestData();
  const [selectedTypes, setSelectedTypes] = useState<TestDataType[]>(['course']);
  const [count, setCount] = useState(1);
  const [showDependencyAlert, setShowDependencyAlert] = useState(false);
  const [missingDependencies, setMissingDependencies] = useState<{type: TestDataType, dependencies: TestDataType[]}[]>([]);

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

  // Check dependencies before generation
  const checkDependencies = (): boolean => {
    const missing: {type: TestDataType, dependencies: TestDataType[]}[] = [];
    
    selectedTypes.forEach(type => {
      const deps = dataTypeDependencies[type];
      if (deps) {
        const missingDeps = deps.filter(dep => 
          // Check if there's no test data of this type and it's not selected for generation
          testData[dep].length === 0 && !selectedTypes.includes(dep)
        );
        
        if (missingDeps.length > 0) {
          missing.push({
            type,
            dependencies: missingDeps
          });
        }
      }
    });
    
    if (missing.length > 0) {
      setMissingDependencies(missing);
      setShowDependencyAlert(true);
      return false;
    }
    
    return true;
  };

  const handleGenerate = async () => {
    if (!checkDependencies()) {
      return;
    }
    
    // Generate data for each selected type
    for (const type of selectedTypes) {
      await generateTestData(type, count);
    }
  };

  const handleGenerateWithDependencies = async () => {
    // Generate dependencies first
    const allTypesToGenerate = new Set<TestDataType>(selectedTypes);
    
    missingDependencies.forEach(item => {
      item.dependencies.forEach(dep => {
        allTypesToGenerate.add(dep);
      });
    });
    
    // Generate in order (dependencies first)
    const generateOrder: TestDataType[] = [];
    
    // First add types without dependencies
    Array.from(allTypesToGenerate).forEach(type => {
      if (!dataTypeDependencies[type] || dataTypeDependencies[type]?.length === 0) {
        generateOrder.push(type);
      }
    });
    
    // Then add types with dependencies
    Array.from(allTypesToGenerate).forEach(type => {
      if (dataTypeDependencies[type] && dataTypeDependencies[type]?.length > 0) {
        if (!generateOrder.includes(type)) {
          generateOrder.push(type);
        }
      }
    });
    
    // Generate data in the correct order
    for (const type of generateOrder) {
      await generateTestData(type, count);
    }
    
    setShowDependencyAlert(false);
    toast.success("Datos generados exitosamente con sus dependencias");
  };

  useEffect(() => {
    // Reset dependency alert when selection changes
    if (showDependencyAlert) {
      setShowDependencyAlert(false);
    }
  }, [selectedTypes]);

  return (
    <div className="space-y-4">
      <div className="bg-purple-50/50 dark:bg-slate-800/30 rounded-lg p-4 border border-purple-100 dark:border-slate-700">
        <h3 className="font-medium mb-3 text-purple-600 dark:text-purple-400">Generar nuevos datos</h3>
        
        <div>
          <Label htmlFor="data-type" className="text-sm font-medium mb-1.5 block">Tipo de datos</Label>
          <div className="space-y-4">
            {Object.entries(dataTypeGroups).map(([groupKey, types]) => (
              <div key={groupKey} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-4 bg-muted-foreground/20"></div>
                  <span className="text-xs font-medium text-muted-foreground">{groupLabels[groupKey]}</span>
                  <div className="h-0.5 flex-1 bg-muted-foreground/20"></div>
                </div>
                <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
                  {types.map(type => {
                    const isSelected = selectedTypes.includes(type);
                    return (
                      <Button
                        key={type}
                        variant={isSelected ? "default" : "outline"}
                        size="icon"
                        className={cn(
                          "h-10 w-10 rounded-lg transition-all",
                          isSelected ? 'bg-primary/90' : 'text-muted-foreground bg-transparent'
                        )}
                        title={dataTypeLabels[type]}
                        onClick={() => handleTypeToggle(type)}
                      >
                        {typeIcons[type]}
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute -top-1 -right-1 flex items-center justify-center"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground bg-primary rounded-full" />
                          </motion.div>
                        )}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
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

      {showDependencyAlert && (
        <Alert variant="warning" className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="mt-2">
            <p className="font-medium text-amber-800 dark:text-amber-300 mb-1">
              Dependencias necesarias
            </p>
            <ul className="text-sm space-y-1 mb-2">
              {missingDependencies.map((item, idx) => (
                <li key={idx}>
                  <span className="font-medium">{dataTypeLabels[item.type]}</span> requiere: {item.dependencies.map(dep => dataTypeLabels[dep]).join(', ')}
                </li>
              ))}
            </ul>
            <div className="flex gap-2 mt-3">
              <Button size="sm" onClick={() => setShowDependencyAlert(false)} variant="outline">
                Cancelar
              </Button>
              <Button size="sm" onClick={handleGenerateWithDependencies}>
                Generar con dependencias
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
