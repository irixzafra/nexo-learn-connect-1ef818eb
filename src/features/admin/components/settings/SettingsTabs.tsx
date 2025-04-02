import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Code, Database, Globe, Palette, Bell, BarChart, Users } from 'lucide-react';
import AppearanceSettings from './AppearanceSettings';
import ContentSettings from './ContentSettings';
import AnalyticsSettings from './AnalyticsSettings';
import DatabaseSettings from './DatabaseSettings';
import UserManagementSettings from './UserManagementSettings';
import LocalizationSettings from './LocalizationSettings';
import TestDataSettings from './TestDataSettings';
import NotificationSettings from './NotificationSettings';
import { useFeatures } from '@/hooks/useFeatures';
import { createSafeToggleFunction } from '@/utils/featureUtils';

export const SettingsTabs: React.FC = () => {
  const { featuresConfig, toggleFeature, isLoading, isFeatureEnabled } = useFeatures();

  // Create a type-safe toggle function that always returns a Promise
  const handleToggleFeature = createSafeToggleFunction(toggleFeature);

  return (
    <Tabs defaultValue="appearance" className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-8">
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          <span className="hidden md:inline">Apariencia</span>
          <span className="md:hidden">Apar.</span>
        </TabsTrigger>
        <TabsTrigger value="content" className="flex items-center gap-2">
          <Code className="h-4 w-4" />
          <span className="hidden md:inline">Contenido</span>
          <span className="md:hidden">Cont.</span>
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span className="hidden md:inline">Usuarios</span>
          <span className="md:hidden">Users</span>
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center gap-2">
          <BarChart className="h-4 w-4" />
          <span className="hidden md:inline">Analíticas</span>
          <span className="md:hidden">Analy.</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="hidden md:inline">Notificaciones</span>
          <span className="md:hidden">Notif.</span>
        </TabsTrigger>
        <TabsTrigger value="database" className="flex items-center gap-2">
          <Database className="h-4 w-4" />
          <span className="hidden md:inline">Base de datos</span>
          <span className="md:hidden">DB</span>
        </TabsTrigger>
        <TabsTrigger value="localization" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">Localización</span>
          <span className="md:hidden">Local.</span>
        </TabsTrigger>
        <TabsTrigger value="test-data" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden md:inline">Datos de prueba</span>
          <span className="md:hidden">Test</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="appearance">
        <AppearanceSettings 
          featuresConfig={featuresConfig} 
          onToggleFeature={handleToggleFeature}
          isLoading={isLoading} 
        />
      </TabsContent>
      
      <TabsContent value="content">
        <ContentSettings 
          featuresConfig={featuresConfig} 
          onToggleFeature={handleToggleFeature}
          isLoading={isLoading} 
        />
      </TabsContent>
      
      <TabsContent value="users">
        <UserManagementSettings 
          featuresConfig={featuresConfig} 
          onToggleFeature={handleToggleFeature}
          isLoading={isLoading} 
        />
      </TabsContent>
      
      <TabsContent value="analytics">
        <AnalyticsSettings 
          featuresConfig={featuresConfig} 
          onToggleFeature={handleToggleFeature}
          isLoading={isLoading} 
        />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationSettings 
          featuresConfig={featuresConfig} 
          onToggleFeature={handleToggleFeature}
          isLoading={isLoading} 
        />
      </TabsContent>
      
      <TabsContent value="database">
        <DatabaseSettings isLoading={isLoading} />
      </TabsContent>
      
      <TabsContent value="localization">
        <LocalizationSettings 
          featuresConfig={featuresConfig} 
          onToggleFeature={handleToggleFeature}
          isLoading={isLoading} 
        />
      </TabsContent>
      
      <TabsContent value="test-data">
        <TestDataSettings 
          featuresConfig={featuresConfig} 
          onToggleFeature={handleToggleFeature}
          isLoading={isLoading} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
