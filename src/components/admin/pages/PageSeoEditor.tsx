
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PageSeoEditorProps {
  form: UseFormReturn<any>;
}

const PageSeoEditor: React.FC<PageSeoEditorProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL amigable</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <span className="bg-muted px-3 py-2 rounded-l-md border text-muted-foreground">
                      /
                    </span>
                    <Input 
                      {...field} 
                      placeholder="url-amigable" 
                      className="rounded-l-none"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Esta será la URL de la página. Use solo letras minúsculas, números y guiones.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <FormField
            control={form.control}
            name="meta_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta descripción</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Introduce una descripción para motores de búsqueda" 
                    className="resize-none h-20"
                  />
                </FormControl>
                <FormDescription>
                  {field.value?.length || 0}/160 caracteres. La meta descripción aparece en los resultados de búsqueda.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Borrador</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                    <SelectItem value="archived">Archivado</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Define si la página es visible para los usuarios.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <FormField
            control={form.control}
            name="layout"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diseño de página</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un diseño" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="default">Estándar</SelectItem>
                    <SelectItem value="landing">Landing</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="documentation">Documentación</SelectItem>
                    <SelectItem value="course">Curso</SelectItem>
                    <SelectItem value="sidebar">Con Sidebar</SelectItem>
                    <SelectItem value="full-width">Ancho Completo</SelectItem>
                    <SelectItem value="column">Columna</SelectItem>
                    <SelectItem value="row">Fila</SelectItem>
                    <SelectItem value="grid-2">Grid 2 columnas</SelectItem>
                    <SelectItem value="grid-3">Grid 3 columnas</SelectItem>
                    <SelectItem value="grid-4">Grid 4 columnas</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Define cómo se estructura el contenido de la página.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PageSeoEditor;
