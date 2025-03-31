
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import AIServicesPage from '@/pages/admin/ai/AIServicesPage';
import PageManagement from '@/pages/admin/pages/PageManagement';
import CreatePage from '@/pages/admin/pages/CreatePage';
import EditPage from '@/pages/admin/pages/EditPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminNavigation from '@/components/admin/AdminNavigation';
import AppLayout from '@/layouts/AppLayout';
import DesignSystem from '@/pages/admin/design/DesignSystem';
import SystemSettings from '@/pages/admin/SystemSettings';
import AdminDashboard from '@/pages/admin/dashboard';
import ContentManagement from '@/pages/admin/content/ContentManagement';
import TemplatesPage from '@/pages/admin/content/TemplatesPage';
import AuditLog from '@/pages/admin/audit/AuditLog';
import AccessControl from '@/pages/admin/access/AccessControl';

// User management components
import { UserManagementTabs } from '@/features/users/UserManagementTabs';
import { RoleManagement } from '@/features/users/RoleManagement';
import { UserAnalytics } from '@/features/users/UserAnalytics';
import { PermissionsManagement } from '@/features/users/PermissionsManagement';
import { UserAdminStats } from '@/features/users/UserAdminStats';
import AllCoursesTab from '@/components/admin/courses/tabs/AllCoursesTab';

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

// Course Management Page
const CourseManagement = () => (
  <AdminPageLayout 
    title="Gestión de Cursos"
    subtitle="Administra el catálogo de cursos de la plataforma"
  >
    <AllCoursesTab />
  </AdminPageLayout>
);

// Analytics Page
const AnalyticsPage = () => (
  <AdminPageLayout 
    title="Analíticas"
    subtitle="Métricas y estadísticas de la plataforma"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UserAdminStats />
    </div>
  </AdminPageLayout>
);

// Instructor Management
const InstructorManagement = () => (
  <AdminPageLayout 
    title="Gestión de Instructores"
    subtitle="Administra los instructores de la plataforma"
  >
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Administración de Instructores</h2>
      <p className="text-muted-foreground">
        Gestiona los perfiles, cursos y rendimiento de los instructores.
      </p>
    </div>
  </AdminPageLayout>
);

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
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        
        {/* User Management */}
        <Route path="/users" element={<UserManagement />} />
        <Route path="/roles" element={<RoleManagement />} />
        
        {/* Course Management */}
        <Route path="/courses" element={<CourseManagement />} />
        <Route path="/instructors" element={<InstructorManagement />} />
        
        {/* Analytics */}
        <Route path="/analytics" element={<AnalyticsPage />} />
        
        {/* Design System */}
        <Route path="/design" element={<DesignSystem />} />
        <Route path="/design/:tab" element={<DesignSystem />} />
        
        {/* Content Management */}
        <Route path="/content" element={<ContentManagement />} />
        <Route path="/content/templates" element={<TemplatesPage />} />
        <Route path="/pages" element={<PageManagement />} />
        <Route path="/pages/create" element={<CreatePage />} />
        <Route path="/pages/:id" element={<EditPage />} />
        
        {/* System Settings */}
        <Route path="/settings" element={<SystemSettings />} />
        <Route path="/settings/:tab" element={<SystemSettings />} />
        
        {/* Security & Audit */}
        <Route path="/audit" element={<AuditLog />} />
        <Route path="/access" element={<AccessControl />} />
        
        {/* AI Services */}
        <Route path="/ai/services" element={<AIServicesPage />} />
        
        {/* Default redirect */}
        <Route path="*" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
