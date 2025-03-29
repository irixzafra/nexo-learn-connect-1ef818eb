
import React from 'react';
import { Route } from 'react-router-dom';

// Landing and public pages
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";
import CoursesCatalog from "@/pages/CoursesCatalog";
import CourseDetail from "@/pages/CourseDetail";
import AboutUs from "@/pages/AboutUs";
import Courses from "@/pages/Courses";
import Scholarships from "@/pages/Scholarships";

const PublicRoutes: React.FC = () => {
  return (
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/courses" element={<CoursesCatalog />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/scholarships" element={<Scholarships />} />
      <Route path="*" element={<NotFound />} />
    </>
  );
};

export default PublicRoutes;
