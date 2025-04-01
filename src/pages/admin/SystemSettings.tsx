
import React, { useState } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { AdminTabItem } from '@/components/shared/AdminNavTabs';
import { 
  Settings, 
  Shield, 
  Bell, 
  Palette, 
  Database, 
  ToggleRight,
  Server,
  Plug,
  ShieldCheck,
  DatabaseZap,
  Globe,
  Layout,
  Book
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import GeneralSettings from '@/features/admin/components/settings/GeneralSettings';
import FeaturesSettings from '@/features/admin/components/settings/FeaturesSettings';
import ConnectionsSettings from '@/features/admin/components/settings/ConnectionsSettings';
import { SecuritySettings } from '@/features/admin/components/settings/SecuritySettings';
import DataSettings from '@/features/admin/components/settings/DataSettings';
import AppearanceSettings from '@/features/admin/components/settings/AppearanceSettings';
import ContentSettings from '@/features/admin/components/settings/ContentSettings';
import { OnboardingSettings } from '@/features/admin/components/settings/OnboardingSettings';
import { useDesignSystem } from '@/contexts/DesignSystemContext';
import { useEditMode } from '@/contexts/EditModeContext';
import { toast } from 'sonner';
import { useFeatures } from '@/contexts/features/FeaturesContext';
import type { FeaturesConfig } from '@/contexts/features/types';

/**
 * Página de configuración del sistema para administradores
 */
const SystemSettings: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const { designFeatureEnabled, toggleDesignFeature } = useDesignSystem();
  const { setEditModeEnabled } = useEditMode();
  const { featuresConfig, toggleFeature, isLoading } = useFeatures();
  
  const handleToggleDesignSystem = async () => {
    try {
      await toggleDesignFeature(!designFeatureEnabled);
      toast.success(designFeatureEnabled 
        ? 'Sistema de Diseño desactivado' 
        : 'Sistema de Diseño activado');
      
      // Recargar la página para aplicar los cambios del sistema de diseño
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error toggling design system:', error);
      toast.error('Error al cambiar el estado del Sistema de Diseño');
    }
  };

  // Create wrapper function to convert Promise-based toggleFeature to sync function
  const handleToggleFeature = (feature: keyof typeof featuresConfig, value: boolean) => {
    toggleFeature(feature, value).catch(err => {
      console.error('Error toggling feature', err);
      toast.error('Error al cambiar característica');
    });
  };

  const tabs: AdminTabItem[] = [
    {
      value: 'general',
      label: 'General',
      icon: <Settings className="h-4 w-4" />,
      dataTag: "settings-tab-general",
      content: <GeneralSettings />
    },
    {
      value: 'features',
      label: 'Funcionalidades',
      icon: <ToggleRight className="h-4 w-4" />,
      dataTag: "settings-tab-features",
      content: <FeaturesSettings />
    },
    {
      value: 'appearance',
      label: 'Apariencia',
      icon: <Palette className="h-4 w-4" />,
      dataTag: "settings-tab-appearance",
      content: <AppearanceSettings 
                featuresConfig={featuresConfig} 
                onToggleFeature={handleToggleFeature} 
                isLoading={isLoading} 
              />
    },
    {
      value: 'content',
      label: 'Contenido',
      icon: <Layout className="h-4 w-4" />,
      dataTag: "settings-tab-content",
      content: <ContentSettings 
                featuresConfig={featuresConfig} 
                onToggleFeature={handleToggleFeature} 
                isLoading={isLoading} 
              />
    },
    {
      value: 'onboarding',
      label: 'Onboarding',
      icon: <Book className="h-4 w-4" />,
      dataTag: "settings-tab-onboarding",
      content: <OnboardingSettings 
                featuresConfig={featuresConfig} 
                onToggleFeature={handleToggleFeature} 
                isLoading={isLoading} 
              />
    },
    {
      value: 'connections',
      label: 'Conexiones',
      icon: <Plug className="h-4 w-4" />,
      dataTag: "settings-tab-connections",
      content: <ConnectionsSettings />
    },
    {
      value: 'security',
      label: 'Seguridad',
      icon: <ShieldCheck className="h-4 w-4" />,
      dataTag: "settings-tab-security",
      content: <SecuritySettings 
                featuresConfig={featuresConfig} 
                onToggleFeature={handleToggleFeature} 
                isLoading={isLoading} 
              />
    },
    {
      value: 'data',
      label: 'Datos',
      icon: <DatabaseZap className="h-4 w-4" />,
      dataTag: "settings-tab-data",
      content: <DataSettings 
                featuresConfig={featuresConfig}
                onToggleFeature={handleToggleFeature}
                isLoading={isLoading}
              />
    }
  ];
  
  return (
    <AdminPageLayout
      title="Configuración del Sistema"
      subtitle="Administra las configuraciones y preferencias del sistema"
      tabs={tabs}
      defaultTabValue={tab || "general"}
    />
  );
};

export default SystemSettings;
