
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Landing and public pages
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";
import CoursesCatalog from "@/pages/CoursesCatalog";
import CourseDetail from "@/pages/CourseDetail";
import AboutUs from "@/pages/AboutUs";
import Scholarships from "@/pages/Scholarships";

const PublicRoutes = () => {
  return (
    <Routes>
      {/* Main landing page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Authentication */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* Course discovery */}
      <Route path="/courses" element={<CoursesCatalog />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      
      {/* Informational pages */}
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/scholarships" element={<Scholarships />} />
      
      {/* Redirect from index to root */}
      <Route path="/index" element={<Navigate to="/" replace />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
