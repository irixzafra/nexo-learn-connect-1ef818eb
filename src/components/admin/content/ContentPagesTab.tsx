
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Plus } from 'lucide-react';

// Este es un componente de marcador de posición hasta que se implemente completamente
const ContentPagesTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Páginas de Contenido</CardTitle>
        <CardDescription>
          Crea y gestiona las páginas de contenido estático de tu plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Página
        </Button>
        <div className="mt-4 p-8 text-center border border-dashed rounded-md bg-muted/40">
          <p className="text-muted-foreground">
            Esta funcionalidad estará disponible próximamente. 
            Por favor, usa la página dedicada de "Páginas" para gestionar tu contenido estático.
          </p>
          <Button variant="link" className="mt-2" asChild>
            <a href="/admin/pages">Ir a Gestión de Páginas</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentPagesTab;
