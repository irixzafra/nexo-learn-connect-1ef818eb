
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Outlet } from 'react-router-dom';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import AIServicesPage from '@/pages/admin/ai/AIServicesPage';
import PageManagement from '@/pages/admin/pages/PageManagement';
import CreatePage from '@/pages/admin/pages/CreatePage';
import EditPage from '@/pages/admin/pages/EditPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminNavigation from '@/components/admin/AdminNavigation';
import AppLayout from '@/layouts/AppLayout';

// User management components
import { UserManagementTabs } from '@/features/users/UserManagementTabs';
import { RoleManagement } from '@/features/users/RoleManagement';
import { UserAnalytics } from '@/features/users/UserAnalytics';
import { PermissionsManagement } from '@/features/users/PermissionsManagement';
import { UserAdminStats } from '@/features/users/UserAdminStats';

// Temporary Dashboard component
const Dashboard = () => (
  <AdminPageLayout 
    title="Panel de Administración"
    subtitle="Gestiona todos los aspectos de la plataforma desde este panel."
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <UserAdminStats 
        totalUsers={1243}
        activeUsers={876}
        newUsers={34}
        inactiveUsers={87}
      />
    </div>
  </AdminPageLayout>
);

// Temporary Course Management
const CourseManagement = () => (
  <AdminPageLayout title="Gestión de Cursos">
    <Card className="p-6">
      <h2 className="text-lg font-medium mb-4">Administración de Cursos</h2>
      <p className="text-muted-foreground">
        Esta sección permite gestionar los cursos de la plataforma. Actualmente en desarrollo.
      </p>
    </Card>
  </AdminPageLayout>
);

// Temporary Enrollment Management
const EnrollmentManagement = () => (
  <AdminPageLayout title="Gestión de Inscripciones">
    <Card className="p-6">
      <h2 className="text-lg font-medium mb-4">Administración de Inscripciones</h2>
      <p className="text-muted-foreground">
        Esta sección permite gestionar las inscripciones a cursos. Actualmente en desarrollo.
      </p>
    </Card>
  </AdminPageLayout>
);

// User Management Page
const UserManagement = () => {
  return (
    <AdminPageLayout 
      title="Gestión de Usuarios"
      subtitle="Administra los usuarios, roles y permisos de la plataforma"
    >
      <UserManagementTabs isAdmin={true} />
    </AdminPageLayout>
  );
};

// Layout component that provides the admin layout structure
const AdminLayout = () => {
  return (
    <AppLayout showHeader={false}>
      <AdminNavigation enabled={true} />
      <main className="flex-1">
        <Outlet />
      </main>
    </AppLayout>
  );
};

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={
        <ProtectedRoute requiredRole="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* User Management */}
        <Route path="/users" element={<UserManagement />} />
        <Route path="/roles" element={<RoleManagement />} />
        
        {/* Course Management */}
        <Route path="/courses" element={<CourseManagement />} />
        <Route path="/enrollments" element={<EnrollmentManagement />} />
        
        {/* Content Management */}
        <Route path="/settings/pages" element={<PageManagement />} />
        <Route path="/settings/pages/create" element={<CreatePage />} />
        <Route path="/settings/pages/:id" element={<EditPage />} />
        
        {/* AI Services */}
        <Route path="/ai/services" element={<AIServicesPage />} />
        
        {/* Default redirect */}
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
