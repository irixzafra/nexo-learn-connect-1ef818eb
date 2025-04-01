
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PenSquare, AlertTriangle, FileEdit, Save, ListTree, Layout, Menu, FileX } from 'lucide-react';
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
      toast.info('Edición inline en desarrollo. Esta funcionalidad está siendo reconstruida para mejorar la experiencia.');
    } else {
      toast.info('Edición inline desactivada.');
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <PenSquare className="h-5 w-5 text-primary" />
          Edición Inline Universal
        </CardTitle>
        <CardDescription>
          Configuración para la edición directa de cualquier contenido visible en las páginas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-y-1">
          <div>
            <Label htmlFor="inline-editing" className="font-medium flex items-center">
              <FileEdit className="mr-2 h-4 w-4 text-primary" />
              Activar edición inline universal
            </Label>
            <p className="text-sm text-muted-foreground">
              Permite editar cualquier elemento visible directamente en las páginas
            </p>
          </div>
          <Switch
            id="inline-editing"
            checked={featuresConfig.enableInlineEditing}
            onCheckedChange={handleToggleInlineEditing}
            disabled={isLoading || true}
          />
        </div>

        <Alert variant="warning" className="bg-yellow-500/10 text-yellow-600 border-yellow-200">
          <AlertTitle className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Funcionalidad en desarrollo
          </AlertTitle>
          <AlertDescription className="mt-2 text-sm">
            La edición inline universal está siendo reconstruida para mejorar la experiencia del usuario.
            Esta funcionalidad estará disponible próximamente con mejoras significativas.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default InlineEditingSettings;
