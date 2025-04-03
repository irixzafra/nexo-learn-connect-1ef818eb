
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle } from 'lucide-react';

interface ComponentPreviewProps {
  componentPath: string;
  componentName: string;
  getRelativePath: (path: string) => string;
  isLoading: boolean;
  error: Error | null;
  children: React.ReactNode;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  componentPath,
  componentName,
  getRelativePath,
  isLoading,
  error,
  children
}) => {
  return (
    <div className="space-y-6">
      <div className="rounded-md border overflow-hidden">
        <div className="bg-muted p-2 flex items-center justify-between text-xs border-b">
          <div className="font-mono text-muted-foreground">
            {getRelativePath(componentPath)}
          </div>
          <div className="bg-background text-muted-foreground px-2 py-1 rounded text-xs">
            {componentName}
          </div>
        </div>
        <div className="p-4 bg-background">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Skeleton className="h-8 w-8 rounded-full" />
              <span className="ml-2 text-muted-foreground">Cargando...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-md">
              <AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />
              <h4 className="font-medium">Error al cargar el componente</h4>
              <p className="text-sm text-muted-foreground mt-1 max-w-md">
                {error.message}
              </p>
            </div>
          ) : (
            <div className="relative">
              {children}
            </div>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm">Uso Ejemplo</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <pre className="text-xs font-mono bg-muted p-4 rounded-md overflow-x-auto">
            {`import { ${componentName} } from "${getRelativePath(componentPath).replace('.tsx', '')}";

// Ejemplo básico de uso
export const ExampleUsage = () => {
  return (
    <${componentName} />
  );
};`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComponentPreview;
