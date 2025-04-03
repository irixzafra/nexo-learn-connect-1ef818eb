
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryFallbackProps {
  error: Error;
  resetError: () => void;
}

const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({ 
  error, 
  resetError 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center rounded-md border border-destructive/20 bg-destructive/5">
      <AlertTriangle className="h-10 w-10 text-destructive mb-2" />
      <h3 className="text-xl font-semibold text-destructive mb-2">Error al renderizar el componente</h3>
      <div className="max-w-md mb-4">
        <p className="text-sm text-muted-foreground mb-2">
          Se ha producido un error al intentar renderizar este componente:
        </p>
        <pre className="bg-background/50 p-2 rounded-md text-xs font-mono overflow-x-auto">
          {error.message}
        </pre>
      </div>
      <Button size="sm" onClick={resetError} className="flex items-center gap-2">
        <RefreshCw className="h-4 w-4" />
        Reintentar
      </Button>
    </div>
  );
};

export default ErrorBoundaryFallback;
