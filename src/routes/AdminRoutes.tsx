
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
import AdminCourses from '@/pages/admin/courses/AdminCourses';
import AdminFinances from '@/pages/admin/finances/AdminFinances';

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

// Analytics Overview Page
const AnalyticsOverviewPage = () => (
  <AdminPageLayout 
    title="Analíticas - Visión General"
    subtitle="Panorama completo del rendimiento de la plataforma"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UserAdminStats 
        totalUsers={845}
        activeUsers={621}
        newUsers={42}
        inactiveUsers={124}
        loading={false}
      />
    </div>
  </AdminPageLayout>
);

// User Analytics Page
const UserAnalyticsPage = () => (
  <AdminPageLayout 
    title="Analíticas - Usuarios"
    subtitle="Estadísticas y tendencias de usuarios"
  >
    <UserAnalytics />
  </AdminPageLayout>
);

// Course Analytics Page
const CourseAnalyticsPage = () => (
  <AdminPageLayout 
    title="Analíticas - Cursos"
    subtitle="Estadísticas y tendencias de cursos"
  >
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Estadísticas de Cursos</h2>
      <p className="text-muted-foreground">
        Analiza el rendimiento, popularidad y engagement de los cursos.
      </p>
    </div>
  </AdminPageLayout>
);

// Revenue Analytics Page
const RevenueAnalyticsPage = () => (
  <AdminPageLayout 
    title="Analíticas - Ingresos"
    subtitle="Estadísticas financieras y proyecciones"
  >
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Ingresos y Finanzas</h2>
      <p className="text-muted-foreground">
        Analiza los ingresos, tendencias de ventas y proyecciones financieras.
      </p>
    </div>
  </AdminPageLayout>
);

// Layout component that provides the admin layout structure
const AdminLayout = () => {
  return (
    <AppLayout showHeader={false}>
      <AdminNavigation />
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
        <Route path="/courses" element={<AdminCourses />} />
        <Route path="/courses/analytics" element={<CourseAnalyticsPage />} />
        
        {/* Finances */}
        <Route path="/finances" element={<AdminFinances />} />
        <Route path="/billing" element={<AdminFinances />} />
        <Route path="/billing/:tab" element={<AdminFinances />} />
        
        {/* Analytics */}
        <Route path="/analytics" element={<AnalyticsOverviewPage />} />
        <Route path="/analytics/users" element={<UserAnalyticsPage />} />
        <Route path="/analytics/courses" element={<CourseAnalyticsPage />} />
        <Route path="/analytics/revenue" element={<RevenueAnalyticsPage />} />
        <Route path="/analytics/:tab" element={<AnalyticsOverviewPage />} />
        
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
