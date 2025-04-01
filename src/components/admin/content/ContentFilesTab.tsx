
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Upload } from 'lucide-react';

// Este es un componente de marcador de posición hasta que se implemente completamente
const ContentFilesTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Archivos y Medios</CardTitle>
        <CardDescription>
          Gestiona los archivos multimedia de tu plataforma educativa
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Subir Archivos
        </Button>
        <div className="mt-4 p-8 text-center border border-dashed rounded-md bg-muted/40">
          <p className="text-muted-foreground">
            La gestión de archivos estará disponible próximamente. 
            Por ahora, puedes subir archivos al crear o editar un curso.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentFilesTab;
