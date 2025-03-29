
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
import Courses from '@/pages/CoursesCatalog';
import CourseDetail from '@/pages/CourseDetail';

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
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
