
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionPageLayout, { PageSection } from '@/layouts/SectionPageLayout';
import { Settings, Shield, Bell, Palette, Database, FileText, ToggleLeft } from 'lucide-react';
import { AppearanceSettings } from '@/features/admin/components/settings/AppearanceSettings';
import { SecuritySettings } from '@/features/admin/components/settings/SecuritySettings';
import { NotificationSettings } from '@/features/admin/components/settings/NotificationSettings';
import { ContentSettings } from '@/features/admin/components/settings/ContentSettings';
import { TestDataSettings } from '@/features/admin/components/settings/TestDataSettings';
import { OnboardingSettings } from '@/features/admin/components/settings/OnboardingSettings';
import { FeaturesConfig } from '@/contexts/OnboardingContext';

type SettingsTab = 'general' | 'appearance' | 'security' | 'notifications' | 'content' | 'test-data' | 'onboarding';

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>({} as FeaturesConfig);
  
  const handleToggleFeature = (feature: keyof FeaturesConfig, value: boolean) => {
    setFeaturesConfig(prev => ({
      ...prev,
      [feature]: value
    }));
  };
  
  return (
    <SectionPageLayout
      header={{
        title: "Configuración del Sistema",
        description: "Administra las configuraciones y preferencias del sistema."
      }}
    >
      <PageSection variant="card">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as SettingsTab)} className="w-full">
          <TabsList className="mb-6 grid grid-cols-3 md:grid-cols-7">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden md:inline">Apariencia</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden md:inline">Seguridad</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Notificaciones</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Contenido</span>
            </TabsTrigger>
            <TabsTrigger value="test-data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden md:inline">Datos de Prueba</span>
            </TabsTrigger>
            <TabsTrigger value="onboarding" className="flex items-center gap-2">
              <ToggleLeft className="h-4 w-4" />
              <span className="hidden md:inline">Onboarding</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Contenido de cada tab */}
          <TabsContent value="general" className="space-y-4">
            <h3 className="text-xl font-medium">Configuración General</h3>
            <p className="text-muted-foreground">
              Configuración principal del sistema, incluida la información del sitio y preferencias globales.
            </p>
            <div className="h-64 flex items-center justify-center bg-muted/40 rounded-md">
              <p className="text-muted-foreground">Contenido de configuración general en desarrollo</p>
            </div>
          </TabsContent>
          
          <TabsContent value="appearance">
            <AppearanceSettings 
              featuresConfig={featuresConfig}
              onToggleFeature={handleToggleFeature}
            />
          </TabsContent>
          
          <TabsContent value="security">
            <SecuritySettings 
              featuresConfig={featuresConfig}
              onToggleFeature={handleToggleFeature}
            />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationSettings 
              featuresConfig={featuresConfig}
              onToggleFeature={handleToggleFeature}
            />
          </TabsContent>
          
          <TabsContent value="content">
            <ContentSettings 
              featuresConfig={featuresConfig}
              onToggleFeature={handleToggleFeature}
            />
          </TabsContent>
          
          <TabsContent value="test-data">
            <TestDataSettings 
              featuresConfig={featuresConfig}
              onToggleFeature={handleToggleFeature}
            />
          </TabsContent>
          
          <TabsContent value="onboarding">
            <OnboardingSettings 
              featuresConfig={featuresConfig}
              onToggleFeature={handleToggleFeature}
            />
          </TabsContent>
        </Tabs>
      </PageSection>
    </SectionPageLayout>
  );
};

export default SystemSettings;
