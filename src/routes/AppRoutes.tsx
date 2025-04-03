
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import HomePage from '@/pages/HomePage';
import NotFound from '@/pages/NotFound';
import MaterialDesign from '@/pages/MaterialDesign';
import ButtonPage from '@/pages/design-system/components/ButtonPage';
import DesignSystemPage from '@/pages/design-system/DesignSystemPage';
import { useAuth } from '@/contexts/AuthContext';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Public route component (redirects to home if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutesContent: React.FC = () => {
  return (
    <Routes>
      {/* Public auth routes */}
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      
      {/* Routes with the main layout */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        
        {/* Route for Material Design System */}
        <Route path="/material-design" element={<MaterialDesign />} />
        
        {/* Routes for Design System */}
        <Route path="/design-system" element={<DesignSystemPage />} />
        <Route path="/design-system/components/button" element={<ButtonPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin">
          <Route path="design-system" element={<DesignSystemPage />} />
          <Route path="design-system/components/button" element={<ButtonPage />} />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

// Wrapper component that includes the BrowserRouter
const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutesContent />
    </BrowserRouter>
  );
};

export default AppRoutes;
