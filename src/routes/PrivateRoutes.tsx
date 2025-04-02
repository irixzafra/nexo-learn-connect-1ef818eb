
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import UserRoutes from './UserRoutes';
import NotFound from '@/pages/NotFound';
import AppLayout from '@/layouts/AppLayout';

const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/*" element={
          <AppLayout>
            <UserRoutes />
          </AppLayout>
        } />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PrivateRoutes;
