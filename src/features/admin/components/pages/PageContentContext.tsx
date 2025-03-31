
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { UseFormReturn } from 'react-hook-form';
import { CreatePageFormData } from '@/features/admin/hooks/useCreatePageForm';

interface PageContentContextProps {
  form: UseFormReturn<CreatePageFormData>;
}

const PageContentContext: React.FC<PageContentContextProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="context"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contexto para la IA</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Describe lo que quieres incluir en la página, referencias de diseño, colores, imágenes, etc."
                className="min-h-[100px]"
              />
            </FormControl>
            <FormDescription>
              Proporciona información detallada para que la IA pueda generar el mejor contenido posible
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="keepNexoStyles"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Mantener los estilos de diseño de Nexo
              </FormLabel>
              <FormDescription>
                El contenido generado seguirá los patrones visuales de la plataforma
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
        name="meta_description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descripción SEO (opcional)</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Descripción para motores de búsqueda"
                className="min-h-[60px]"
              />
            </FormControl>
            <FormDescription>
              Si no se proporciona, la IA generará una automáticamente
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PageContentContext;
