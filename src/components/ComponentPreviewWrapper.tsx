
import React from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { AlertTriangle } from 'lucide-react';

interface ComponentPreviewWrapperProps {
  componentName: string;
  children: React.ReactNode;
}

const ComponentPreviewFallback: React.FC<{ error: Error; resetError: () => void }> = ({ 
  error, resetError 
}) => {
  return (
    <div className="p-4 border rounded-lg bg-destructive/5 flex flex-col items-center justify-center text-center space-y-2">
      <AlertTriangle className="h-5 w-5 text-destructive" />
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground max-w-md">
          Error al renderizar el componente
        </p>
        <div className="mt-2 p-2 bg-muted/50 rounded text-left overflow-auto max-h-[100px] text-xs">
          <pre className="font-mono">{error.message}</pre>
        </div>
      </div>
      <button 
        onClick={resetError}
        className="text-xs text-primary hover:text-primary/80 mt-2"
      >
        Reintentar
      </button>
    </div>
  );
};

const ComponentPreviewWrapper: React.FC<ComponentPreviewWrapperProps> = ({ 
  componentName, 
  children 
}) => {
  return (
    <div className="component-preview-wrapper">
      <h4 className="text-sm font-medium mb-2">{componentName}</h4>
      <div className="border rounded-lg p-4 bg-card/50">
        <ErrorBoundary FallbackComponent={ComponentPreviewFallback}>
          {children}
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ComponentPreviewWrapper;
