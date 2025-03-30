
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Paintbrush, FileText, BarChart, Settings } from 'lucide-react';
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
        <TabsTrigger value="features" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>Funcionalidades</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Seguridad</span>
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <Paintbrush className="h-4 w-4" />
          <span>Apariencia</span>
        </TabsTrigger>
        <TabsTrigger value="content" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>Contenido</span>
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center gap-2">
          <BarChart className="h-4 w-4" />
          <span>Analíticas</span>
        </TabsTrigger>
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
