
import React, { useState, useEffect } from 'react';
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
  Layout
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import GeneralSettings from '@/features/admin/components/settings/GeneralSettings';
import FeaturesSettings from '@/features/admin/components/settings/FeaturesSettings';
import ConnectionsSettings from '@/features/admin/components/settings/ConnectionsSettings';
import SecuritySettings from '@/features/admin/components/settings/SecuritySettings';
import DataSettings from '@/features/admin/components/settings/DataSettings';
import { FeaturesConfig } from '@/contexts/OnboardingContext';
import { useDesignSystem } from '@/contexts/DesignSystemContext';
import { useEditMode } from '@/contexts/EditModeContext';
import { toast } from 'sonner';

const SystemSettings: React.FC = () => {
  const [featuresConfig, setFeaturesConfig] = useState<FeaturesConfig>({
    enableEditMode: false, // Configuración inicial para edición en línea
    enableContentReordering: false,
    enableThemeSwitcher: true,
    enableMultiLanguage: false,
    enableAdvancedEditor: true,
    enableInvitations: true,
    enableCustomRoles: false,
    enableRealTimeNotifications: true,
    enableEmailNotifications: true,
    enablePublicApi: false,
    enableWebhooks: false,
    enable2FA: false,
    enableMultipleSessions: true,
    enablePublicRegistration: false,
    requireEmailVerification: true,
    enableActivityLog: true,
    enableDatabaseDevMode: false,
    enableAutoBackups: true,
    enableQueryCache: true,
    enableMaintenanceMode: false
  } as FeaturesConfig);
  
  const [isSaving, setIsSaving] = useState(false);
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const { designFeatureEnabled, toggleDesignFeature } = useDesignSystem();
  const { setEditModeEnabled } = useEditMode();
  
  useEffect(() => {
    // Sincronizar el estado de EditMode con el featuresConfig
    setEditModeEnabled(featuresConfig.enableEditMode || false);
  }, [featuresConfig.enableEditMode, setEditModeEnabled]);
  
  const handleToggleFeature = (feature: keyof FeaturesConfig, value: boolean) => {
    setIsSaving(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setFeaturesConfig(prev => ({
        ...prev,
        [feature]: value
      }));
      
      // Actualizar el estado de edición en línea si es esa característica
      if (feature === 'enableEditMode') {
        setEditModeEnabled(value);
      }
      
      setIsSaving(false);
      // Show toast for feedback
      toast.success(`Configuración actualizada: ${feature} ${value ? 'activado' : 'desactivado'}`);
    }, 800);
  };

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
      content: <FeaturesSettings 
        featuresConfig={featuresConfig}
        onToggleFeature={handleToggleFeature}
        isLoading={isSaving}
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
        isLoading={isSaving}
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
        isLoading={isSaving}
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
