
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PenSquare, AlertTriangle, FileEdit, Save } from 'lucide-react';
import { useFeatures } from '@/contexts/features/FeaturesContext';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface InlineEditingSettingsProps {
  isLoading?: boolean;
}

const InlineEditingSettings: React.FC<InlineEditingSettingsProps> = ({ isLoading = false }) => {
  const { featuresConfig, toggleFeature } = useFeatures();

  const handleToggleInlineEditing = async () => {
    await toggleFeature('enableInlineEditing');
    
    if (!featuresConfig.enableInlineEditing) {
      toast.success('Edición inline activada. Ahora puedes editar contenido directamente en las páginas.');
    } else {
      toast.info('Edición inline desactivada.');
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <PenSquare className="h-5 w-5 text-primary" />
          Edición Inline
        </CardTitle>
        <CardDescription>
          Configura las opciones para la edición directa de contenido en las páginas públicas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-y-1">
          <div>
            <Label htmlFor="inline-editing" className="font-medium flex items-center">
              <FileEdit className="mr-2 h-4 w-4 text-primary" />
              Activar edición inline
            </Label>
            <p className="text-sm text-muted-foreground">
              Permite editar contenido directamente en las páginas públicas
            </p>
          </div>
          <Switch
            id="inline-editing"
            checked={featuresConfig.enableInlineEditing}
            onCheckedChange={handleToggleInlineEditing}
            disabled={isLoading}
          />
        </div>

        {featuresConfig.enableInlineEditing && (
          <>
            <Separator className="my-2" />
            
            <Alert variant="info" className="bg-primary/5 text-primary">
              <AlertTitle className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Importante
              </AlertTitle>
              <AlertDescription className="mt-2 text-sm">
                La edición inline permite modificar el contenido directamente en las páginas públicas. 
                Para activar el modo de edición, haz clic en el botón "Editar" que aparecerá en la interfaz.
                <div className="mt-3">
                  <strong>Características activas:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Edición directa de contenido en cualquier elemento visible</li>
                    <li>Edición de textos, imágenes y elementos de página</li>
                    <li>Edición de páginas de error y páginas 404</li>
                    <li>Asistente de edición con IA</li>
                    <li>Bloqueo de navegación durante la edición</li>
                    <li>Guardado de borradores</li>
                    <li>Advertencia de cambios no guardados</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>

            <div className="flex justify-end gap-2 mt-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast.info('Configuración avanzada próximamente')}
              >
                Configuración avanzada
              </Button>
              <Button 
                variant="default" 
                size="sm"
                className="gap-2"
                onClick={() => toast.success('Configuración guardada correctamente')}
              >
                <Save className="h-4 w-4" />
                Guardar configuración
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default InlineEditingSettings;
