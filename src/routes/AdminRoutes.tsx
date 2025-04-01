
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationDiagram from '@/pages/admin/NavigationDiagram';
import NavigationExplorer from '@/pages/admin/navigation/NavigationExplorer';

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
      {/* Rutas específicas que queremos mantener */}
      <Route path="navigation-diagram" element={<NavigationDiagram />} />
      <Route path="navigation" element={<NavigationExplorer />} />
      
      {/* Ruta por defecto para todas las demás rutas de administración */}
      <Route path="*" element={<AdminNotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
