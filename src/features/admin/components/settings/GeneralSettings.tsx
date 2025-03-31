
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Upload, Globe, Clock, Mail, Settings } from 'lucide-react';

const generalSettingsSchema = z.object({
  site_name: z.string().min(1, "El nombre del sitio es requerido"),
  site_description: z.string().optional(),
  logo_light_url: z.string().optional(),
  logo_dark_url: z.string().optional(),
  favicon_url: z.string().optional(),
  default_language: z.string().min(1, "El idioma es requerido"),
  default_timezone: z.string().min(1, "La zona horaria es requerida"),
  support_email: z.string().email("Email inválido").optional(),
  default_theme: z.string().min(1, "El tema es requerido"),
  allow_user_theme_selection: z.boolean().default(true),
  multilanguage_enabled: z.boolean().default(false),
  available_languages: z.array(z.string()).optional(),
});

type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>;

const GeneralSettings: React.FC = () => {
  const form = useForm<GeneralSettingsValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      site_name: "Nexo",
      site_description: "Plataforma de aprendizaje online",
      logo_light_url: "",
      logo_dark_url: "",
      favicon_url: "",
      default_language: "es",
      default_timezone: "Europe/Madrid",
      support_email: "soporte@nexo.com",
      default_theme: "light",
      allow_user_theme_selection: true,
      multilanguage_enabled: false,
      available_languages: ["es"],
    }
  });

  const onSubmit = (data: GeneralSettingsValues) => {
    console.log("Form submitted:", data);
    toast.success("Configuración guardada correctamente");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Identidad del Sitio */}
        <Card>
          <CardHeader>
            <CardTitle>Identidad del Sitio</CardTitle>
            <CardDescription>
              Configura la información básica de tu plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="site_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Sitio</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Nombre principal de la plataforma
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="site_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción / Lema</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Breve descripción de la plataforma (aparecerá en SEO y cabeceras)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="logo_light_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo (Modo Claro)</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input {...field} />
                        <Button type="button" size="icon" variant="outline">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logo_dark_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo (Modo Oscuro)</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input {...field} />
                        <Button type="button" size="icon" variant="outline">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="favicon_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Favicon</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input {...field} />
                        <Button type="button" size="icon" variant="outline">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuración Regional y Contacto */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración Regional y de Contacto</CardTitle>
            <CardDescription>
              Ajustes de idioma, zona horaria y contacto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="default_language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idioma por Defecto</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar idioma" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="default_timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zona Horaria</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar zona horaria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Europe/Madrid">Europe/Madrid (GMT+1)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                        <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                        <SelectItem value="America/Los_Angeles">America/Los_Angeles (GMT-8)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="support_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email de Soporte</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormDescription>
                    Email público de contacto para soporte
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Apariencia Básica */}
        <Card>
          <CardHeader>
            <CardTitle>Apariencia Básica</CardTitle>
            <CardDescription>
              Configura el aspecto visual y opciones de idioma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="default_theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tema por Defecto</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tema" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Oscuro</SelectItem>
                      <SelectItem value="system">Sistema (Automático)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allow_user_theme_selection"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Permitir Selección de Tema</FormLabel>
                    <FormDescription>
                      Permite a los usuarios cambiar el tema de la interfaz
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="multilanguage_enabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Habilitar Soporte Multilenguaje</FormLabel>
                    <FormDescription>
                      Permite a los usuarios cambiar el idioma de la interfaz
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Acerca del Sistema */}
        <Card>
          <CardHeader>
            <CardTitle>Acerca del Sistema</CardTitle>
            <CardDescription>
              Información sobre la versión actual y licencias
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Información del Sistema</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Versión</span>
                    <span className="font-medium">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entorno</span>
                    <span className="font-medium">Producción</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Última actualización</span>
                    <span className="font-medium">20 Oct 2023</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Equipo de Desarrollo</h3>
                <p className="text-muted-foreground mb-2">
                  Desarrollado con ❤️ por el equipo de Nexo
                </p>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Soporte</span>
                  <span className="font-medium">soporte@nexo.com</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">
            Guardar Configuración
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default GeneralSettings;
