
import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface CourseErrorProps {
  error: string;
  onRetry: () => void;
  onDismiss: () => void;
}

const CourseError: React.FC<CourseErrorProps> = ({ error, onRetry, onDismiss }) => {
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error}
        <div className="mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry}
            className="mr-2"
          >
            Reintentar
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDismiss}
          >
            Descartar
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default CourseError;
