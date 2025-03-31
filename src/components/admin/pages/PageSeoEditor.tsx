
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface PageSeoEditorProps {
  form: UseFormReturn<any>;
}

const PageSeoEditor: React.FC<PageSeoEditorProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="meta_description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Meta Descripción</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Descripción para motores de búsqueda (SEO)" 
                className="resize-none h-32"
              />
            </FormControl>
            <FormDescription>
              Una buena meta descripción mejora el posicionamiento. Máximo 160 caracteres.
              {field.value && (
                <div className="mt-2">
                  <span className={`text-xs ${field.value.length > 160 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {field.value.length}/160 caracteres
                  </span>
                </div>
              )}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="rounded-md border p-4 bg-muted/30">
        <h3 className="font-medium mb-2">Vista previa en Google</h3>
        <div className="p-4 bg-white rounded border">
          <div className="text-blue-600 text-lg truncate">
            {form.watch('title') || 'Título de la página'}
          </div>
          <div className="text-green-700 text-sm">
            https://tudominio.com/{form.watch('slug') || 'pagina'}
          </div>
          <div className="text-sm text-gray-700 mt-1 line-clamp-2">
            {form.watch('meta_description') || 'Esta página no tiene meta descripción. Añade una para mejorar SEO.'}
          </div>
        </div>
      </div>
      
      <div className="rounded-md border p-4 bg-muted/30">
        <h3 className="font-medium mb-2">Sugerencias SEO</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs mr-2 flex-shrink-0">✓</span>
            <span>Tu URL es corta y descriptiva</span>
          </li>
          <li className="flex items-start">
            <span className={`w-5 h-5 rounded-full ${form.watch('meta_description') ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'} flex items-center justify-center text-xs mr-2 flex-shrink-0`}>
              {form.watch('meta_description') ? '✓' : '!'}
            </span>
            <span>{form.watch('meta_description') ? 'Tienes una meta descripción' : 'Añade una meta descripción'}</span>
          </li>
          <li className="flex items-start">
            <span className={`w-5 h-5 rounded-full ${form.watch('title')?.length > 3 ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'} flex items-center justify-center text-xs mr-2 flex-shrink-0`}>
              {form.watch('title')?.length > 3 ? '✓' : '!'}
            </span>
            <span>{form.watch('title')?.length > 3 ? 'Tu título es descriptivo' : 'Asegúrate de tener un título descriptivo'}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PageSeoEditor;
