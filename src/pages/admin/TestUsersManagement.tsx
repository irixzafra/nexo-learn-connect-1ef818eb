
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import TestUsersGenerator from '@/features/admin/components/test-users/TestUsersGenerator';
import { Users } from 'lucide-react';

const TestUsersManagement: React.FC = () => {
  return (
    <AdminPageLayout
      title="Gestión de Usuarios de Prueba"
      subtitle="Herramientas para crear y administrar usuarios de prueba para desarrollo y testing"
      icon={<Users className="h-6 w-6" />}
    >
      <TestUsersGenerator />
    </AdminPageLayout>
  );
};

export default TestUsersManagement;
