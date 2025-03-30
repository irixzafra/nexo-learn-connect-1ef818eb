
import React from 'react';
import { TestDataType } from '@/contexts/test-data';
import { typeIcons } from '../utils/dataTypeUtils';

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
  return (
    <div className="py-8 text-center text-muted-foreground flex flex-col items-center gap-2">
      {typeIcons[type]}
      {searchTerm ? (
        <p>No se encontraron datos que coincidan con "{searchTerm}"</p>
      ) : (
        <p>No hay datos de {label.toLowerCase()} disponibles</p>
      )}
    </div>
  );
};
