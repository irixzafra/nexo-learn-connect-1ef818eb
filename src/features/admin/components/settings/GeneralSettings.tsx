
import React, { useState } from 'react';
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
import { Upload, Globe, Clock, Mail, Settings, ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  default_landing_url: z.string().default("/landing"),
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
      default_landing_url: "/landing",
      allow_user_theme_selection: true,
      multilanguage_enabled: false,
      available_languages: ["es"],
    }
  });

  const [openSections, setOpenSections] = useState({
    identity: true,
    navigation: true,
    regional: true,
    appearance: true,
    about: false
  });
  
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const onSubmit = (data: GeneralSettingsValues) => {
    console.log("Form submitted:", data);
    
    // Guardamos la configuración en localStorage para demo
    localStorage.setItem('nexo_settings', JSON.stringify(data));
    
    toast.success("Configuración guardada correctamente");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center mb-2">
              <Settings className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-left">Configuración General</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4 text-left">
              Administra la configuración general de la plataforma
            </p>

            <div className="space-y-3">
              {/* Identidad del Sitio */}
              <Collapsible 
                open={openSections.identity} 
                onOpenChange={() => toggleSection('identity')}
                className="border rounded-lg overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center w-full px-4 py-3 hover:bg-muted/50 text-left">
                  <div className="flex items-center gap-2 flex-1">
                    <Settings className="h-5 w-5 text-indigo-500" />
                    <span className="font-medium">Identidad del Sitio</span>
                  </div>
                  <div className="text-muted-foreground">
                    {openSections.identity ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4 border-t pt-4">
                  <div className="space-y-4">
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
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Navegación y Acceso */}
              <Collapsible 
                open={openSections.navigation} 
                onOpenChange={() => toggleSection('navigation')}
                className="border rounded-lg overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center w-full px-4 py-3 hover:bg-muted/50 text-left">
                  <div className="flex items-center gap-2 flex-1">
                    <Settings className="h-5 w-5 text-orange-500" />
                    <span className="font-medium">Navegación y Acceso</span>
                  </div>
                  <div className="text-muted-foreground">
                    {openSections.navigation ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4 border-t pt-4">
                  <FormField
                    control={form.control}
                    name="default_landing_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL de inicio para usuarios no autenticados</FormLabel>
                        <FormControl>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar página de inicio" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="/landing">Página de Landing</SelectItem>
                              <SelectItem value="/auth/login">Página de Login</SelectItem>
                              <SelectItem value="/courses">Catálogo de Cursos</SelectItem>
                              <SelectItem value="/about-us">Sobre Nosotros</SelectItem>
                              <SelectItem value="/community">Comunidad</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Esta será la página principal a la que se dirigirán los usuarios no autenticados
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CollapsibleContent>
              </Collapsible>

              {/* Configuración Regional */}
              <Collapsible 
                open={openSections.regional} 
                onOpenChange={() => toggleSection('regional')}
                className="border rounded-lg overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center w-full px-4 py-3 hover:bg-muted/50 text-left">
                  <div className="flex items-center gap-2 flex-1">
                    <Globe className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Configuración Regional y de Contacto</span>
                  </div>
                  <div className="text-muted-foreground">
                    {openSections.regional ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4 border-t pt-4">
                  <div className="space-y-4">
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
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Apariencia Básica */}
              <Collapsible 
                open={openSections.appearance} 
                onOpenChange={() => toggleSection('appearance')}
                className="border rounded-lg overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center w-full px-4 py-3 hover:bg-muted/50 text-left">
                  <div className="flex items-center gap-2 flex-1">
                    <Settings className="h-5 w-5 text-purple-500" />
                    <span className="font-medium">Apariencia Básica</span>
                  </div>
                  <div className="text-muted-foreground">
                    {openSections.appearance ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4 border-t pt-4">
                  <div className="space-y-4">
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
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Acerca del Sistema */}
              <Collapsible 
                open={openSections.about} 
                onOpenChange={() => toggleSection('about')}
                className="border rounded-lg overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center w-full px-4 py-3 hover:bg-muted/50 text-left">
                  <div className="flex items-center gap-2 flex-1">
                    <Settings className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Acerca del Sistema</span>
                  </div>
                  <div className="text-muted-foreground">
                    {openSections.about ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4 border-t pt-4">
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
                </CollapsibleContent>
              </Collapsible>
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
