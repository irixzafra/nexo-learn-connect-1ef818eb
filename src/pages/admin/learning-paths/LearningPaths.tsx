
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { LearningPathsTab } from '@/features/admin/components/courses/LearningPathsTab';

const LearningPathsPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Rutas de Aprendizaje</h1>
        <p className="text-muted-foreground">Gestiona las rutas de aprendizaje para tus estudiantes</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Routes>
            <Route index element={<LearningPathsTab />} />
            <Route path="*" element={<Navigate to="/admin/learning-paths" replace />} />
          </Routes>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningPathsPage;
