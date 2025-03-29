
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
import { Database } from 'lucide-react';
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Generador de Datos de Prueba
        </CardTitle>
        <CardDescription>
          Genera datos de prueba para la aplicación o elimina los existentes.
          {hasAnyData && (
            <span className="block mt-1">
              Total de datos generados: <strong>{totalItems}</strong> elementos
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <DataTypeSelector />

          <div className="mt-6">
            <TestDataTable />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <DeleteAllDataDialog disabled={!hasAnyData} />
      </CardFooter>
    </Card>
  );
};

export default TestDataGenerator;
