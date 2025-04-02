
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import InlineEditingSettings from '@/components/admin/settings/InlineEditingSettings';
import { ExtendedFeatureId, FeatureId } from '@/contexts/features/types';

// Simplified ContentSettings component with added props
interface ContentSettingsProps {
  featuresConfig?: any;
  onToggleFeature?: (featureId: ExtendedFeatureId | FeatureId, value?: boolean) => Promise<void> | void;
  isLoading?: boolean;
}

const ContentSettings: React.FC<ContentSettingsProps> = ({ 
  featuresConfig, 
  onToggleFeature, 
  isLoading = false 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Configuración de Contenido</h3>
        <p className="text-sm text-muted-foreground">
          Gestiona la configuración de contenido de la plataforma
        </p>
      </div>
      <Separator />
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="inline-editing">Edición en línea</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Opciones Generales</CardTitle>
              <CardDescription>
                Configura las opciones generales para el contenido
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Las opciones de contenido han sido simplificadas</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inline-editing" className="space-y-4">
          <InlineEditingSettings isLoading={isLoading} />
        </TabsContent>
        
        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración SEO</CardTitle>
              <CardDescription>
                Configura las opciones de SEO para el contenido
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Las opciones de SEO han sido simplificadas</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentSettings;
