
import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryFallbackProps {
  error: Error;
  resetError: () => void;
}

const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({ error, resetError }) => {
  return (
    <div className="p-6 border rounded-lg bg-destructive/5 flex flex-col items-center justify-center text-center space-y-4">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Algo salió mal</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Se ha producido un error inesperado. Por favor, intenta de nuevo o contacta con soporte si el problema persiste.
        </p>
        {process.env.NODE_ENV !== 'production' && (
          <div className="mt-4 p-4 bg-muted/50 rounded text-left overflow-auto max-h-[200px] text-xs">
            <pre className="font-mono">{error.message}</pre>
            {error.stack && (
              <pre className="font-mono mt-2 text-muted-foreground">{error.stack}</pre>
            )}
          </div>
        )}
      </div>
      <Button 
        onClick={resetError} 
        variant="outline"
        className="mt-4"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Intentar de nuevo
      </Button>
    </div>
  );
};

export default ErrorBoundaryFallback;
