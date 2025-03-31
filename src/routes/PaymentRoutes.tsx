
import React from 'react';
import ProtectedRoute from "@/components/ProtectedRoute";
import PaymentSuccess from "@/pages/payment/PaymentSuccess";
import PaymentCancel from "@/pages/payment/PaymentCancel";

// Change this to a component that returns its children instead of Routes
const PaymentRoutes: React.FC<{path: string}> = ({ path }) => {
  // Based on the path, return the appropriate component
  if (path === 'success') {
    return (
      <ProtectedRoute>
        <PaymentSuccess />
      </ProtectedRoute>
    );
  } else if (path === 'cancel') {
    return (
      <ProtectedRoute>
        <PaymentCancel />
      </ProtectedRoute>
    );
  }
  
  return null;
};

export default PaymentRoutes;
