
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { TestDataGenerator } from '@/components/admin/test-data';

const TestDataManagement: React.FC = () => {
  return (
    <AdminPageLayout
      title="Gestión de Datos de Prueba"
      subtitle="Herramientas para generar datos de prueba para el desarrollo y testing"
    >
      <TestDataGenerator />
    </AdminPageLayout>
  );
};

export default TestDataManagement;
