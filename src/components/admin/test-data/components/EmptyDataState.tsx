
import React from 'react';
import { InboxIcon, DatabaseIcon } from 'lucide-react';
import { TestDataType } from '@/contexts/test-data';
import { dataTypeIcons } from '../utils/dataTypeUtils';

interface EmptyDataStateProps {
  type: TestDataType;
  label: string;
  searchTerm: string;
}

export const EmptyDataState: React.FC<EmptyDataStateProps> = ({ 
  type, 
  label, 
  searchTerm 
}) => {
  // Si hay un término de búsqueda pero no hay resultados, mostrar mensaje de búsqueda
  if (searchTerm) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
        <InboxIcon className="h-12 w-12 text-muted-foreground/40 mb-4" />
        <h3 className="text-lg font-medium mb-1">No se encontraron resultados</h3>
        <p className="text-muted-foreground text-sm max-w-md">
          No hay elementos de tipo "{label.toLowerCase()}" que coincidan con "{searchTerm}"
        </p>
      </div>
    );
  }
  
  // Estado vacío por defecto
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center px-4">
      <div className="h-12 w-12 text-muted-foreground/40 mb-4 flex items-center justify-center">
        {dataTypeIcons[type] || <DatabaseIcon className="h-12 w-12" />}
      </div>
      <h3 className="text-lg font-medium mb-1">No hay datos de {label.toLowerCase()}</h3>
      <p className="text-muted-foreground text-sm max-w-md">
        Utiliza el generador de datos para crear elementos de prueba de este tipo.
      </p>
    </div>
  );
};
