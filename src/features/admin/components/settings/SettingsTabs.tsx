
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Settings, Shield } from 'lucide-react';
import { OnboardingSettings } from './OnboardingSettings';
import { NotificationSettings } from './NotificationSettings';
import { TestDataSettings } from './TestDataSettings';
import { FeaturesConfig } from '@/contexts/OnboardingContext';

interface SettingsTabsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
}

export const SettingsTabs: React.FC<SettingsTabsProps> = ({ 
  featuresConfig, 
  onToggleFeature 
}) => {
  return (
    <Tabs defaultValue="features" className="space-y-4">
      <TabsList>
        <TabsTrigger value="features">Funcionalidades</TabsTrigger>
        <TabsTrigger value="security">Seguridad</TabsTrigger>
        <TabsTrigger value="appearance">Apariencia</TabsTrigger>
      </TabsList>

      <TabsContent value="features" className="space-y-4">
        <OnboardingSettings 
          featuresConfig={featuresConfig} 
          onToggleFeature={onToggleFeature} 
        />
        <NotificationSettings 
          featuresConfig={featuresConfig} 
          onToggleFeature={onToggleFeature} 
        />
        <TestDataSettings 
          featuresConfig={featuresConfig} 
          onToggleFeature={onToggleFeature} 
        />
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Configuración de Seguridad
            </CardTitle>
            <CardDescription>
              Estas opciones se añadirán en futuras actualizaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              No hay opciones de seguridad configurables en esta versión.
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="appearance">
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Apariencia</CardTitle>
            <CardDescription>
              Estas opciones se añadirán en futuras actualizaciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              No hay opciones de apariencia configurables en esta versión.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
