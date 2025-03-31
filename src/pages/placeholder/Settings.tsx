
import React, { useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { UserRoleSwitcher } from "@/components/admin/UserRoleSwitcher";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  BellRing, 
  Globe, 
  LockKeyhole, 
  Monitor, 
  Shield, 
  UserCog,
  Save,
  Moon,
  Sun,
  Zap,
  Mail,
  Phone,
  Bell,
  Info,
  Users
} from "lucide-react";

const Settings: React.FC = () => {
  const { userRole } = useAuth();
  const isAdmin = userRole === 'admin';

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState('en');

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    toast.success(`Tema cambiado a ${newTheme === 'dark' ? 'oscuro' : 'claro'}`);
  };

  const handleNotificationsChange = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    toast.info(`Notificaciones ${enabled ? 'activadas' : 'desactivadas'}`);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    toast.message(`Idioma cambiado a ${newLanguage}`);
  };

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
                          <Label htmlFor="theme">Tema</Label>
                          <p className="text-sm text-muted-foreground">
                            Selecciona el tema de la interfaz
                          </p>
                        </div>
                        <Select value={theme} onValueChange={handleThemeChange}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecciona un tema" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">
                              <Sun className="mr-2 h-4 w-4" />
                              Claro
                            </SelectItem>
                            <SelectItem value="dark">
                              <Moon className="mr-2 h-4 w-4" />
                              Oscuro
                            </SelectItem>
                          </SelectContent>
                        </Select>
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
                    <Switch 
                      id="email_notifications" 
                      checked={notificationsEnabled}
                      onCheckedChange={handleNotificationsChange}
                    />
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
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input type="text" id="name" defaultValue="Nombre del Usuario" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" defaultValue="usuario@example.com" disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografía</Label>
                  <Input id="bio" placeholder="Cuéntanos algo sobre ti..." />
                </div>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar Cambios
                </Button>
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
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="password">Cambiar Contraseña</Label>
                    <Input type="password" id="password" placeholder="Nueva contraseña" />
                  </div>
                  <div>
                    <Label htmlFor="confirm_password">Confirmar Contraseña</Label>
                    <Input type="password" id="confirm_password" placeholder="Confirmar nueva contraseña" />
                  </div>
                  <Button>
                    <LockKeyhole className="mr-2 h-4 w-4" />
                    Cambiar Contraseña
                  </Button>
                </div>
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
                <div className="flex items-center space-x-4">
                  <Label htmlFor="language">Idioma</Label>
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecciona un idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">Inglés</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Francés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
