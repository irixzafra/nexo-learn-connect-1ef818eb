
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { TestDataType } from '@/contexts/test-data';
import { dataTypeLabels } from '../utils/dataTypeUtils';

interface DependencyAlertProps {
  missingDependencies: {type: TestDataType, dependencies: TestDataType[]}[];
  onCancel: () => void;
  onGenerateWithDependencies: () => void;
}

export const DependencyAlert: React.FC<DependencyAlertProps> = ({
  missingDependencies,
  onCancel,
  onGenerateWithDependencies
}) => {
  return (
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
          <Button size="sm" onClick={onCancel} variant="outline">
            Cancelar
          </Button>
          <Button size="sm" onClick={onGenerateWithDependencies}>
            Generar con dependencias
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
