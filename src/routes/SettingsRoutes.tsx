
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SystemSettings from '@/pages/admin/settings';
import Features from '@/pages/admin/settings/features';
import DeveloperSettingsPage from '@/pages/admin/settings/developer';
import IntegrationsPage from '@/pages/admin/settings/integrations';
import DataManagementPage from '@/pages/admin/settings/data';
import DesignPage from '@/pages/admin/settings/design';
import PagesManagement from '@/pages/admin/settings/pages';
import AnalyticsSettings from '@/pages/admin/settings/analytics';
import RolesAndPermissions from '@/pages/admin/settings/roles';
import NotFound from '@/pages/NotFound';

const SettingsRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SystemSettings />} />
      <Route path="/features" element={<Features />} />
      <Route path="/developer" element={<DeveloperSettingsPage />} />
      <Route path="/integrations" element={<IntegrationsPage />} />
      <Route path="/data" element={<DataManagementPage />} />
      <Route path="/design" element={<DesignPage />} />
      <Route path="/pages" element={<PagesManagement />} />
      <Route path="/analytics" element={<AnalyticsSettings />} />
      <Route path="/roles" element={<RolesAndPermissions />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default SettingsRoutes;
