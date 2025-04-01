import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  Shield, 
  Bell, 
  Moon, 
  PieChart, 
  Database, 
  Users, 
  Lightbulb,
  FileText,
  Globe,
  Loader2
} from 'lucide-react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { AdminTabItem } from '@/components/shared/AdminNavTabs';
import { AppearanceSettings } from '@/features/admin/components/settings/AppearanceSettings';
import { SecuritySettings } from '@/features/admin/components/settings/SecuritySettings';
import { NotificationSettings } from '@/features/admin/components/settings/NotificationSettings';
import { AnalyticsSettings } from '@/features/admin/components/settings/AnalyticsSettings';
import { DatabaseSettings } from '@/features/admin/components/settings/DatabaseSettings';
import { UserManagementSettings } from '@/features/admin/components/settings/UserManagementSettings';
import { ContentSettings } from '@/features/admin/components/settings/ContentSettings';
import { LocalizationSettings } from '@/features/admin/components/settings/LocalizationSettings';
import { TestDataSettings } from '@/features/admin/components/settings/TestDataSettings';
import { useFeatureContext } from '@/contexts/features/FeatureContext';

const SystemSettings: React.FC = () => {
  const { featuresConfig, toggleFeature, isLoading } = useFeatureContext();

  const tabs: AdminTabItem[] = [
    {
      value: 'general',
      label: 'General',
      icon: <Settings className="h-4 w-4" />,
      content: (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-500" />
              General
            </CardTitle>
            <CardDescription>
              Configuración general del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Aquí puedes configurar las opciones generales del sistema.
            </p>
          </CardContent>
        </Card>
      )
    },
    {
      value: 'appearance',
      label: 'Apariencia',
      icon: <Moon className="h-4 w-4" />,
      content: (
        <AppearanceSettings 
          featuresConfig={featuresConfig}
          onToggleFeature={toggleFeature}
          isLoading={isLoading}
        />
      )
    },
    {
      value: 'security',
      label: 'Seguridad',
      icon: <Shield className="h-4 w-4" />,
      content: (
        <SecuritySettings 
          featuresConfig={featuresConfig}
          onToggleFeature={toggleFeature}
          isLoading={isLoading}
        />
      )
    },
    {
      value: 'notifications',
      label: 'Notificaciones',
      icon: <Bell className="h-4 w-4" />,
      content: (
        <NotificationSettings
          featuresConfig={featuresConfig}
          onToggleFeature={toggleFeature}
          isLoading={isLoading}
        />
      )
    },
    {
      value: 'analytics',
      label: 'Analíticas',
      icon: <PieChart className="h-4 w-4" />,
      content: (
        <AnalyticsSettings 
          featuresConfig={featuresConfig}
          onToggleFeature={toggleFeature}
          isLoading={isLoading}
        />
      )
    },
    {
      value: 'database',
      label: 'Base de Datos',
      icon: <Database className="h-4 w-4" />,
      content: (
        <DatabaseSettings 
          featuresConfig={featuresConfig}
          onToggleFeature={toggleFeature}
          isLoading={isLoading}
        />
      )
    },
    {
      value: 'users',
      label: 'Usuarios',
      icon: <Users className="h-4 w-4" />,
      content: (
        <UserManagementSettings
          featuresConfig={featuresConfig}
          onToggleFeature={toggleFeature}
          isLoading={isLoading}
        />
      )
    },
    {
      value: 'content',
      label: 'Contenido',
      icon: <FileText className="h-4 w-4" />,
      content: (
        <ContentSettings
          featuresConfig={featuresConfig}
          onToggleFeature={toggleFeature}
          isLoading={isLoading}
        />
      )
    },
    {
      value: 'localization',
      label: 'Localización',
      icon: <Globe className="h-4 w-4" />,
      content: (
        <LocalizationSettings
          featuresConfig={featuresConfig}
          onToggleFeature={toggleFeature}
          isLoading={isLoading}
        />
      )
    },
    {
      value: 'test-data',
      label: 'Datos de Prueba',
      icon: <Database className="h-4 w-4" />,
      content: (
        <TestDataSettings
          featuresConfig={featuresConfig}
          onToggleFeature={toggleFeature}
          isLoading={isLoading}
        />
      )
    }
  ];

  return (
    <AdminPageLayout
      title="Configuración del Sistema"
      subtitle="Administra la configuración general del sistema"
      tabs={tabs}
      defaultTabValue="general"
    />
  );
};

export default SystemSettings;
