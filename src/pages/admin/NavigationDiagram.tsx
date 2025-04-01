
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Network } from 'lucide-react';

const NavigationDiagram: React.FC = () => {
  return (
    <AdminPageLayout
      title="Navigation Diagram"
      subtitle="Visual representation of application navigation structure"
    >
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Navigation Structure</CardTitle>
            <CardDescription>Visual map of your application's navigation paths</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Network className="h-16 w-16 text-primary mb-4" />
              <p className="text-muted-foreground mb-4">
                The navigation diagram visualizes the structure and connections between different routes in your application.
              </p>
              <div className="p-6 border rounded-lg bg-muted/50 w-full">
                <p className="text-muted-foreground">
                  Navigation diagram will be implemented here. It will show a visual map of all routes and their relationships.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
};

export default NavigationDiagram;
