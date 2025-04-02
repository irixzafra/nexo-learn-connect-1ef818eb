
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import AboutUs from '@/pages/AboutUs';
import NotFound from '@/pages/NotFound';
import Scholarships from '@/pages/Scholarships';
import Unauthorized from '@/pages/Unauthorized';
import Index from '@/pages/Index';
import Courses from '@/pages/Courses';
import AppLayout from '@/layouts/AppLayout';
import CoursesCatalog from '@/pages/CoursesCatalog';
import PublicLayout from '@/layouts/PublicLayout';
import CourseDetailPage from '@/pages/CourseDetailPage';
import TermsPage from '@/pages/legal/TermsPage';
import PrivacyPage from '@/pages/legal/PrivacyPage';
import CookiesPage from '@/pages/legal/CookiesPage';
import AccessibilityPage from '@/pages/legal/AccessibilityPage';
import ContactPage from '@/pages/ContactPage';
import DynamicPage from '@/pages/DynamicPage';
import Careers from '@/pages/Careers';
import LeaderBoard from '@/pages/LeaderBoard';
import CertificateVerifyPage from '@/pages/public/CertificateVerifyPage';
import CertificateVerificationPortal from '@/pages/public/CertificateVerificationPortal';
import PlaceholderPage from '@/pages/placeholder/PlaceholderPage';
import NotFoundLayout from '@/layouts/NotFoundLayout';

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Main routes */}
      <Route path="/" element={<Index />} />
      <Route path="/landing" element={<PublicLayout><LandingPage /></PublicLayout>} />
      
      {/* Auth routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<PublicLayout><Register /></PublicLayout>} />
      
      {/* Content pages */}
      <Route path="/about-us" element={<PublicLayout><AboutUs /></PublicLayout>} />
      <Route path="/scholarships" element={<PublicLayout><Scholarships /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
      <Route path="/unauthorized" element={<PublicLayout><Unauthorized /></PublicLayout>} />
      <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />
      <Route path="/leaderboard" element={<PublicLayout><LeaderBoard /></PublicLayout>} />
      
      {/* Course related */}
      <Route path="/courses" element={<PublicLayout><CoursesCatalog /></PublicLayout>} />
      <Route path="/courses/:courseId" element={<PublicLayout><CourseDetailPage /></PublicLayout>} />
      
      {/* Certificate routes */}
      <Route path="/certificates/verify/:certificateId" element={<PublicLayout><CertificateVerifyPage /></PublicLayout>} />
      <Route path="/certificates/verification-portal" element={<PublicLayout><CertificateVerificationPortal /></PublicLayout>} />
      
      {/* Legal pages */}
      <Route path="/terms" element={<PublicLayout><TermsPage /></PublicLayout>} />
      <Route path="/privacy" element={<PublicLayout><PrivacyPage /></PublicLayout>} />
      <Route path="/cookies" element={<PublicLayout><CookiesPage /></PublicLayout>} />
      <Route path="/accessibility" element={<PublicLayout><AccessibilityPage /></PublicLayout>} />
      
      {/* Dynamic pages */}
      <Route path="/pages/:slug" element={<DynamicPage />} />
      
      {/* Learning paths */}
      <Route path="/learning-paths" element={
        <AppLayout>
          <CoursesCatalog />
        </AppLayout>
      } />
      <Route path="/learning-paths/:pathId" element={
        <AppLayout>
          <PlaceholderPage 
            title="Detalles de la Ruta de Aprendizaje" 
            subtitle="Esta página está en desarrollo"
          />
        </AppLayout>
      } />
      
      {/* Catch-all route para rutas públicas no encontradas */}
      <Route path="*" element={
        <NotFoundLayout>
          <NotFound />
        </NotFoundLayout>
      } />
    </Routes>
  );
};

export default PublicRoutes;
