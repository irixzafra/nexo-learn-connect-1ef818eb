
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';

// Schema de validación para el formulario
const courseSchema = z.object({
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
  is_published: z.boolean().default(false),
});

type CourseFormValues = z.infer<typeof courseSchema>;

const CreateCourse: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '0',
      currency: 'eur',
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

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Crear Nuevo Curso</h1>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Información del Curso</CardTitle>
            <CardDescription>
              Completa la información básica para crear tu nuevo curso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título del Curso</FormLabel>
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
                      <FormLabel>Descripción</FormLabel>
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
                        <FormLabel>Precio</FormLabel>
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
                        <FormLabel>Moneda</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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

                <FormField
                  control={form.control}
                  name="is_published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
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

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creando curso...
                    </>
                  ) : (
                    'Crear Curso'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate('/instructor/courses')}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default CreateCourse;
