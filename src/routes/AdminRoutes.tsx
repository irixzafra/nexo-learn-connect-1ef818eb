
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Componente de página no encontrada
const AdminNotFound = () => (
  <div className="container py-8">
    <h1 className="text-2xl font-bold mb-4">Sección no disponible</h1>
    <p className="text-muted-foreground">La sección de administración ha sido eliminada del sistema.</p>
  </div>
);

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="*" element={<AdminNotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
