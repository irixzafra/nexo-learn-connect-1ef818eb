
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, BookPlus, Sparkles, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

// Schema de validación para el formulario
const courseSchema = z.object({
  // Información básica
  title: z
    .string()
    .min(5, { message: 'El título debe tener al menos 5 caracteres' })
    .max(100, { message: 'El título no puede exceder 100 caracteres' }),
  description: z
    .string()
    .min(20, { message: 'La descripción debe tener al menos 20 caracteres' })
    .max(1000, { message: 'La descripción no puede exceder 1000 caracteres' }),
  price: z
    .string()
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
      { message: 'El precio debe ser un número válido igual o mayor a 0' }
    ),
  currency: z.enum(['eur', 'usd'], {
    required_error: 'Selecciona la moneda',
  }),
  level: z.enum(['principiante', 'intermedio', 'avanzado'], {
    required_error: 'Selecciona el nivel del curso',
  }).optional(),
  duration_text: z.string().optional(),
  prerequisites_text: z.string().optional(),
  
  // Landing page y SEO
  cover_image_url: z.string().optional(),
  is_featured_on_landing: z.boolean().default(false),
  seo_title: z.string().max(60, { message: 'El título SEO no debe exceder 60 caracteres' }).optional(),
  seo_description: z.string().max(160, { message: 'La descripción SEO no debe exceder 160 caracteres' }).optional(),
  
  // Estado del curso
  is_published: z.boolean().default(false),
});

type CourseFormValues = z.infer<typeof courseSchema>;

const CreateCourse: React.FC = () => {
  const { user, profile, userRole } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '0',
      currency: 'eur',
      level: 'principiante',
      duration_text: '',
      prerequisites_text: '',
      cover_image_url: '',
      is_featured_on_landing: false,
      seo_title: '',
      seo_description: '',
      is_published: false,
    },
  });

  const onSubmit = async (data: CourseFormValues) => {
    if (!user || !profile) {
      toast({
        title: 'Error',
        description: 'Debes iniciar sesión para crear un curso',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Convertir el precio a número
      const numericPrice = parseFloat(data.price);

      // Insertar el curso en la base de datos
      const { data: courseData, error } = await supabase
        .from('courses')
        .insert({
          instructor_id: user.id,
          title: data.title,
          description: data.description,
          price: numericPrice,
          currency: data.currency,
          level: data.level || null,
          duration_text: data.duration_text || null,
          prerequisites_text: data.prerequisites_text || null,
          cover_image_url: data.cover_image_url || null,
          is_featured_on_landing: data.is_featured_on_landing,
          seo_title: data.seo_title || null,
          seo_description: data.seo_description || null,
          is_published: data.is_published,
        })
        .select('id')
        .single();

      if (error) {
        throw error;
      }

      // Mostrar notificación de éxito
      toast({
        title: 'Curso creado',
        description: data.is_published 
          ? 'El curso ha sido publicado exitosamente' 
          : 'El curso ha sido guardado como borrador',
      });

      // Redireccionar a la página de edición del curso
      navigate(`/instructor/courses/${courseData.id}/edit`);
    } catch (error: any) {
      console.error('Error creating course:', error);
      toast({
        title: 'Error al crear el curso',
        description: error.message || 'Ha ocurrido un error inesperado',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para rellenar el formulario con datos de prueba (solo para administradores)
  const fillWithTestData = () => {
    form.setValue('title', 'Curso de Prueba: Introducción a React');
    form.setValue('description', 'Este es un curso de prueba generado automáticamente. Introduce a los estudiantes en los conceptos fundamentales de React, incluyendo componentes, estado, props y hooks. Perfecto para principiantes que quieren aprender desarrollo frontend moderno.');
    form.setValue('price', '29.99');
    form.setValue('currency', 'eur');
    form.setValue('level', 'principiante');
    form.setValue('duration_text', '6 horas de contenido');
    form.setValue('prerequisites_text', 'Conocimientos básicos de HTML, CSS y JavaScript');
    form.setValue('seo_title', 'Curso de Introducción a React | Aprende desde cero');
    form.setValue('seo_description', 'Aprende React desde los fundamentos hasta crear aplicaciones completas. Curso práctico con proyectos reales y ejercicios.');
    form.setValue('cover_image_url', 'https://placehold.co/600x400?text=Curso+de+React');
    form.setValue('is_featured_on_landing', true);
    
    toast({
      title: 'Datos de prueba cargados',
      description: 'El formulario ha sido rellenado con datos de prueba',
    });
  };

  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Crear Nuevo Curso</h1>
            <p className="text-muted-foreground">
              Completa la información necesaria para crear tu curso
            </p>
          </div>
          
          {/* Botón de datos de prueba (solo visible para administradores) */}
          {userRole === 'admin' && (
            <Button 
              onClick={fillWithTestData}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Datos de Prueba
            </Button>
          )}
        </div>
      </motion.div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookPlus className="h-6 w-6 text-primary" />
            Información del Curso
          </CardTitle>
          <CardDescription>
            Los campos marcados con * son obligatorios
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="basic">Información Básica</TabsTrigger>
                  <TabsTrigger value="details">Detalles</TabsTrigger>
                  <TabsTrigger value="seo">Landing Page & SEO</TabsTrigger>
                </TabsList>
                
                {/* Tab: Información Básica */}
                <TabsContent value="basic" className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título del Curso *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Introducción a la Programación" />
                        </FormControl>
                        <FormDescription>
                          Un título descriptivo y atractivo para tu curso
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción *</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Describe tu curso de manera detallada..." 
                            rows={5}
                          />
                        </FormControl>
                        <FormDescription>
                          Explica de qué trata el curso, qué aprenderán los estudiantes y a quién está dirigido
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Precio *</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" min="0" step="0.01" />
                          </FormControl>
                          <FormDescription>
                            Establece 0 para cursos gratuitos
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Moneda *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona la moneda" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="eur">EUR (€)</SelectItem>
                              <SelectItem value="usd">USD ($)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Moneda en la que se cobrará el curso
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                
                {/* Tab: Detalles */}
                <TabsContent value="details" className="space-y-6">
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nivel del curso</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ''}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona el nivel" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="principiante">Principiante</SelectItem>
                            <SelectItem value="intermedio">Intermedio</SelectItem>
                            <SelectItem value="avanzado">Avanzado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Nivel de conocimiento recomendado para tomar este curso
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="duration_text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duración</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ej: 6 horas de vídeo, 8 semanas" />
                        </FormControl>
                        <FormDescription>
                          Tiempo aproximado para completar el curso
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="prerequisites_text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requisitos previos</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Conocimientos necesarios para aprovechar el curso..." 
                            rows={3}
                          />
                        </FormControl>
                        <FormDescription>
                          Conocimientos o habilidades recomendados antes de comenzar
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                {/* Tab: Landing Page & SEO */}
                <TabsContent value="seo" className="space-y-6">
                  <FormField
                    control={form.control}
                    name="cover_image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL de imagen de portada</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://ejemplo.com/imagen.jpg" />
                        </FormControl>
                        <FormDescription>
                          URL de la imagen principal que aparecerá en la landing page del curso
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="seo_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título SEO</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Título optimizado para buscadores (máx. 60 caracteres)" />
                        </FormControl>
                        <FormDescription>
                          Título que aparecerá en los resultados de búsqueda (máximo 60 caracteres)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="seo_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción SEO</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Descripción corta optimizada para buscadores (máx. 160 caracteres)" 
                            rows={3}
                          />
                        </FormControl>
                        <FormDescription>
                          Descripción que aparecerá en los resultados de búsqueda (máximo 160 caracteres)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="is_featured_on_landing"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Destacar en landing page
                          </FormLabel>
                          <FormDescription>
                            Si está activado, el curso se mostrará en la sección destacada de la página principal
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
                </TabsContent>
              </Tabs>
              
              <Separator />
              
              {/* Estado del curso - visible en todas las pestañas */}
              <FormField
                control={form.control}
                name="is_published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-muted/10">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Publicar inmediatamente
                      </FormLabel>
                      <FormDescription>
                        Si está desactivado, el curso se guardará como borrador
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

              <div className="flex flex-col gap-4 md:flex-row md:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/instructor/courses')}
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creando curso...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Crear Curso
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCourse;
