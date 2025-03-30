
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { LearningPathsTab } from '@/features/admin/components/courses/LearningPathsTab';

const LearningPathsPage = () => {
  return (
    <AdminPageLayout
      title="Rutas de Aprendizaje"
      subtitle="Gestiona las rutas de aprendizaje para tus estudiantes"
    >
      <Card>
        <CardContent className="pt-6">
          <Routes>
            <Route index element={<LearningPathsTab />} />
            <Route path="*" element={<Navigate to="/admin/learning-paths" replace />} />
          </Routes>
        </CardContent>
      </Card>
    </AdminPageLayout>
  );
};

export default LearningPathsPage;
