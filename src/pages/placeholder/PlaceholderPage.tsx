
import React from 'react';
import { BookText, Settings, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PlaceholderPageProps {
  title: string;
  subtitle?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, subtitle }) => {
  return (
    <div className="container mx-auto p-6">
      <Card className="p-8 border-2 border-dashed border-primary/30 flex flex-col items-center justify-center text-center space-y-8">
        <div className="bg-primary/10 p-6 rounded-full">
          <BookText className="h-16 w-16 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">
            {subtitle || "Esta página está en desarrollo y estará disponible pronto."}
          </p>
        </div>
        
        <div className="bg-muted p-4 rounded-md max-w-lg text-sm border text-left">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="font-medium">Nota para desarrolladores</span>
          </div>
          <p className="text-muted-foreground">
            Esta es una página de marcador de posición que se muestra cuando un componente real 
            aún no se ha implementado. Una vez que la implementación esté completa, 
            actualice el router para utilizar el componente real.
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            Volver atrás
          </Button>
          <Button asChild>
            <a href="/">Ir al inicio</a>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
