
import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';

const ProfilePage: React.FC = () => {
  return (
    <AppLayout>
      <div className="container mx-auto py-6">
        <PageHeader
          title="Mi Perfil"
          description="Gestiona tu información personal"
        />
        
        <div className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="p-10 bg-muted/20 rounded-lg border border-dashed flex items-center justify-center min-h-[400px]">
                <p className="text-muted-foreground">Tu información de perfil se mostrará aquí</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
