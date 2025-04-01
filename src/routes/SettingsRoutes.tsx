
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import PagesManagement from '@/pages/admin/settings/pages';

// Placeholder components until actual ones are created
const GeneralSettings = () => <div>Configuración General</div>;
const FeatureSettings = () => <div>Funcionalidades</div>;
const DesignSettings = () => <div>Diseño</div>;
const IntegrationsSettings = () => <div>Integraciones</div>;
const DataSettings = () => <div>Datos</div>;
const AnalyticsSettings = () => <div>Analíticas</div>;
const RolesSettings = () => <div>Roles y Permisos</div>;

const SettingsRoutes: React.FC = () => {
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
            <IntegrationsSettings />
          </AdminPageLayout>
        }
      />
      <Route 
        path="/data"
        element={
          <AdminPageLayout title="Datos">
            <DataSettings />
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
