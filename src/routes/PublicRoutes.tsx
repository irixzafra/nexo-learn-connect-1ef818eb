
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

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/scholarships" element={<Scholarships />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/cancel" element={<PaymentCancel />} />
      <Route path="/courses" element={
        <AppLayout>
          <CoursesCatalog />
        </AppLayout>
      } />
      <Route path="/courses/:courseId" element={
        <AppLayout>
          <CourseDetail />
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
