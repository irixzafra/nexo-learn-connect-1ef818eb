
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import UserAnalyticsSection from './sections/UserAnalyticsSection';

const UserAnalytics: React.FC = () => {
  return (
    <AdminPageLayout
      title="Analíticas de Usuarios"
      subtitle="Estadísticas y métricas de los usuarios de la plataforma"
    >
      <UserAnalyticsSection />
    </AdminPageLayout>
  );
};

export default UserAnalytics;
