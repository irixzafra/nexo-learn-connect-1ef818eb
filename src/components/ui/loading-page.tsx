
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingPageProps {
  message?: string;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ 
  message = "Cargando contenido..."
}) => {
  return (
    <div className="flex flex-col h-[70vh] items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};
