
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';
import InlineEditingSettings from '@/components/admin/settings/InlineEditingSettings';

export const ContentSettings: React.FC = () => {
  const featuresConfig = {
    inline_editing: false,
    drag_and_drop: false,
    ai_assistant: true
  };

  const onToggleFeature = async (featureId: string, value?: boolean) => {
    console.log(`Toggling feature ${featureId} to ${value}`);
    return Promise.resolve();
  };

  const isLoading = false;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Configuración de Contenido</h3>
        <p className="text-sm text-muted-foreground">
          Gestiona las opciones relacionadas con la edición y visualización de contenido
        </p>
      </div>

      <Tabs defaultValue="editor">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="inline">Edición Inline</TabsTrigger>
          <TabsTrigger value="media">Medios</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Opciones del Editor</CardTitle>
              <CardDescription>
                Personaliza el comportamiento y apariencia del editor de contenido
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="editor-theme">Tema del Editor</Label>
                <ToggleGroup type="single" defaultValue="light" id="editor-theme">
                  <ToggleGroupItem value="light">Claro</ToggleGroupItem>
                  <ToggleGroupItem value="dark">Oscuro</ToggleGroupItem>
                  <ToggleGroupItem value="system">Sistema</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inline" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Edición Inline</CardTitle>
              <CardDescription>
                Configura las opciones para la edición inline de contenido
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InlineEditingSettings 
                featuresConfig={featuresConfig} 
                onToggleFeature={onToggleFeature} 
                isLoading={isLoading} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Medios</CardTitle>
              <CardDescription>
                Configura las opciones para la gestión de imágenes y otros medios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Características de gestión de medios en desarrollo.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentSettings;
