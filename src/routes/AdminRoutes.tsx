
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationDiagram from '@/pages/admin/NavigationDiagram';
import NavigationExplorer from '@/pages/admin/navigation/NavigationExplorer';
import AdminLessonEdit from '@/pages/admin/courses/AdminLessonEdit';
import RouteValidator from '@/pages/admin/RouteValidator';
import ResourceRepository from '@/pages/admin/resources/ResourceRepository';
import CertificateManagement from '@/pages/admin/certificates/CertificateManagement';
import CertificateVerifyPage from '@/pages/admin/certificates/CertificateVerifyPage';
import CertificateVerificationPortal from '@/pages/public/CertificateVerificationPortal';

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
      <Route path="route-validator" element={<RouteValidator />} />
      <Route path="courses/:courseId/lessons/:lessonId/edit" element={<AdminLessonEdit />} />
      <Route path="resources" element={<ResourceRepository />} />
      <Route path="certificates" element={<CertificateManagement />} />
      <Route path="certificates/verify/:certificateId" element={<CertificateVerifyPage />} />
      <Route path="certificates/verification-portal" element={<CertificateVerificationPortal />} />
      
      {/* Ruta de inicio para admin */}
      <Route index element={<NavigationDiagram />} />
      
      {/* Ruta por defecto para todas las demás rutas de administración */}
      <Route path="*" element={<AdminNotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
