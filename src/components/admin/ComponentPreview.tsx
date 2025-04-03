
import React, { useState } from 'react';
import { CodeIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback';

interface ComponentPreviewProps {
  componentPath: string;
  componentName: string;
  getRelativePath: (path: string) => string;
  isLoading: boolean;
  error?: Error | null;
  children?: React.ReactNode;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  componentPath,
  componentName,
  getRelativePath,
  isLoading,
  error,
  children
}) => {
  const [showPreview, setShowPreview] = useState(true);

  const toggleView = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="space-y-4">
      <div className="bg-muted/30 p-4 rounded-md border">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <CodeIcon className="h-4 w-4 text-primary" />
            <h3 className="font-medium">{componentName}</h3>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleView}
          >
            {showPreview ? 'Ver código' : 'Ver componente'}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground font-mono">
          {getRelativePath(componentPath)}
        </p>
      </div>

      {showPreview ? (
        <div className="p-4 border rounded-md shadow-sm bg-background">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Skeleton className="h-20 w-full rounded-md" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>
                <div className="font-medium">Error al renderizar el componente:</div>
                <pre className="text-xs mt-2 overflow-auto">{error.message}</pre>
              </AlertDescription>
            </Alert>
          ) : (
            <ErrorBoundary FallbackComponent={({ error, resetError }) => (
              <Alert variant="destructive">
                <AlertDescription>
                  <div className="font-medium">Error de renderizado:</div>
                  <pre className="text-xs mt-2 overflow-auto">{error.message}</pre>
                </AlertDescription>
              </Alert>
            )}>
              {children}
            </ErrorBoundary>
          )}
        </div>
      ) : (
        <div className="bg-muted/50 p-4 rounded-md">
          <h4 className="text-sm font-medium mb-2">Ejemplo de uso:</h4>
          <pre className="bg-black text-white p-3 rounded text-xs overflow-x-auto">
{`import ${componentName} from "@/${getRelativePath(componentPath)}";

// En tu componente
<${componentName} />`}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ComponentPreview;
