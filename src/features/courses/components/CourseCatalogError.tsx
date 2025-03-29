
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw, Info } from 'lucide-react';

interface CourseCatalogErrorProps {
  error: string;
  debugInfo?: any;
  onRetry: () => void;
}

export const CourseCatalogError: React.FC<CourseCatalogErrorProps> = ({
  error,
  debugInfo,
  onRetry,
}) => {
  return (
    <Card className="mb-6 border-destructive bg-destructive/5">
      <CardHeader>
        <CardTitle className="text-destructive flex items-center gap-2 text-lg">
          <AlertCircle className="h-5 w-5" />
          Error al cargar los cursos
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2 space-y-4">
        <p className="text-destructive/90">{error}</p>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-3 p-3 bg-muted/50 rounded-md text-sm font-mono overflow-auto">
            <p className="text-muted-foreground mb-2">Información de depuración:</p>
            
            {debugInfo && debugInfo.errorType === 'rls_recursion' && (
              <div className="mt-2 p-2 bg-amber-100 border border-amber-300 rounded">
                <p className="text-amber-800 font-semibold flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  Detectado error de recursión RLS
                </p>
                <p className="text-sm mt-1 text-amber-700">{debugInfo.suggestion}</p>
              </div>
            )}
            
            <div className="mt-2">
              <p className="text-muted-foreground">Sugerencias de verificación:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Verificar que las políticas RLS estén correctamente configuradas</li>
                <li>Comprobar permisos de acceso para usuarios anónimos</li>
                <li>Revisar estructura de la tabla courses</li>
                <li>Verificar que existan cursos publicados en la base de datos</li>
                <li>Revisar que no haya recursión en las políticas RLS</li>
              </ul>
            </div>
            
            {debugInfo && (
              <div className="mt-3 p-2 bg-slate-100 rounded border border-slate-200 overflow-auto max-h-60">
                <pre className="text-xs">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4 bg-background/50">
        <Button 
          variant="outline" 
          onClick={onRetry}
          className="flex items-center gap-2"
        >
          <RefreshCcw className="h-4 w-4" />
          Intentar de nuevo
        </Button>
      </CardFooter>
    </Card>
  );
};
