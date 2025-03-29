
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import UserRoutes from './UserRoutes';
import InstructorRoutes from './InstructorRoutes';
import AdminRoutes from './AdminRoutes';
import NotFound from '@/pages/NotFound';
import Profile from '@/pages/Profile';
import ProtectedRoute from '@/components/ProtectedRoute';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/home/*" element={<UserRoutes />} />
      <Route path="/instructor/*" element={<InstructorRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      
      {/* Direct profile access route */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
