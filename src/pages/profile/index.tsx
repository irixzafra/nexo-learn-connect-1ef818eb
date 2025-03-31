
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/layouts/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileEditForm from '@/components/profile/ProfileEditForm';
import { GamificationProfileSection } from '@/features/gamification/components/GamificationProfileSection';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  if (!user) {
    return (
      <AppLayout>
        <div className="container mx-auto p-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h3 className="text-lg font-medium mb-2">Acceso Restringido</h3>
              <p className="text-muted-foreground text-center">
                Debes iniciar sesión para ver tu perfil.
              </p>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>
        
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">Información General</TabsTrigger>
            <TabsTrigger value="achievements">Logros y Puntos</TabsTrigger>
            <TabsTrigger value="preferences">Preferencias</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <ProfileEditForm />
          </TabsContent>
          
          <TabsContent value="achievements">
            <GamificationProfileSection userId={user.id} />
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-medium mb-4">Preferencias</h2>
                <p className="text-muted-foreground">
                  Configuración de preferencias aún no disponible.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Profile;
