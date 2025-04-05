
import React from 'react';
import { ToggleLeft } from 'lucide-react';

export const FeatureEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <ToggleLeft className="h-10 w-10 text-muted-foreground mb-2" />
      <p className="text-muted-foreground text-center">No hay funcionalidades definidas</p>
    </div>
  );
};
