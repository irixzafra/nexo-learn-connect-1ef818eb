
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
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  BellRing, 
  CalendarClock, 
  Clock,
  Globe, 
  Loader2, 
  Monitor, 
  Moon, 
  Bell,
  MessageSquare,
  Trophy,
  FileEdit,
  Users,
  Calendar,
  Mail,
  Smartphone,
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

  const handleToggleMobileNotifications = async () => {
    await updatePreference('mobile_notifications', !preferences.mobile_notifications);
  };

  const handleToggleCourseUpdateNotifications = async () => {
    await updatePreference('course_update_notifications', !preferences.course_update_notifications);
  };

  const handleToggleAchievementNotifications = async () => {
    await updatePreference('achievement_notifications', !preferences.achievement_notifications);
  };

  const handleToggleCommentNotifications = async () => {
    await updatePreference('comment_notifications', !preferences.comment_notifications);
  };

  const handleToggleForumNotifications = async () => {
    await updatePreference('forum_notifications', !preferences.forum_notifications);
  };

  const handleToggleEventNotifications = async () => {
    await updatePreference('event_notifications', !preferences.event_notifications);
  };

  const handleTogglePromotionalNotifications = async () => {
    await updatePreference('promotional_notifications', !preferences.promotional_notifications);
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

  // Function to render an "in development" badge
  const InDevelopmentBadge = () => (
    <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">
      En desarrollo
    </Badge>
  );

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Preferencias</h1>
        <p className="text-muted-foreground">Personaliza tu experiencia en la plataforma</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 w-full md:w-auto overflow-x-auto flex-nowrap">
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
              {/* Notification Channels */}
              <div>
                <h3 className="text-lg font-medium mb-4">Canales de notificación</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email_notifications" className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Notificaciones por Email
                      </Label>
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
                      <Label htmlFor="browser_notifications" className="flex items-center">
                        <Bell className="h-4 w-4 mr-2" />
                        Notificaciones del Navegador
                      </Label>
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

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mobile_notifications" className="flex items-center">
                        <Smartphone className="h-4 w-4 mr-2" />
                        Notificaciones Móviles
                        <InDevelopmentBadge />
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Recibir notificaciones en la aplicación móvil
                      </p>
                    </div>
                    <Switch 
                      id="mobile_notifications" 
                      checked={preferences.mobile_notifications}
                      onCheckedChange={handleToggleMobileNotifications}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Notification Types */}
              <div>
                <h3 className="text-lg font-medium mb-4">Tipos de notificaciones</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="course_updates" className="flex items-center">
                        <FileEdit className="h-4 w-4 mr-2" />
                        Actualizaciones de cursos
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Recibir notificaciones sobre actualizaciones en tus cursos
                      </p>
                    </div>
                    <Switch 
                      id="course_updates" 
                      checked={preferences.course_update_notifications}
                      onCheckedChange={handleToggleCourseUpdateNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="achievement_notifications" className="flex items-center">
                        <Trophy className="h-4 w-4 mr-2" />
                        Logros y progreso
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Notificaciones sobre completar cursos, obtener certificados y logros
                      </p>
                    </div>
                    <Switch 
                      id="achievement_notifications" 
                      checked={preferences.achievement_notifications}
                      onCheckedChange={handleToggleAchievementNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="comment_notifications" className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Comentarios y respuestas
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Notificaciones cuando alguien responde a tus comentarios
                      </p>
                    </div>
                    <Switch 
                      id="comment_notifications" 
                      checked={preferences.comment_notifications}
                      onCheckedChange={handleToggleCommentNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="forum_notifications" className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Foros y discusiones
                        <InDevelopmentBadge />
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Notificaciones sobre nuevos mensajes en foros que sigues
                      </p>
                    </div>
                    <Switch 
                      id="forum_notifications" 
                      checked={preferences.forum_notifications}
                      onCheckedChange={handleToggleForumNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="event_notifications" className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Eventos y webinars
                        <InDevelopmentBadge />
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Notificaciones sobre eventos, webinars y sesiones en vivo
                      </p>
                    </div>
                    <Switch 
                      id="event_notifications" 
                      checked={preferences.event_notifications}
                      onCheckedChange={handleToggleEventNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="promotional_notifications" className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Promociones y ofertas
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Recibir notificaciones sobre descuentos y ofertas especiales
                      </p>
                    </div>
                    <Switch 
                      id="promotional_notifications" 
                      checked={preferences.promotional_notifications}
                      onCheckedChange={handleTogglePromotionalNotifications}
                    />
                  </div>
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
                    <Label htmlFor="reduce_animations">
                      Reducir animaciones
                      <InDevelopmentBadge />
                    </Label>
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
                    <Label htmlFor="text_size">
                      Tamaño del texto
                      <InDevelopmentBadge />
                    </Label>
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

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="screen_reader">
                      Compatibilidad con lectores de pantalla
                      <InDevelopmentBadge />
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Mejora la compatibilidad con tecnologías de asistencia
                    </p>
                  </div>
                  <Switch 
                    id="screen_reader" 
                    checked={preferences.accessibility_options?.screen_reader || false}
                    onCheckedChange={(checked) => 
                      updatePreference('accessibility_options', {
                        ...preferences.accessibility_options,
                        screen_reader: checked
                      })
                    }
                  />
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
  );
};

export default Preferences;
