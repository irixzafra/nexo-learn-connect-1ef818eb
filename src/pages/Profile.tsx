
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/layouts/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, X, UserCircle, BookOpen, Bell, Shield } from 'lucide-react';
import ProfileEditForm from '@/components/profile/ProfileEditForm';
import UserRoleEditor from '@/components/admin/UserRoleEditor';
import { captureError, trackUserAction } from '@/lib/sentry';

const Profile: React.FC = () => {
  const { user, profile, userRole } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEditSuccess = () => {
    setIsEditing(false);
    // Track successful profile update
    trackUserAction('profile_updated', { 
      userId: user?.id,
      role: userRole
    });
    // Refresh the page to get the updated profile data
    window.location.reload();
  };

  const handleStartEditing = () => {
    setIsEditing(true);
    trackUserAction('profile_edit_started', { 
      userId: user?.id,
      role: userRole
    });
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    trackUserAction('profile_edit_cancelled', { 
      userId: user?.id,
      role: userRole
    });
  };

  const isAdmin = userRole === 'admin';

  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Mi Perfil</h1>
            <p className="text-muted-foreground">Gestiona tu información personal y preferencias</p>
          </div>
          
          {!isEditing ? (
            <Button onClick={handleStartEditing} className="gap-2">
              <Edit className="h-4 w-4" />
              Editar Perfil
            </Button>
          ) : (
            <Button variant="outline" onClick={handleCancelEditing} className="gap-2">
              <X className="h-4 w-4" />
              Cancelar
            </Button>
          )}
        </div>
        
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="personal" className="gap-2">
              <UserCircle className="h-4 w-4" />
              Información Personal
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Actividad
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notificaciones
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="admin" className="gap-2">
                <Shield className="h-4 w-4" />
                Administración
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="personal">
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
                  {isEditing ? (
                    <ProfileEditForm 
                      profile={profile} 
                      user_id={user?.id}
                      onSuccess={handleEditSuccess} 
                    />
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={user?.user_metadata?.avatar_url} />
                          <AvatarFallback className="text-lg">{getUserInitials()}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <h3 className="text-2xl font-medium">
                            {profile?.full_name || user?.email?.split('@')[0]}
                          </h3>
                          <p className="text-muted-foreground">{user?.email}</p>
                          <div className="mt-2">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 capitalize">
                              {userRole || 'No asignado'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-muted-foreground text-sm">Fecha de Registro</p>
                          <p className="font-medium">
                            {user?.created_at ? formatDate(user.created_at) : 'No disponible'}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground text-sm">Último Acceso</p>
                          <p className="font-medium">
                            {user?.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'No disponible'}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground text-sm">ID de Usuario</p>
                          <p className="font-medium text-sm truncate">{user?.id || 'No disponible'}</p>
                        </div>
                        
                        <div>
                          <p className="text-muted-foreground text-sm">Estado de Cuenta</p>
                          <p className="font-medium">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent bg-green-500/10 text-green-500">
                              Activo
                            </span>
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
              
              {/* Tarjeta de estadísticas y funcionalidades admin */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Estadísticas</CardTitle>
                    <CardDescription>
                      Resumen de tu actividad
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-muted-foreground text-sm">Cursos Inscritos</p>
                      <p className="text-3xl font-bold">0</p>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground text-sm">Cursos Completados</p>
                      <p className="text-3xl font-bold">0</p>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground text-sm mb-2">Promedio de Progreso</p>
                      <div className="h-2 w-full bg-muted rounded-full">
                        <div className="h-2 w-0 bg-primary rounded-full"></div>
                      </div>
                      <p className="text-sm mt-1 text-right">0%</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Componente para cambiar rol (solo para administradores) */}
                {isAdmin && user && profile && (
                  <UserRoleEditor 
                    userId={user.id}
                    userName={profile.full_name || user.email || 'Usuario'}
                    currentRole={profile.role}
                    onRoleChanged={handleEditSuccess}
                  />
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>
                  Historial de tus actividades en la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="relative pl-6 border-l border-border pb-6">
                    <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-primary"></div>
                    <div className="mb-2">
                      <h3 className="text-sm font-medium">Iniciaste sesión en la plataforma</h3>
                      <p className="text-xs text-muted-foreground">Hace un momento</p>
                    </div>
                  </div>
                  
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No hay más actividad reciente para mostrar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Notificaciones</CardTitle>
                <CardDescription>
                  Configura cómo y cuándo quieres recibir notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-center text-muted-foreground py-12">
                    Las preferencias de notificaciones estarán disponibles próximamente
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {isAdmin && (
            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle>Herramientas de Administración</CardTitle>
                  <CardDescription>
                    Funciones disponibles para administradores del sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" asChild className="h-24 flex flex-col items-center justify-center">
                      <Link to="/users">
                        <Users className="h-6 w-6 mb-2" />
                        <span>Gestionar Usuarios</span>
                      </Link>
                    </Button>
                    
                    <Button variant="outline" asChild className="h-24 flex flex-col items-center justify-center">
                      <Link to="/admin/test-data">
                        <Database className="h-6 w-6 mb-2" />
                        <span>Datos de Prueba</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Profile;
