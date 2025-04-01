
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FeatureAccordionGroup } from './FeatureAccordionGroup';
import { PlatformFeaturesAccordion } from './PlatformFeaturesAccordion';
import { useFeatureContext } from '@/contexts/features/FeatureContext';
import { FeaturesConfig } from '@/contexts/features/types';

interface FeatureTabContentProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading: boolean;
}

const UserManagementTab: React.FC<FeatureTabContentProps> = (props) => (
  <FeatureAccordionGroup {...props} features={['enableUserFeedback', 'enableMentoring']} title="Gestión de Usuarios" description="Funcionalidades relacionadas con la administración de usuarios" />
);

const ContentTab: React.FC<FeatureTabContentProps> = (props) => (
  <FeatureAccordionGroup {...props} features={['enableMultiLanguage', 'enableVideoLessons', 'enableCodeEditor', 'enableWhiteboardFeature']} title="Contenido" description="Funcionalidades relacionadas con el contenido educativo" />
);

const GamificationTab: React.FC<FeatureTabContentProps> = (props) => (
  <FeatureAccordionGroup {...props} features={['enableGamification', 'enableLeaderboards', 'enableBadges']} title="Gamificación" description="Funcionalidades de gamificación y fidelización" />
);

const AnalyticsTab: React.FC<FeatureTabContentProps> = (props) => (
  <FeatureAccordionGroup {...props} features={['enableAnalytics', 'enableProgressTracking']} title="Analíticas" description="Funcionalidades de seguimiento y análisis" />
);

const CustomizationTab: React.FC<FeatureTabContentProps> = (props) => (
  <FeatureAccordionGroup {...props} features={['enableThemingOptions', 'enableCustomBranding', 'enableDarkMode', 'enableDashboardCustomization']} title="Personalización" description="Opciones de personalización visual" />
);

const SystemTab: React.FC<FeatureTabContentProps> = (props) => (
  <FeatureAccordionGroup {...props} features={['enableBetaFeatures', 'enableDebugMode', 'enableOfflineMode', 'enableTestDataGenerator']} title="Sistema" description="Configuraciones del sistema y herramientas de desarrollo" />
);

const NotificationsTab: React.FC<FeatureTabContentProps> = (props) => (
  <FeatureAccordionGroup {...props} features={['enableNotifications', 'enableEmailNotifications']} title="Notificaciones" description="Configuraciones de notificaciones y alertas" />
);

const CommunicationTab: React.FC<FeatureTabContentProps> = (props) => (
  <FeatureAccordionGroup {...props} features={['enableCommunityFeatures', 'enableLiveChat', 'enableSocialSharing']} title="Comunicación" description="Funcionalidades de comunicación y comunidad" />
);

export const FeatureManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('platform');
  const { featuresConfig, toggleFeature, isLoading } = useFeatureContext();

  const commonProps = {
    featuresConfig,
    onToggleFeature: toggleFeature,
    isLoading
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Gestión de Características</h2>
        <p className="text-muted-foreground">
          Activa o desactiva las funcionalidades del sistema
        </p>
      </div>
      
      <Tabs defaultValue="platform" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-6">
          <TabsTrigger value="platform">Plataforma</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="content">Contenido</TabsTrigger>
          <TabsTrigger value="gamification">Gamificación</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          <TabsTrigger value="customization">Personalización</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
          <TabsTrigger value="communication">Comunicación</TabsTrigger>
        </TabsList>
        
        <TabsContent value="platform">
          <PlatformFeaturesAccordion {...commonProps} />
        </TabsContent>
        
        <TabsContent value="users">
          <UserManagementTab {...commonProps} />
        </TabsContent>
        
        <TabsContent value="content">
          <ContentTab {...commonProps} />
        </TabsContent>
        
        <TabsContent value="gamification">
          <GamificationTab {...commonProps} />
        </TabsContent>
        
        <TabsContent value="analytics">
          <AnalyticsTab {...commonProps} />
        </TabsContent>
        
        <TabsContent value="customization">
          <CustomizationTab {...commonProps} />
        </TabsContent>
        
        <TabsContent value="system">
          <SystemTab {...commonProps} />
        </TabsContent>
        
        <TabsContent value="communication">
          <CommunicationTab {...commonProps} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
