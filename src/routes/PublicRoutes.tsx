
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

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
      <Route path="/landing" element={<PublicLayout><LandingPage /></PublicLayout>} />
      <Route path="/auth/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/auth/register" element={<PublicLayout><Register /></PublicLayout>} />
      <Route path="/about-us" element={<PublicLayout><AboutUs /></PublicLayout>} />
      <Route path="/scholarships" element={<PublicLayout><Scholarships /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
      <Route path="/unauthorized" element={<PublicLayout><Unauthorized /></PublicLayout>} />
      
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
          <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">Detalles de la Ruta de Aprendizaje</h1>
            <p>Esta página está en desarrollo</p>
          </div>
        </AppLayout>
      } />
    </Routes>
  );
};

export default PublicRoutes;
