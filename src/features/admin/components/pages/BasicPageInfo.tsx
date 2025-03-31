
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { CreatePageFormData } from '@/features/admin/hooks/useCreatePageForm';

interface BasicPageInfoProps {
  form: UseFormReturn<CreatePageFormData>;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicPageInfo: React.FC<BasicPageInfoProps> = ({ form, handleTitleChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="title"
        rules={{ required: 'El título es obligatorio' }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título de la página</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                placeholder="Ej: Servicios Premium"
                onChange={handleTitleChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL / Slug (opcional)</FormLabel>
            <FormControl>
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0 text-muted-foreground">/</div>
                <Input 
                  {...field} 
                  placeholder="Generado automáticamente"
                />
              </div>
            </FormControl>
            <FormDescription>
              Si se deja vacío, se generará automáticamente desde el título
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicPageInfo;
