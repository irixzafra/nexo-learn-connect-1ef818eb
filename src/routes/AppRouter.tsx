import React from 'react';
import { Navigate } from 'react-router-dom';

// This file is now deprecated and should not be used
// We're keeping it to avoid import errors but it just redirects to the dashboard
const AppRouter: React.FC = () => {
  console.warn("AppRouter is deprecated. Please use AppRoutes instead.");
  return <Navigate to="/dashboard" replace />;
};

export default AppRouter;
