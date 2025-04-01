
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import UserAnalyticsSection from './sections/UserAnalyticsSection';

const UserAnalytics: React.FC = () => {
  return (
    <AdminPageLayout
      title="Analíticas de Usuarios"
      subtitle="Estadísticas detalladas sobre usuarios y actividad"
    >
      <UserAnalyticsSection />
    </AdminPageLayout>
  );
};

export default UserAnalytics;
