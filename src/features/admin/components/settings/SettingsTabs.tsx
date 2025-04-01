
import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import AppearanceSettings from './AppearanceSettings';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';
import ContentSettings from './ContentSettings';
import OnboardingSettings from './OnboardingSettings';
import TestDataSettings from './TestDataSettings';
import AdminNavTabs, { AdminTabItem } from '@/components/shared/AdminNavTabs';
import DeveloperSettings from '@/components/admin/settings/DeveloperSettings';
import AdminMenu from '@/components/ui/admin-menu/AdminMenu';
import { 
  Settings, 
  Shield, 
  Bell, 
  PaintBucket, 
  Lightbulb, 
  Database,
  Users,
  Code,
  LayoutDashboard,
  Globe,
  ToggleLeft,
  Wrench,
  Palette
} from 'lucide-react';
import { FeaturesConfig } from '@/contexts/OnboardingContext';

const SettingsTabs: React.FC = () => {
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>({} as FeaturesConfig);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleToggleFeature = (feature: keyof FeaturesConfig, value: boolean) => {
    setFeaturesConfig(prev => ({
      ...prev,
      [feature]: value
    }));
  };
  
  const tabs: AdminTabItem[] = [
    {
      label: 'General',
      value: 'general',
      icon: <Settings className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Configuración General</h2>
          
          <AdminMenu 
            items={[
              {
                icon: LayoutDashboard,
                label: 'Interfaz',
                href: '/admin/settings/interface',
                description: 'Personalizar interfaz y dashboard'
              },
              {
                icon: Globe,
                label: 'Localización',
                href: '/admin/settings/localization',
                description: 'Idioma y formato regional'
              },
              {
                icon: Wrench,
                label: 'Mantenimiento',
                href: '/admin/settings/maintenance',
                description: 'Modo mantenimiento y respaldos'
              }
            ]}
            variant="cards"
          />
        </div>
      )
    },
    {
      label: 'Apariencia',
      value: 'appearance',
      icon: <Palette className="h-4 w-4" />,
      content: <AppearanceSettings 
        featuresConfig={featuresConfig}
        onToggleFeature={handleToggleFeature}
        isLoading={isSaving}
      />
    },
    {
      label: 'Contenido',
      value: 'content',
      icon: <PaintBucket className="h-4 w-4" />,
      content: <ContentSettings 
        featuresConfig={featuresConfig}
        onToggleFeature={handleToggleFeature}
        isLoading={isSaving}
      />
    },
    {
      label: 'Seguridad',
      value: 'security',
      icon: <Shield className="h-4 w-4" />,
      content: <SecuritySettings 
        featuresConfig={featuresConfig}
        onToggleFeature={handleToggleFeature}
        isLoading={isSaving}
      />
    },
    {
      label: 'Notificaciones',
      value: 'notifications',
      icon: <Bell className="h-4 w-4" />,
      content: <NotificationSettings 
        featuresConfig={featuresConfig}
        onToggleFeature={handleToggleFeature}
        isLoading={isSaving}
      />
    },
    {
      label: 'Características',
      value: 'features',
      icon: <ToggleLeft className="h-4 w-4" />,
      content: <OnboardingSettings 
        featuresConfig={featuresConfig}
        onToggleFeature={handleToggleFeature}
        isLoading={isSaving}
      />
    },
    {
      label: 'Desarrollador',
      value: 'developer',
      icon: <Code className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Herramientas de Desarrollo</h2>
          
          <AdminMenu 
            items={[
              {
                icon: Database,
                label: 'Datos de Prueba',
                href: '/admin/test-data',
                description: 'Generar datos para pruebas'
              },
              {
                icon: Code,
                label: 'API y Endpoints',
                href: '/admin/settings/api',
                description: 'Gestionar APIs y endpoints'
              },
              {
                icon: Lightbulb,
                label: 'Debug',
                href: '/admin/settings/debug',
                description: 'Herramientas de diagnóstico'
              }
            ]}
            variant="cards"
          />
          
          <DeveloperSettings />
        </div>
      )
    }
  ];

  return <AdminNavTabs tabs={tabs} defaultValue="general" />;
};

export default SettingsTabs;
