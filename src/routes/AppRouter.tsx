
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import UserRoutes from './UserRoutes';
import InstructorRoutes from './InstructorRoutes';
import AdminRoutes from './AdminRoutes';
import NotFound from '@/pages/NotFound';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/home/*" element={<UserRoutes />} />
      <Route path="/instructor/*" element={<InstructorRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
