
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from "@/layouts/AppLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import PaymentSuccess from "@/pages/payment/PaymentSuccess";
import PaymentCancel from "@/pages/payment/PaymentCancel";

const PaymentRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/success" element={
        <ProtectedRoute>
          <PaymentSuccess />
        </ProtectedRoute>
      } />
      <Route path="/cancel" element={
        <ProtectedRoute>
          <PaymentCancel />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default PaymentRoutes;
