
import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { AppearanceSettings } from './AppearanceSettings';
import { SecuritySettings } from './SecuritySettings';
import { NotificationSettings } from './NotificationSettings';
import { ContentSettings } from './ContentSettings';
import { OnboardingSettings } from './OnboardingSettings';
import { TestDataSettings } from './TestDataSettings';
import AdminNavTabs, { AdminTabItem } from '@/components/shared/AdminNavTabs';
import DeveloperSettings from '@/components/admin/settings/DeveloperSettings';
import AdminMenu from '@/components/ui/admin-menu/AdminMenu';
import { 
  FileText, 
  Settings, 
  Lock, 
  Bell, 
  PaintBucket, 
  Lightbulb, 
  Database,
  Users,
  Code,
  LayoutDashboard
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
        <div className="grid gap-6">
          <h2 className="text-xl font-semibold mb-4">Opciones Generales</h2>
          
          <AdminMenu 
            items={[
              {
                icon: FileText,
                label: 'Gestión de Páginas',
                href: '/admin/settings/pages',
                description: 'Administrar páginas del sitio'
              },
              {
                icon: LayoutDashboard,
                label: 'Diseño del Dashboard',
                href: '/admin/settings/dashboard',
                description: 'Personalizar dashboard'
              },
              {
                icon: Users,
                label: 'Perfiles de Usuario',
                href: '/admin/settings/profiles',
                description: 'Configuración de perfiles'
              }
            ]}
            variant="buttons"
          />
        </div>
      )
    },
    {
      label: 'Apariencia',
      value: 'appearance',
      icon: <PaintBucket className="h-4 w-4" />,
      content: <AppearanceSettings 
        featuresConfig={featuresConfig}
        onToggleFeature={handleToggleFeature}
        isLoading={isSaving}
      />
    },
    {
      label: 'Seguridad',
      value: 'security',
      icon: <Lock className="h-4 w-4" />,
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
      label: 'Contenido',
      value: 'content',
      icon: <FileText className="h-4 w-4" />,
      content: <ContentSettings 
        featuresConfig={featuresConfig}
        onToggleFeature={handleToggleFeature}
        isLoading={isSaving}
      />
    },
    {
      label: 'Onboarding',
      value: 'onboarding',
      icon: <Lightbulb className="h-4 w-4" />,
      content: <OnboardingSettings 
        featuresConfig={featuresConfig}
        onToggleFeature={handleToggleFeature}
        isLoading={isSaving}
      />
    },
    {
      label: 'Datos de Prueba',
      value: 'test-data',
      icon: <Database className="h-4 w-4" />,
      content: <TestDataSettings 
        featuresConfig={featuresConfig}
        onToggleFeature={handleToggleFeature}
        isLoading={isSaving}
      />
    },
    {
      label: 'Desarrollador',
      value: 'developer',
      icon: <Code className="h-4 w-4" />,
      content: <DeveloperSettings />
    }
  ];

  return <AdminNavTabs tabs={tabs} defaultValue="general" />;
};

export default SettingsTabs;
