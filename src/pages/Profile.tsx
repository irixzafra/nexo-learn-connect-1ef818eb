
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileEditForm } from '@/components/profile/ProfileEditForm';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Bell, Shield, ActivitySquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Profile = () => {
  const { profile } = useAuth();
  
  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (profile?.full_name) {
      const nameParts = profile.full_name.split(' ');
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      }
      return profile.full_name.substring(0, 2).toUpperCase();
    }
    return profile?.email?.substring(0, 1).toUpperCase() || 'U';
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Mi Perfil</h1>
          <p className="text-muted-foreground">
            Gestiona tu información personal y preferencias
          </p>
        </div>
        <Button>
          Editar Perfil
        </Button>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User size={16} />
            <span>Información Personal</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <ActivitySquare size={16} />
            <span>Actividad</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell size={16} />
            <span>Notificaciones</span>
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center gap-2">
            <Shield size={16} />
            <span>Administración</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold">Información Personal</h2>
                      <p className="text-muted-foreground">
                        Detalles de tu cuenta en Nexo Learning
                      </p>
                    </div>
                  
                    <div className="flex items-center gap-6 py-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profile?.avatar_url} />
                        <AvatarFallback className="text-3xl">{getUserInitials()}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className="text-xl font-semibold">{profile?.full_name || 'Usuario'}</h3>
                        <p className="text-muted-foreground">{profile?.email}</p>
                        <div className="mt-2">
                          <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded">
                            {profile?.user_role || 'Usuario'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Fecha de Registro</h4>
                        <p className="text-base">29/03/2023, 13:27</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Último Acceso</h4>
                        <p className="text-base">29/03/2023, 21:03</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">ID de Usuario</h4>
                        <p className="text-base font-mono text-sm">e2b60f9b-bc7f-41d1-a8db-eb...</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Estado de Cuenta</h4>
                        <p className="text-base text-green-600 font-medium">Activo</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold">Estadísticas</h3>
                      <p className="text-muted-foreground text-sm">Resumen de tu actividad</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Cursos Inscritos</h4>
                        <p className="text-3xl font-bold">0</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Cursos Completados</h4>
                        <p className="text-3xl font-bold">0</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Promedio de Progreso</h4>
                        <p className="text-3xl font-bold">0%</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-semibold mb-4">Cambiar rol de usuario</h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <span>Administrador</span>
                        </Button>
                        <Button className="text-sm">
                          Guardar cambios
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Registro de Actividad</h2>
              <p className="text-muted-foreground">No hay actividad reciente para mostrar.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Preferencias de Notificaciones</h2>
              <p className="text-muted-foreground">Configuración de notificaciones en desarrollo.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="admin">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Opciones de Administración</h2>
              <p className="text-muted-foreground">Esta sección está disponible solo para administradores.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Profile;
