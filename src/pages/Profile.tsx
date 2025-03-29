
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/layouts/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const Profile: React.FC = () => {
  const { user, profile, userRole } = useAuth();

  // Format date for better readability
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    
    return user?.email?.substring(0, 2).toUpperCase() || 'U';
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tarjeta de información personal */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                Detalles de tu cuenta en Nexo Learning
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="text-lg">{getUserInitials()}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="text-xl font-medium">
                    {profile?.full_name || user?.email?.split('@')[0]}
                  </h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm">Rol</p>
                  <p className="font-medium capitalize">{userRole || 'No asignado'}</p>
                </div>
                
                <div>
                  <p className="text-muted-foreground text-sm">Fecha de Registro</p>
                  <p className="font-medium">
                    {user?.created_at ? formatDate(user.created_at) : 'No disponible'}
                  </p>
                </div>
                
                <div>
                  <p className="text-muted-foreground text-sm">ID de Usuario</p>
                  <p className="font-medium text-sm truncate">{user?.id || 'No disponible'}</p>
                </div>
                
                <div>
                  <p className="text-muted-foreground text-sm">Último Acceso</p>
                  <p className="font-medium">
                    {user?.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'No disponible'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tarjeta de estadísticas */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
              <CardDescription>
                Resumen de tu actividad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm">Cursos Inscritos</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              
              <div>
                <p className="text-muted-foreground text-sm">Cursos Completados</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              
              <div>
                <p className="text-muted-foreground text-sm">Promedio de Progreso</p>
                <div className="h-2 w-full bg-muted rounded-full mt-2">
                  <div className="h-2 w-0 bg-primary rounded-full"></div>
                </div>
                <p className="text-sm mt-1">0%</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
