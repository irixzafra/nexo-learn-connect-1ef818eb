
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import AdminRoutes from './AdminRoutes';
import PrivateRoutes from './PrivateRoutes';
import AuthRoutes from './AuthRoutes';
import ProfileRoutes from './ProfileRoutes';
import CourseRoutes from './CourseRoutes';
import ProfesorRoutes from './InstructorRoutes';
import ModeratorRoutes from './ModeratorRoutes';
import SettingsRoutes from './SettingsRoutes';
import AccessibilityRoutes from './AccessibilityRoutes';
import AuthLayout from '@/layouts/AuthLayout';
import { LanguageWrapper } from '@/components/LanguageWrapper';
import SafeRouteWrapper from '@/components/SafeRouteWrapper';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Language paths: /:language/* */}
      <Route path="/:language" element={<LanguageWrapper />}>
        <Route path="auth/*" element={<AuthLayout><AuthRoutes /></AuthLayout>} />
        <Route path="admin/*" element={<SafeRouteWrapper requiredRole={['admin']}><AdminRoutes /></SafeRouteWrapper>} />
        <Route path="profile/*" element={<SafeRouteWrapper><ProfileRoutes /></SafeRouteWrapper>} />
        <Route path="course/*" element={<SafeRouteWrapper><CourseRoutes /></SafeRouteWrapper>} />
        <Route path="profesor/*" element={<SafeRouteWrapper requiredRole={['profesor', 'admin']}><ProfesorRoutes /></SafeRouteWrapper>} />
        <Route path="settings/*" element={<SafeRouteWrapper><SettingsRoutes /></SafeRouteWrapper>} />
        <Route path="accessibility/*" element={<SafeRouteWrapper><AccessibilityRoutes /></SafeRouteWrapper>} />
        <Route path="*" element={<PublicRoutes />} />
      </Route>

      {/* Default routes without language prefix */}
      <Route path="auth/*" element={<AuthLayout><AuthRoutes /></AuthLayout>} />
      <Route path="admin/*" element={<SafeRouteWrapper requiredRole={['admin']}><AdminRoutes /></SafeRouteWrapper>} />
      <Route path="profile/*" element={<SafeRouteWrapper><ProfileRoutes /></SafeRouteWrapper>} />
      <Route path="course/*" element={<SafeRouteWrapper><CourseRoutes /></SafeRouteWrapper>} />
      <Route path="profesor/*" element={<SafeRouteWrapper requiredRole={['profesor', 'admin']}><ProfesorRoutes /></SafeRouteWrapper>} />
      <Route path="settings/*" element={<SafeRouteWrapper><SettingsRoutes /></SafeRouteWrapper>} />
      <Route path="accessibility/*" element={<SafeRouteWrapper><AccessibilityRoutes /></SafeRouteWrapper>} />
      <Route path="*" element={<PublicRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
