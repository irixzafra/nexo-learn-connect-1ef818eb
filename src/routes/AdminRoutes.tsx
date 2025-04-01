import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import AIServicesPage from '@/pages/admin/ai/AIServicesPage';
import PageManagement from '@/pages/admin/pages/PageManagement';
import CreatePage from '@/pages/admin/pages/CreatePage';
import EditPage from '@/pages/admin/pages/EditPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import AppLayout from '@/layouts/AppLayout';
import DesignSystem from '@/pages/admin/design/DesignSystem';
import SystemSettings from '@/pages/admin/SystemSettings';
import AdminDashboard from '@/pages/admin/dashboard';
import ContentManagement from '@/pages/admin/content/ContentManagement';
import TemplatesPage from '@/pages/admin/content/TemplatesPage';
import AuditLog from '@/pages/admin/audit/AuditLog';
import AccessControl from '@/pages/admin/access/AccessControl';
import AdminCourses from '@/pages/admin/courses/AdminCourses';
import AdminFinances from '@/pages/admin/finances/AdminFinances';
import AnalyticsOverview from '@/pages/admin/analytics/index';
import UserAnalytics from '@/pages/admin/analytics/UserAnalytics';
import NavigationExplorer from '@/pages/admin/navigation/NavigationExplorer';

// User management components
import { UserManagementTabs } from '@/features/users/UserManagementTabs';
import { RoleManagement } from '@/features/users/RoleManagement';
import { UserAnalytics as UserAnalyticsComponent } from '@/features/users/UserAnalytics';
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

// Layout component that provides the admin layout structure
const AdminLayout = () => {
  return (
    <AppLayout showHeader={false} showAdminNavigation={true}>
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
        
        {/* User Management - Simplificado a dos niveles */}
        <Route path="/users" element={<UserManagement />} />
        <Route path="/roles" element={<RoleManagement />} />
        
        {/* Course Management - Simplificado a dos niveles */}
        <Route path="/courses" element={<AdminCourses />} />
        <Route path="/categories" element={<AdminCourses />} />
        <Route path="/learning" element={<AdminCourses />} />
        <Route path="/certificates" element={<AdminCourses />} />
        
        {/* Students and Instructors */}
        <Route path="/students" element={<UserManagement />} />
        <Route path="/instructors" element={<UserManagement />} />
        <Route path="/activity" element={<AnalyticsOverview />} />
        
        {/* Finances - Simplificado a dos niveles */}
        <Route path="/finance" element={<AdminFinances />} />
        <Route path="/invoices" element={<AdminFinances />} />
        <Route path="/subscriptions" element={<AdminFinances />} />
        <Route path="/banks" element={<AdminFinances />} />
        <Route path="/cashflow" element={<AdminFinances />} />
        <Route path="/alerts" element={<AdminFinances />} />
        
        {/* Navigation Explorer */}
        <Route path="/navigation" element={<NavigationExplorer />} />
        
        {/* Analytics */}
        <Route path="/analytics" element={<AnalyticsOverview />} />
        <Route path="/analytics/overview" element={<AnalyticsOverview />} />
        <Route path="/analytics/users" element={<UserAnalytics />} />
        <Route path="/analytics/courses" element={<AnalyticsOverview />} />
        <Route path="/analytics/revenue" element={<AnalyticsOverview />} />
        
        {/* Design System */}
        <Route path="/design" element={<DesignSystem />} />
        
        {/* Content Management - Simplificado a dos niveles */}
        <Route path="/content" element={<ContentManagement />} />
        <Route path="/pages" element={<PageManagement />} />
        <Route path="/pages/create" element={<CreatePage />} />
        <Route path="/pages/:id" element={<EditPage />} />
        
        {/* Settings - Simplificado a dos niveles */}
        <Route path="/settings" element={<SystemSettings />} />
        <Route path="/features" element={<SystemSettings />} />
        <Route path="/integrations" element={<SystemSettings />} />
        <Route path="/data" element={<SystemSettings />} />
        
        {/* Security & Audit */}
        <Route path="/audit" element={<AuditLog />} />
        <Route path="/access" element={<AccessControl />} />
        
        {/* AI Services */}
        <Route path="/ai" element={<AIServicesPage />} />
        
        {/* Default redirect */}
        <Route path="*" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
