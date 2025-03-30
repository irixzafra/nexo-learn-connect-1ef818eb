
import React from 'react';
import { Database, Info, HardDrive } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface TestDataHeaderProps {
  totalItems: number;
  hasAnyData: boolean;
}

export const TestDataHeader: React.FC<TestDataHeaderProps> = ({ 
  totalItems, 
  hasAnyData 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">Datos generados</h3>
          {hasAnyData && (
            <Badge variant="outline" className="bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-100">
              {totalItems} elementos
            </Badge>
          )}
        </div>
      </div>
      
      <Alert variant="info" className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30">
        <HardDrive className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-sm text-blue-700 dark:text-blue-300">
          Los datos generados se almacenan únicamente en memoria y se perderán al recargar la página. No se escriben en la base de datos real.
        </AlertDescription>
      </Alert>
    </div>
  );
};
