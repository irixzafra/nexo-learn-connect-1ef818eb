
import React from 'react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryFallbackProps {
  error?: Error;
  resetError?: () => void;
}

const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({ 
  error, 
  resetError 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-lg border border-red-200">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Algo salió mal
        </h2>
        <p className="text-gray-700 mb-4">
          Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado y estamos trabajando para resolverlo.
        </p>
        {error && (
          <div className="p-3 bg-gray-100 rounded mb-4 text-left overflow-auto max-h-32">
            <p className="text-sm text-gray-700 font-mono">
              {error.message}
            </p>
          </div>
        )}
        {resetError && (
          <Button 
            onClick={resetError}
            variant="default"
            className="mt-2"
          >
            Intentar nuevamente
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorBoundaryFallback;
