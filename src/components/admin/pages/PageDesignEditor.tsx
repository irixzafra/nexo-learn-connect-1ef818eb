
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PageLayout, PageStatus } from '@/types/pages';

interface PageDesignEditorProps {
  form: UseFormReturn<any>;
}

const PageDesignEditor: React.FC<PageDesignEditorProps> = ({ form }) => {
  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="layout"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Diseño de Página</FormLabel>
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
                  <SelectItem value="default">Por defecto</SelectItem>
                  <SelectItem value="landing">Landing Page</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="documentation">Documentación</SelectItem>
                  <SelectItem value="course">Curso</SelectItem>
                  <SelectItem value="sidebar">Con Sidebar</SelectItem>
                  <SelectItem value="full-width">Ancho Completo</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Determina cómo se estructurará visualmente la página
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
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
                  <SelectItem value="published">Publicada</SelectItem>
                  <SelectItem value="archived">Archivada</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Solo las páginas publicadas serán visibles para el público
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export default PageDesignEditor;
