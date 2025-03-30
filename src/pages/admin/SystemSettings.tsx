
import React from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Settings, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { SettingsTabs } from '@/features/admin/components/settings/SettingsTabs';
import SectionPageLayout from '@/layouts/SectionPageLayout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const SystemSettings: React.FC = () => {
  const { featuresConfig, updateFeaturesConfig, isSaving, saveError } = useOnboarding();

  const handleToggleFeature = (feature: keyof typeof featuresConfig, value: boolean) => {
    updateFeaturesConfig({ [feature]: value });
    // Toast is now handled in the useOnboardingState hook
  };

  const handleRetry = () => {
    // This will re-attempt to save all current settings
    updateFeaturesConfig({});
    toast.info("Reintentando guardar configuración...");
  };

  return (
    <SectionPageLayout
      header={{
        title: 'Configuración del Sistema',
        description: 'Administra las funcionalidades y características del sistema',
        breadcrumbs: [
          { title: 'Admin', href: '/admin/dashboard' },
          { title: 'Configuración' }
        ]
      }}
    >
      {saveError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>{saveError}</span>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleRetry}
              disabled={isSaving}
            >
              Reintentar
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <SettingsTabs 
        featuresConfig={featuresConfig}
        onToggleFeature={handleToggleFeature}
        isSaving={isSaving}
      />
    </SectionPageLayout>
  );
};

export default SystemSettings;
