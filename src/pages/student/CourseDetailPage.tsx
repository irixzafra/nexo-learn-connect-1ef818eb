
import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  return (
    <AppLayout>
      <div className="container mx-auto py-6">
        <PageHeader
          title={`Curso #${courseId || ''}`}
          description="Detalles del curso seleccionado"
        />
        
        <div className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="p-10 bg-muted/20 rounded-lg border border-dashed flex items-center justify-center min-h-[400px]">
                <p className="text-muted-foreground">Los detalles del curso se mostrarán aquí</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default CourseDetailPage;
