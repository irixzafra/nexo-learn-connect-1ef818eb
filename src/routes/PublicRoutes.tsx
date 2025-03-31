
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import AboutUs from '@/pages/AboutUs';
import NotFound from '@/pages/NotFound';
import Scholarships from '@/pages/Scholarships';
import Unauthorized from '@/pages/Unauthorized';
import Index from '@/pages/Index';
import PaymentSuccess from '@/pages/payment/PaymentSuccess';
import PaymentCancel from '@/pages/payment/PaymentCancel';
import Courses from '@/pages/Courses';
import CourseDetail from '@/pages/CourseDetail';
import CourseLanding from '@/pages/CourseLanding';
import AppLayout from '@/layouts/AppLayout';
import CoursesCatalog from '@/pages/CoursesCatalog';
import LessonView from '@/pages/student/LessonView';
import PublicLayout from '@/layouts/PublicLayout';
import CourseDetailPage from '@/pages/CourseDetailPage';
import Community from '@/pages/Community';

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
      <Route path="/landing" element={<PublicLayout><LandingPage /></PublicLayout>} />
      <Route path="/auth/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/auth/register" element={<PublicLayout><Register /></PublicLayout>} />
      <Route path="/about-us" element={<PublicLayout><AboutUs /></PublicLayout>} />
      <Route path="/scholarships" element={<PublicLayout><Scholarships /></PublicLayout>} />
      <Route path="/unauthorized" element={<PublicLayout><Unauthorized /></PublicLayout>} />
      <Route path="/payment/success" element={<PublicLayout><PaymentSuccess /></PublicLayout>} />
      <Route path="/payment/cancel" element={<PublicLayout><PaymentCancel /></PublicLayout>} />
      
      {/* Community Route */}
      <Route path="/community" element={<Community />} />
      
      {/* Acceso a cursos */}
      <Route path="/courses" element={
        <AppLayout>
          <CoursesCatalog />
        </AppLayout>
      } />
      
      {/* Acceso a curso por ID - usando el componente CourseDetailPage */}
      <Route path="/courses/:courseId" element={<CourseDetailPage />} />
      
      {/* Ruta para acceso a curso por slug */}
      <Route path="/cursos/:slug" element={<CourseDetailPage />} />
      
      <Route path="/courses/:courseId/learn/:lessonId" element={
        <AppLayout>
          <LessonView />
        </AppLayout>
      } />
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
