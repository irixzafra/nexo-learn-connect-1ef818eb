
import React, { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface PageSeoEditorProps {
  form: UseFormReturn<any>;
}

const PageSeoEditor: React.FC<PageSeoEditorProps> = ({ form }) => {
  const [showTips, setShowTips] = useState(true);
  
  const title = form.watch('title') || '';
  const metaDescription = form.watch('meta_description') || '';
  const slug = form.watch('slug') || '';
  
  const titleLength = title.length;
  const metaDescriptionLength = metaDescription.length;
  const isTitleOptimal = titleLength >= 30 && titleLength <= 60;
  const isMetaDescriptionOptimal = metaDescriptionLength >= 120 && metaDescriptionLength <= 155;
  const isSlugOptimal = /^[a-z0-9-]+$/.test(slug) && slug.includes('-') && slug.length > 3;
  
  return (
    <Form {...form}>
      <div className="space-y-6">
        {showTips && (
          <Alert variant="default" className="bg-primary/5 border-primary/20">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle>Consejos para SEO</AlertTitle>
            <AlertDescription className="text-sm mt-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>Utiliza títulos descriptivos entre 30-60 caracteres</li>
                <li>Escribe meta descripciones entre 120-155 caracteres</li>
                <li>Crea URLs amigables con palabras clave separadas por guiones</li>
                <li>Incluye palabras clave relevantes en todos los campos</li>
              </ul>
            </AlertDescription>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2"
              onClick={() => setShowTips(false)}
            >
              Ocultar consejos
            </Button>
          </Alert>
        )}
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título SEO</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Título para SEO" />
                  </FormControl>
                  <FormDescription className="flex justify-between">
                    <span>Aparecerá en los resultados de búsqueda</span>
                    <span className={`${isTitleOptimal ? 'text-green-500' : 'text-amber-500'}`}>
                      {titleLength}/60
                    </span>
                  </FormDescription>
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
                  <FormDescription className="flex justify-between">
                    <span>Descripción que aparecerá en los resultados</span>
                    <span className={`${isMetaDescriptionOptimal ? 'text-green-500' : 'text-amber-500'}`}>
                      {metaDescriptionLength}/155
                    </span>
                  </FormDescription>
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
                  <FormDescription>
                    Solo letras minúsculas, números y guiones (-)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Vista previa en Google</CardTitle>
                <CardDescription>
                  Así podría verse tu página en los resultados de búsqueda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-4 bg-white dark:bg-slate-900">
                  <div className="text-blue-600 dark:text-blue-400 text-xl truncate">
                    {title || 'Título de la página'}
                  </div>
                  <div className="text-green-700 dark:text-green-500 text-sm truncate">
                    https://tusitio.com/{slug || 'url-de-la-pagina'}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-3">
                    {metaDescription || 'Meta descripción de la página que aparecerá en los resultados de búsqueda. Añade una descripción clara y concisa para mejorar el CTR.'}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-medium">Verificación SEO</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isTitleOptimal ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {isTitleOptimal ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                  </div>
                  <span className="ml-2 text-sm">
                    {isTitleOptimal ? 'Título óptimo' : 'Título debería tener entre 30-60 caracteres'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isMetaDescriptionOptimal ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {isMetaDescriptionOptimal ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                  </div>
                  <span className="ml-2 text-sm">
                    {isMetaDescriptionOptimal ? 'Meta descripción óptima' : 'Meta descripción debería tener entre 120-155 caracteres'}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isSlugOptimal ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {isSlugOptimal ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                  </div>
                  <span className="ml-2 text-sm">
                    {isSlugOptimal ? 'URL amigable' : 'URL debería usar palabras clave separadas por guiones'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default PageSeoEditor;
