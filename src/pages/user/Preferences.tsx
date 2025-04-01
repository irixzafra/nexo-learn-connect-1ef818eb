
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { 
  BellRing, 
  CalendarClock, 
  Clock,
  Globe, 
  Loader2, 
  Monitor, 
  Moon, 
  NotificationIcon,
  Save, 
  Settings,
  Sun, 
  Target,
  Volume2
} from 'lucide-react';

const Preferences: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    preferences, 
    isLoading, 
    isSaving, 
    updatePreference, 
    savePreferences 
  } = useUserPreferences();

  // Redirect if user is not logged in
  React.useEffect(() => {
    if (!user && !isLoading) {
      navigate('/auth/login', { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="container flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Cargando tus preferencias...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!preferences) {
    return (
      <AppLayout>
        <div className="container mx-auto py-8">
          <Card>
            <CardContent className="py-8">
              <div className="flex flex-col items-center gap-2">
                <p className="text-lg font-medium">No se pudieron cargar las preferencias</p>
                <p className="text-sm text-muted-foreground">Por favor, inténtalo de nuevo más tarde</p>
                <Button onClick={() => navigate(-1)} className="mt-4">
                  Volver
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const handleToggleEmailNotifications = async () => {
    await updatePreference('email_notifications', !preferences.email_notifications);
  };

  const handleToggleBrowserNotifications = async () => {
    await updatePreference('browser_notifications', !preferences.browser_notifications);
  };

  const handleThemeChange = async (value: 'light' | 'dark' | 'system') => {
    await updatePreference('theme_preference', value);
  };

  const handleLanguageChange = async (value: 'es' | 'en' | 'pt') => {
    await updatePreference('language_preference', value);
    toast.info('El cambio de idioma se aplicará al recargar la página');
  };

  const handleReminderDayToggle = async (day: string) => {
    const currentDays = [...preferences.learning_reminder_days];
    const dayIndex = currentDays.indexOf(day);
    
    if (dayIndex >= 0) {
      currentDays.splice(dayIndex, 1);
    } else {
      currentDays.push(day);
    }
    
    await updatePreference('learning_reminder_days', currentDays);
  };

  const handleReminderTimeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await updatePreference('reminder_time', e.target.value);
  };

  const handleDailyGoalChange = async (value: number[]) => {
    await updatePreference('daily_goal_minutes', value[0]);
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Preferencias</h1>
          <p className="text-muted-foreground">Personaliza tu experiencia en la plataforma</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general" className="gap-2">
              <Monitor className="h-4 w-4" />
              Generales
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <BellRing className="h-4 w-4" />
              Notificaciones
            </TabsTrigger>
            <TabsTrigger value="learning" className="gap-2">
              <Target className="h-4 w-4" />
              Aprendizaje
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="gap-2">
              <Volume2 className="h-4 w-4" />
              Accesibilidad
            </TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Ajustes Generales</CardTitle>
                <CardDescription>
                  Personaliza la apariencia y el comportamiento de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Tema</Label>
                      <p className="text-sm text-muted-foreground">
                        Selecciona el tema de la interfaz
                      </p>
                    </div>
                    <Select 
                      value={preferences.theme_preference} 
                      onValueChange={(value) => handleThemeChange(value as 'light' | 'dark' | 'system')}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecciona un tema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light" className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            <span>Claro</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="dark" className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            <span>Oscuro</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="system" className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4" />
                            <span>Sistema</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Idioma</Label>
                      <p className="text-sm text-muted-foreground">
                        Selecciona el idioma de la plataforma
                      </p>
                    </div>
                    <Select 
                      value={preferences.language_preference} 
                      onValueChange={(value) => handleLanguageChange(value as 'es' | 'en' | 'pt')}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecciona un idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>
                  Configura cómo y cuándo recibes notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email_notifications">Notificaciones por Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibir notificaciones por correo electrónico
                      </p>
                    </div>
                    <Switch 
                      id="email_notifications" 
                      checked={preferences.email_notifications}
                      onCheckedChange={handleToggleEmailNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="browser_notifications">Notificaciones del Navegador</Label>
                      <p className="text-sm text-muted-foreground">
                        Recibir notificaciones en el navegador
                      </p>
                    </div>
                    <Switch 
                      id="browser_notifications" 
                      checked={preferences.browser_notifications}
                      onCheckedChange={handleToggleBrowserNotifications}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Tab */}
          <TabsContent value="learning">
            <Card>
              <CardHeader>
                <CardTitle>Aprendizaje</CardTitle>
                <CardDescription>
                  Configura tus objetivos y recordatorios de estudio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Días de recordatorio</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Selecciona los días en los que quieres recibir recordatorios
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      {[
                        { day: 'monday', label: 'Lunes' },
                        { day: 'tuesday', label: 'Martes' },
                        { day: 'wednesday', label: 'Miércoles' },
                        { day: 'thursday', label: 'Jueves' },
                        { day: 'friday', label: 'Viernes' },
                        { day: 'saturday', label: 'Sábado' },
                        { day: 'sunday', label: 'Domingo' }
                      ].map(({ day, label }) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox
                            id={`day-${day}`}
                            checked={preferences.learning_reminder_days.includes(day)}
                            onCheckedChange={() => handleReminderDayToggle(day)}
                          />
                          <label
                            htmlFor={`day-${day}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="reminder_time">Hora de recordatorio</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Establece la hora en la que quieres recibir los recordatorios
                    </p>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Input
                        id="reminder_time"
                        type="time"
                        value={preferences.reminder_time}
                        onChange={handleReminderTimeChange}
                        className="w-36"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="daily_goal">Objetivo diario (minutos)</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Minutos de estudio que quieres lograr cada día
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{preferences.daily_goal_minutes} min</span>
                        <span className="text-sm text-muted-foreground">Meta diaria</span>
                      </div>
                      <Slider
                        id="daily_goal"
                        min={5}
                        max={180}
                        step={5}
                        value={[preferences.daily_goal_minutes]}
                        onValueChange={handleDailyGoalChange}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>5 min</span>
                        <span>60 min</span>
                        <span>180 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accessibility Tab */}
          <TabsContent value="accessibility">
            <Card>
              <CardHeader>
                <CardTitle>Accesibilidad</CardTitle>
                <CardDescription>
                  Opciones para mejorar la accesibilidad de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="high_contrast">Alto contraste</Label>
                      <p className="text-sm text-muted-foreground">
                        Aumenta el contraste de la interfaz para mejorar la visibilidad
                      </p>
                    </div>
                    <Switch 
                      id="high_contrast" 
                      checked={preferences.accessibility_options?.high_contrast || false}
                      onCheckedChange={(checked) => 
                        updatePreference('accessibility_options', {
                          ...preferences.accessibility_options,
                          high_contrast: checked
                        })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="reduce_animations">Reducir animaciones</Label>
                      <p className="text-sm text-muted-foreground">
                        Reduce o elimina las animaciones de la interfaz
                      </p>
                    </div>
                    <Switch 
                      id="reduce_animations" 
                      checked={preferences.accessibility_options?.reduce_animations || false}
                      onCheckedChange={(checked) => 
                        updatePreference('accessibility_options', {
                          ...preferences.accessibility_options,
                          reduce_animations: checked
                        })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="text_size">Tamaño del texto</Label>
                      <p className="text-sm text-muted-foreground">
                        Ajusta el tamaño del texto en la plataforma
                      </p>
                    </div>
                    <Select 
                      value={preferences.accessibility_options?.text_size || 'normal'}
                      onValueChange={(value) => 
                        updatePreference('accessibility_options', {
                          ...preferences.accessibility_options,
                          text_size: value
                        })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Tamaño del texto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Pequeño</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                        <SelectItem value="x-large">Muy grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button disabled={isSaving} onClick={() => navigate(-1)} variant="outline" className="mr-2">
            Volver
          </Button>
          <Button disabled={isSaving} onClick={() => savePreferences(preferences)}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            Guardar todos los cambios
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Preferences;
