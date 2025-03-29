
import React from 'react';
import { useTestData } from '@/contexts/TestDataContext';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Database, Sparkles } from 'lucide-react';
import { DataTypeSelector } from './DataTypeSelector';
import { TestDataTable } from './TestDataTable';
import { DeleteAllDataDialog } from './DeleteAllDataDialog';

const TestDataGenerator: React.FC = () => {
  const { testData } = useTestData();
  
  // Check if there's any test data
  const hasAnyData = Object.values(testData).some(items => items.length > 0);
  
  // Calculate the total count of all test data items
  const totalItems = Object.values(testData).reduce(
    (acc, items) => acc + items.length, 
    0
  );

  return (
    <Card className="w-full shadow-md border-muted">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Database className="h-6 w-6 text-primary" />
          Generador de Datos de Prueba
        </CardTitle>
        <CardDescription className="text-base">
          Genera datos de prueba para la aplicación o elimina los existentes.
          {hasAnyData && (
            <span className="block mt-1 font-medium">
              Total de datos generados: <strong>{totalItems}</strong> elementos
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-8">
          <div className="bg-purple-50/50 dark:bg-slate-800/30 rounded-lg p-4 border border-purple-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-3 text-purple-600 dark:text-purple-400">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-medium">Generar nuevos datos</h3>
            </div>
            <DataTypeSelector />
          </div>

          <div className="mt-8">
            <TestDataTable />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4 bg-muted/10">
        <DeleteAllDataDialog disabled={!hasAnyData} />
      </CardFooter>
    </Card>
  );
};

export default TestDataGenerator;
