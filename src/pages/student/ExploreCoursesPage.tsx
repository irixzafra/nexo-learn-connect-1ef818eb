
import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';

const ExploreCoursesPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="container mx-auto py-6">
        <PageHeader
          title="Explorar Cursos"
          description="Descubre nuestra oferta de cursos"
        />
        
        <div className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="p-10 bg-muted/20 rounded-lg border border-dashed flex items-center justify-center min-h-[400px]">
                <p className="text-muted-foreground">El catálogo de cursos se mostrará aquí</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default ExploreCoursesPage;
