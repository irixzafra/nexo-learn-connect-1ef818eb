import React, { lazy, Suspense } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import PrivateRoute from '@/components/auth/PrivateRoute';
import AdminRoute from '@/components/auth/AdminRoute';

// Layouts
const AppLayout = lazy(() => import('@/layouts/AppLayout'));
const AdminLayout = lazy(() => import('@/layouts/AdminLayout'));

// Auth & Core Pages
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage'));
const Dashboard = lazy(() => import('@/pages/app/Dashboard'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Admin Pages
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('@/pages/admin/users/AdminUsers'));
const AdminCourses = lazy(() => import('@/pages/admin/courses/AdminCourses'));
const DesignSystemPage = lazy(() => import('@/pages/design-system/DesignSystemPage'));

const appRoutes = [
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: 'forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: 'reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: 'app',
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <PrivateRoute>
          <AppLayout />
        </PrivateRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'admin',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: 'dashboard',
            element: <AdminDashboard />,
          },
          {
            path: 'users',
            element: <AdminUsers />,
          },
          {
            path: 'courses',
            element: <AdminCourses />,
          },
          {
            path: 'design-system',
            element: <DesignSystemPage />,
          },
          // ... other admin routes
        ],
      },
      // ... other app routes
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default appRoutes;
