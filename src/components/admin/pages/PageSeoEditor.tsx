
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface PageSeoEditorProps {
  form: UseFormReturn<any>;
}

const PageSeoEditor: React.FC<PageSeoEditorProps> = ({ form }) => {
  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título SEO</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Título para SEO" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="meta_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Descripción</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Descripción para motores de búsqueda"
                  className="min-h-24 resize-none"
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
              <FormLabel>Slug / URL</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <span className="text-muted-foreground mr-1">/</span>
                  <Input {...field} placeholder="url-de-la-pagina" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export default PageSeoEditor;
