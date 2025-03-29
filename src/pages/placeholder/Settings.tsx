
import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { UserRoleSwitcher } from "@/components/admin/UserRoleSwitcher";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  BellRing, 
  Globe, 
  LockKeyhole, 
  Monitor, 
  Shield, 
  UserCog 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Settings: React.FC = () => {
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';

  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Configuración</h1>
          <p className="text-muted-foreground">Personaliza tu experiencia en la plataforma</p>
        </div>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general" className="gap-2">
              <Monitor className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <BellRing className="h-4 w-4" />
              Notificaciones
            </TabsTrigger>
            <TabsTrigger value="account" className="gap-2">
              <UserCog className="h-4 w-4" />
              Cuenta
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <LockKeyhole className="h-4 w-4" />
              Seguridad
            </TabsTrigger>
            <TabsTrigger value="language" className="gap-2">
              <Globe className="h-4 w-4" />
              Idioma
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="admin" className="gap-2">
                <Shield className="h-4 w-4" />
                Administración
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="general">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferencias Generales</CardTitle>
                    <CardDescription>
                      Configura las opciones básicas de la plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="theme">Tema Oscuro</Label>
                          <p className="text-sm text-muted-foreground">
                            Activar modo oscuro para la interfaz
                          </p>
                        </div>
                        <Switch id="theme" />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="animations">Animaciones</Label>
                          <p className="text-sm text-muted-foreground">
                            Activar animaciones en la interfaz
                          </p>
                        </div>
                        <Switch id="animations" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Acerca de</CardTitle>
                    <CardDescription>
                      Información del sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Versión</p>
                      <p className="font-medium">1.0.0</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Última actualización</p>
                      <p className="font-medium">22/06/2023</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Notificaciones</CardTitle>
                <CardDescription>
                  Administra cómo y cuándo recibes notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email_notifications">Notificaciones por Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibir notificaciones importantes por correo electrónico
                      </p>
                    </div>
                    <Switch id="email_notifications" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push_notifications">Notificaciones Push</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibir notificaciones en la plataforma
                      </p>
                    </div>
                    <Switch id="push_notifications" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Cuenta</CardTitle>
                <CardDescription>
                  Gestiona la información de tu cuenta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Esta sección estará disponible próximamente
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Seguridad</CardTitle>
                <CardDescription>
                  Administra las opciones de seguridad de tu cuenta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Esta sección estará disponible próximamente
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="language">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Idioma</CardTitle>
                <CardDescription>
                  Configura el idioma de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Esta sección estará disponible próximamente
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          {isAdmin && (
            <TabsContent value="admin">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Herramientas de Administración</CardTitle>
                      <CardDescription>
                        Opciones avanzadas para administradores
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Cambiar Rol de Vista</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Como administrador, puedes cambiar temporalmente tu vista para ver la plataforma como otro tipo de usuario
                        </p>
                        <UserRoleSwitcher />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Opciones del Sistema</CardTitle>
                      <CardDescription>
                        Configuración avanzada
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="maintenance">Modo Mantenimiento</Label>
                          <p className="text-sm text-muted-foreground">
                            Activar modo mantenimiento
                          </p>
                        </div>
                        <Switch id="maintenance" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
