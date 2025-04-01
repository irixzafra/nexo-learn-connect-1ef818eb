
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
const ContentCategoriesTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorías de Contenido</CardTitle>
        <CardDescription>
          Gestiona las categorías para organizar el contenido de tu plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Categoría
        </Button>
        <div className="mt-4 p-8 text-center border border-dashed rounded-md bg-muted/40">
          <p className="text-muted-foreground">
            Esta funcionalidad estará disponible próximamente. 
            Por favor, usa la página dedicada de "Categorías" para gestionar las categorías.
          </p>
          <Button variant="link" className="mt-2" asChild>
            <a href="/admin/categories">Ir a Gestión de Categorías</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCategoriesTab;
