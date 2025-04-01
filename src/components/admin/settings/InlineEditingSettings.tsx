
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PenSquare, AlertCircle, FileEdit, Save, Wand2, KeyRound, History, Users, Tag } from 'lucide-react';
import { useFeatures } from '@/contexts/features/FeaturesContext';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';

interface InlineEditingSettingsProps {
  isLoading?: boolean;
}

const InlineEditingSettings: React.FC<InlineEditingSettingsProps> = ({ isLoading = false }) => {
  const { featuresConfig, toggleFeature } = useFeatures();

  const handleToggleInlineEditing = async () => {
    await toggleFeature('enableInlineEditing');
    
    if (!featuresConfig.enableInlineEditing) {
      toast.success('Edición universal activada. Ahora puedes editar cualquier elemento visible en las páginas.');
    } else {
      toast.info('Edición universal desactivada.');
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <PenSquare className="h-5 w-5 text-primary" />
              Edición Universal
            </CardTitle>
            <CardDescription className="mt-1">
              Sistema de edición inline para modificar cualquier contenido visible en tiempo real
            </CardDescription>
          </div>
          <Badge 
            variant={featuresConfig.enableInlineEditing ? "default" : "outline"}
            className={featuresConfig.enableInlineEditing ? "bg-green-500 hover:bg-green-600" : ""}
          >
            {featuresConfig.enableInlineEditing ? "Activado" : "Desactivado"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-y-1">
          <div>
            <Label htmlFor="inline-editing" className="font-medium flex items-center">
              <FileEdit className="mr-2 h-4 w-4 text-primary" />
              Activar edición universal
            </Label>
            <p className="text-sm text-muted-foreground">
              Permite editar cualquier elemento visible directamente en las páginas
            </p>
          </div>
          <Switch
            id="inline-editing"
            checked={featuresConfig.enableInlineEditing}
            onCheckedChange={handleToggleInlineEditing}
            disabled={isLoading}
          />
        </div>

        <Separator />

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="features">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <FileEdit className="h-4 w-4 text-primary" />
                Características disponibles
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2 pl-6">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 bg-primary/10 rounded-full p-1">
                    <FileEdit className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Edición de texto en vivo</p>
                    <p className="text-xs text-muted-foreground">
                      Edita cualquier texto visible directamente en la página
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 bg-primary/10 rounded-full p-1">
                    <Save className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Guardado automático</p>
                    <p className="text-xs text-muted-foreground">
                      Los cambios se guardan automáticamente o bajo demanda
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 bg-primary/10 rounded-full p-1">
                    <Wand2 className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Asistente de IA</p>
                    <p className="text-xs text-muted-foreground">
                      Mejora tu contenido con sugerencias inteligentes
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 bg-primary/10 rounded-full p-1">
                    <History className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Historial de cambios</p>
                    <p className="text-xs text-muted-foreground">
                      Deshaz y rehaz cambios con el historial completo
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 bg-primary/10 rounded-full p-1">
                    <Tag className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Etiquetado de elementos</p>
                    <p className="text-xs text-muted-foreground">
                      Organiza y categoriza tu contenido con etiquetas
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 bg-primary/10 rounded-full p-1">
                    <KeyRound className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Control de acceso</p>
                    <p className="text-xs text-muted-foreground">
                      Permisos granulares por rol de usuario
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="coming-soon">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                Próximamente
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2 pl-6">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 bg-amber-500/10 rounded-full p-1">
                    <Users className="h-3 w-3 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Edición colaborativa</p>
                    <p className="text-xs text-muted-foreground">
                      Edita contenido simultáneamente con otros usuarios
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 bg-amber-500/10 rounded-full p-1">
                    <Wand2 className="h-3 w-3 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Generación avanzada con IA</p>
                    <p className="text-xs text-muted-foreground">
                      Genera secciones completas con IA específica para tu negocio
                    </p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="pt-2">
          <Alert className="bg-primary/5 border-primary/20">
            <AlertTitle className="flex items-center text-primary">
              <PenSquare className="h-4 w-4 mr-2" />
              Edición Universal: Potente y Sencilla
            </AlertTitle>
            <AlertDescription className="mt-2 text-sm">
              La edición universal permite a los administradores modificar cualquier contenido 
              visible directamente en la página, sin necesidad de acceder al panel de administración.
              Activa esta funcionalidad y utiliza el botón flotante para comenzar a editar.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
};

export default InlineEditingSettings;
