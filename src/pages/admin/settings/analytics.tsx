
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { useFeature } from '@/hooks/useFeature';
import { AnalyticsSettings } from '@/features/admin/components/settings/AnalyticsSettings';
import { useFeatures } from '@/hooks/useFeatures';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const AnalyticsSettingsPage: React.FC = () => {
  const { featuresConfig, toggleFeature, isLoading } = useFeatures();
  const analyticsEnabled = useFeature('enableAnalytics');

  if (!analyticsEnabled) {
    return (
      <AdminPageLayout
        title="Configuración de Analíticas"
        subtitle="Esta funcionalidad no está disponible"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
              Funcionalidad no habilitada
            </CardTitle>
            <CardDescription>
              Las analíticas están desactivadas en la configuración de características.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Para habilitar esta funcionalidad, ve a Configuración &gt; Características y activa "Analíticas".
            </p>
          </CardContent>
        </Card>
      </AdminPageLayout>
    );
  }

  const handleToggleFeature = (feature: keyof typeof featuresConfig, value: boolean) => {
    toggleFeature(feature as any, value);
  };

  return (
    <AdminPageLayout 
      title="Configuración de Analíticas" 
      subtitle="Configura las opciones de recopilación y visualización de datos analíticos"
    >
      <AnalyticsSettings 
        featuresConfig={featuresConfig} 
        onToggleFeature={handleToggleFeature}
        isLoading={isLoading}
      />
    </AdminPageLayout>
  );
};

export default AnalyticsSettingsPage;
