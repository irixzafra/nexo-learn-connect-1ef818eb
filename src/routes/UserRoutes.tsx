
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from "@/components/ProtectedRoute";
import NotFound from "@/pages/NotFound";
import AppLayout from "@/layouts/AppLayout";

// Student pages
import StudentDashboard from "@/pages/student/Dashboard";
import StudentCourses from "@/pages/student/Courses";
import Invoices from "@/pages/student/Invoices";
import Calendar from "@/pages/placeholder/Calendar";
import Messages from "@/pages/placeholder/Messages";
import Settings from "@/pages/placeholder/Settings";

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <AppLayout>
          <StudentDashboard />
        </AppLayout>
      } />
      <Route path="/dashboard" element={
        <AppLayout>
          <StudentDashboard />
        </AppLayout>
      } />
      <Route path="/my-courses" element={
        <AppLayout>
          <StudentCourses />
        </AppLayout>
      } />
      <Route path="/invoices" element={
        <AppLayout>
          <Invoices />
        </AppLayout>
      } />
      <Route path="/calendar" element={
        <AppLayout>
          <Calendar />
        </AppLayout>
      } />
      <Route path="/messages" element={
        <AppLayout>
          <Messages />
        </AppLayout>
      } />
      <Route path="/settings" element={
        <AppLayout>
          <Settings />
        </AppLayout>
      } />
      <Route path="*" element={
        <AppLayout>
          <NotFound />
        </AppLayout>
      } />
    </Routes>
  );
};

export default UserRoutes;
