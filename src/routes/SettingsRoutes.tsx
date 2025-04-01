
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import PagesManagement from '@/pages/admin/settings/pages';
import { useFeatures } from '@/hooks/useFeatures';
import DataSettings from '@/features/admin/components/settings/DataSettings';
import IntegrationsPage from '@/pages/admin/settings/integrations';

// Placeholder components until actual ones are created
const GeneralSettings = () => <div>Configuración General</div>;
const FeatureSettings = () => <div>Funcionalidades</div>;
const DesignSettings = () => <div>Diseño</div>;
const AnalyticsSettings = () => <div>Analíticas</div>;
const RolesSettings = () => <div>Roles y Permisos</div>;

const SettingsRoutes: React.FC = () => {
  const { featuresConfig, toggleFeature, isLoading } = useFeatures();

  return (
    <Routes>
      <Route 
        path="/"
        element={
          <AdminPageLayout title="Configuración General">
            <GeneralSettings />
          </AdminPageLayout>
        }
      />
      <Route 
        path="/features"
        element={
          <AdminPageLayout title="Funcionalidades">
            <FeatureSettings />
          </AdminPageLayout>
        }
      />
      <Route 
        path="/design"
        element={
          <AdminPageLayout title="Diseño">
            <DesignSettings />
          </AdminPageLayout>
        }
      />
      <Route 
        path="/integrations"
        element={
          <AdminPageLayout title="Integraciones">
            <IntegrationsPage />
          </AdminPageLayout>
        }
      />
      <Route 
        path="/data"
        element={
          <AdminPageLayout title="Datos">
            <DataSettings 
              featuresConfig={featuresConfig} 
              onToggleFeature={toggleFeature} 
              isLoading={isLoading} 
            />
          </AdminPageLayout>
        }
      />
      <Route 
        path="/pages"
        element={
          <AdminPageLayout title="Gestión de Páginas" subtitle="Administra las páginas y la navegación del sistema">
            <PagesManagement />
          </AdminPageLayout>
        }
      />
      <Route 
        path="/analytics"
        element={
          <AdminPageLayout title="Analíticas">
            <AnalyticsSettings />
          </AdminPageLayout>
        }
      />
      <Route 
        path="/roles"
        element={
          <AdminPageLayout title="Roles y Permisos">
            <RolesSettings />
          </AdminPageLayout>
        }
      />
    </Routes>
  );
};

export default SettingsRoutes;
