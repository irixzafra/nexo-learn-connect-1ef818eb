
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Paintbrush, FileText } from 'lucide-react';
import { OnboardingSettings } from './OnboardingSettings';
import { NotificationSettings } from './NotificationSettings';
import { TestDataSettings } from './TestDataSettings';
import { SecuritySettings } from './SecuritySettings';
import { AppearanceSettings } from './AppearanceSettings';
import { ContentSettings } from './ContentSettings';
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
        <TabsTrigger value="content">Contenido</TabsTrigger>
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
        <SecuritySettings 
          featuresConfig={featuresConfig} 
          onToggleFeature={onToggleFeature} 
        />
      </TabsContent>

      <TabsContent value="appearance">
        <AppearanceSettings
          featuresConfig={featuresConfig}
          onToggleFeature={onToggleFeature}
        />
      </TabsContent>
      
      <TabsContent value="content">
        <ContentSettings
          featuresConfig={featuresConfig}
          onToggleFeature={onToggleFeature}
        />
      </TabsContent>
    </Tabs>
  );
};
