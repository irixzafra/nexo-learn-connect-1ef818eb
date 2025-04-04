import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/auth';

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  
  const formSchema = z.object({
    title: z.string().min(2, {
      message: "El título debe tener al menos 2 caracteres.",
    }),
    description: z.string().min(10, {
      message: "La descripción debe tener al menos 10 caracteres.",
    }),
    price: z.string().refine(value => {
      const num = Number(value);
      return !isNaN(num) && num >= 0;
    }, {
      message: "El precio debe ser un número válido mayor o igual a 0.",
    }),
    currency: z.enum(['usd', 'eur']),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    duration_text: z.string().min(3, {
      message: "La duración debe tener al menos 3 caracteres.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "0",
      currency: "usd",
      level: "beginner",
      duration_text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!user?.id) {
        toast.error("No se pudo obtener el ID del usuario.");
        return;
      }

      const price = parseFloat(values.price);

      const { data, error } = await supabase
        .from('courses')
        .insert([
          {
            instructor_id: user.id,
            title: values.title,
            description: values.description,
            price: price,
            currency: values.currency,
            level: values.level,
            duration_text: values.duration_text,
            is_published: false,
          },
        ])
        .select()

      if (error) {
        console.error("Error creating course:", error);
        toast.error("Error al crear el curso. Por favor, inténtelo de nuevo.");
        return;
      }

      toast.success("Curso creado exitosamente!");
      navigate('/instructor/courses');
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Ocurrió un error inesperado. Por favor, inténtelo de nuevo.");
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Curso</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Información del Curso</CardTitle>
          <CardDescription>
            Ingrese la información básica del curso para comenzar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título del Curso</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Curso de React para principiantes" {...field} />
                    </FormControl>
                    <FormDescription>
                      Este es el título que verán los estudiantes.
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
                        placeholder="Describe de qué trata el curso"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe el contenido y los objetivos del curso.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Precio</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ej. 49.99" {...field} />
                      </FormControl>
                      <FormDescription>
                        Establece el precio del curso.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Moneda</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una moneda" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="usd">USD</SelectItem>
                          <SelectItem value="eur">EUR</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Selecciona la moneda del curso.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Nivel</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el nivel" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Principiante</SelectItem>
                          <SelectItem value="intermediate">Intermedio</SelectItem>
                          <SelectItem value="advanced">Avanzado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Selecciona el nivel del curso.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration_text"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Duración</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej. 8 semanas" {...field} />
                      </FormControl>
                      <FormDescription>
                        Indica la duración estimada del curso.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">Crear Curso</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Todos los campos son obligatorios.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateCourse;
