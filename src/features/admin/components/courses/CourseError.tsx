
import React from 'react';
import { AlertTriangle, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export interface CourseErrorProps {
  error: any;
  onRetry?: () => void;
  onDismiss?: () => void;
}

const CourseError: React.FC<CourseErrorProps> = ({ 
  error, 
  onRetry = () => {}, 
  onDismiss = () => {} 
}) => {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <Alert variant="destructive" className="max-w-md">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle className="ml-2">Error al cargar el curso</AlertTitle>
        <AlertDescription className="mt-2">
          Se ha producido un error al cargar los datos del curso. Por favor, inténtalo de nuevo o contacta con soporte.
          {error && typeof error === 'string' && (
            <div className="mt-2 text-sm bg-destructive/10 p-2 rounded">
              {error}
            </div>
          )}
          <div className="mt-4 flex gap-2">
            {onRetry && (
              <Button variant="outline" size="sm" onClick={onRetry}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reintentar
              </Button>
            )}
            {onDismiss && (
              <Button variant="ghost" size="sm" onClick={onDismiss}>
                <X className="h-4 w-4 mr-2" />
                Descartar
              </Button>
            )}
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default CourseError;
