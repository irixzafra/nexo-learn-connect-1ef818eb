
import React from 'react';
import { useParams } from 'react-router-dom';
import ProtectedRoute from "@/components/ProtectedRoute";
import PaymentSuccess from "@/pages/payment/PaymentSuccess";
import PaymentCancel from "@/pages/payment/PaymentCancel";

const PaymentRoutes: React.FC = () => {
  const { status } = useParams<{ status: string }>();
  
  if (status === 'success') {
    return (
      <ProtectedRoute>
        <PaymentSuccess />
      </ProtectedRoute>
    );
  } else if (status === 'cancel') {
    return (
      <ProtectedRoute>
        <PaymentCancel />
      </ProtectedRoute>
    );
  }
  
  return null;
};

export default PaymentRoutes;
