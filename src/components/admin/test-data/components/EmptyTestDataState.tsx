
import React from 'react';
import { Info } from 'lucide-react';

export const EmptyTestDataState: React.FC = () => {
  return (
    <div className="bg-muted/20 border rounded-lg p-6 text-center flex flex-col items-center gap-3">
      <Info className="h-10 w-10 text-muted-foreground/50" />
      <div>
        <p className="text-muted-foreground font-medium mb-1">No hay datos generados</p>
        <p className="text-sm text-muted-foreground/70">
          Utiliza el generador para crear datos de prueba para la aplicación
        </p>
      </div>
    </div>
  );
};
