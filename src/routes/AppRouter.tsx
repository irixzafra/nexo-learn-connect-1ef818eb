
import React from 'react';
import { Routes } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import UserRoutes from './UserRoutes';
import InstructorRoutes from './InstructorRoutes';
import AdminRoutes from './AdminRoutes';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <PublicRoutes />
      <UserRoutes />
      <InstructorRoutes />
      <AdminRoutes />
    </Routes>
  );
};

export default AppRouter;
