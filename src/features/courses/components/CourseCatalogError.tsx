
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface CourseCatalogErrorProps {
  error: string;
  onRetry: () => void;
}

export const CourseCatalogError: React.FC<CourseCatalogErrorProps> = ({
  error,
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
      <CardContent className="pb-2">
        <p className="text-destructive/90">{error}</p>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-3 p-3 bg-muted/50 rounded-md text-sm font-mono overflow-auto">
            <p className="text-muted-foreground">Sugerencias de verificación:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Verificar que las políticas RLS estén correctamente configuradas</li>
              <li>Comprobar permisos de acceso para usuarios anónimos</li>
              <li>Revisar estructura de la tabla courses</li>
              <li>Verificar que existan cursos publicados en la base de datos</li>
            </ul>
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
