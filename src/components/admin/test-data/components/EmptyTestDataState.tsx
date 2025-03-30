
import React from 'react';
import { Database, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export const EmptyTestDataState: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="border border-dashed rounded-lg flex flex-col items-center justify-center py-12 px-4 text-center">
      <Database className="h-12 w-12 text-muted-foreground/40 mb-4" />
      <h3 className="text-xl font-medium mb-2">No hay datos de prueba</h3>
      <p className="text-muted-foreground max-w-md mb-6">
        Utiliza el generador para crear datos de prueba que te ayuden durante el desarrollo
      </p>
      
      {!isAuthenticated ? (
        <div className="bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 p-4 rounded-lg border border-amber-200 dark:border-amber-800 max-w-md">
          <p className="text-sm font-medium">Inicia sesión para guardar los datos de prueba en la base de datos</p>
          <Button 
            variant="link" 
            className="text-amber-800 dark:text-amber-300 p-0 h-auto font-medium text-sm mt-1"
            onClick={() => window.location.href = '/login?redirect=/admin/test-data'}
          >
            Ir a iniciar sesión <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Selecciona los tipos de datos que necesitas en el panel superior y haz clic en "Generar"
        </p>
      )}
    </div>
  );
};
