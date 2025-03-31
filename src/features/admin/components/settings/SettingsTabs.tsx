
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Paintbrush, FileText, BarChart } from 'lucide-react';
import { OnboardingSettings } from './OnboardingSettings';
import { NotificationSettings } from './NotificationSettings';
import { TestDataSettings } from './TestDataSettings';
import { SecuritySettings } from './SecuritySettings';
import { AppearanceSettings } from './AppearanceSettings';
import { ContentSettings } from './ContentSettings';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SettingsTabsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isSaving?: boolean;
}

export const SettingsTabs: React.FC<SettingsTabsProps> = ({ 
  featuresConfig, 
  onToggleFeature,
  isSaving = false
}) => {
  return (
    <Tabs defaultValue="features" className="space-y-4">
      <TabsList>
        <TabsTrigger value="features">Funcionalidades</TabsTrigger>
        <TabsTrigger value="security">Seguridad</TabsTrigger>
        <TabsTrigger value="appearance">Apariencia</TabsTrigger>
        <TabsTrigger value="content">Contenido</TabsTrigger>
        <TabsTrigger value="analytics">Analíticas</TabsTrigger>
      </TabsList>

      <TabsContent value="features" className="space-y-4">
        <OnboardingSettings 
          featuresConfig={featuresConfig} 
          onToggleFeature={onToggleFeature}
          isLoading={isSaving}
        />
        <NotificationSettings 
          featuresConfig={featuresConfig} 
          onToggleFeature={onToggleFeature}
          isLoading={isSaving}
        />
        <TestDataSettings 
          featuresConfig={featuresConfig} 
          onToggleFeature={onToggleFeature}
          isLoading={isSaving}
        />
      </TabsContent>

      <TabsContent value="security">
        <SecuritySettings 
          featuresConfig={featuresConfig} 
          onToggleFeature={onToggleFeature}
          isLoading={isSaving}
        />
      </TabsContent>

      <TabsContent value="appearance">
        <AppearanceSettings
          featuresConfig={featuresConfig}
          onToggleFeature={onToggleFeature}
          isLoading={isSaving}
        />
      </TabsContent>
      
      <TabsContent value="content">
        <ContentSettings
          featuresConfig={featuresConfig}
          onToggleFeature={onToggleFeature}
          isLoading={isSaving}
        />
      </TabsContent>
      
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Analíticas</CardTitle>
            <CardDescription>
              Configura las métricas y análisis del sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center h-48 bg-muted/50 rounded-md">
              <div className="text-center">
                <BarChart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p>Configuración de analíticas en desarrollo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
