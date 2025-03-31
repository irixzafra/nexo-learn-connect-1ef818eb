import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PageStatus, PageLayout, SitePage } from '@/types/pages';
import { Loader2 } from 'lucide-react';
import { isSlugUnique } from '@/services/pagesService';

// Schema definition for form validation, only using the exact layout values from the type
const pageFormSchema = z.object({
  title: z.string().min(3, {
    message: 'El título debe tener al menos 3 caracteres',
  }),
  slug: z.string().min(2, {
    message: 'El slug debe tener al menos 2 caracteres',
  }).regex(/^[a-z0-9-]+$/, {
    message: 'El slug solo puede contener letras minúsculas, números y guiones',
  }),
  meta_description: z.string().max(160, {
    message: 'La meta descripción no debe exceder los 160 caracteres',
  }).optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'archived'] as const),
  layout: z.enum(['default', 'landing', 'marketing', 'documentation', 'course', 'sidebar', 'full-width'] as const),
  content: z.any(), // For now, we'll use a simple textarea
});

type PageFormValues = z.infer<typeof pageFormSchema>;

interface PageFormProps {
  initialData?: SitePage;
  onSubmit: (data: PageFormValues) => void;
  isLoading: boolean;
}

const PageForm: React.FC<PageFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  
  // We need to ensure the layout is one of the valid values in our schema
  const getSafeLayout = (layout?: string): PageLayout => {
    const validLayouts: PageLayout[] = ['default', 'landing', 'marketing', 'documentation', 'course', 'sidebar', 'full-width'];
    return layout && validLayouts.includes(layout as PageLayout) 
      ? layout as PageLayout 
      : 'default';
  };

  const defaultValues: PageFormValues = {
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    meta_description: initialData?.meta_description || '',
    status: initialData?.status || 'draft',
    layout: getSafeLayout(initialData?.layout),
    content: initialData?.content || '',
  };

  const form = useForm<PageFormValues>({
    resolver: zodResolver(pageFormSchema),
    defaultValues,
  });

  // Effect to update form when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        slug: initialData.slug,
        meta_description: initialData.meta_description || '',
        status: initialData.status,
        layout: getSafeLayout(initialData.layout),
        content: initialData.content,
      });
    }
  }, [initialData, form]);

  // Autogenerate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  // Validate slug uniqueness when it changes
  const validateSlugUniqueness = async (slug: string) => {
    if (!slug) return true;
    
    try {
      setIsCheckingSlug(true);
      return await isSlugUnique(slug, initialData?.id);
    } catch (error) {
      console.error('Error checking slug uniqueness:', error);
      return false;
    } finally {
      setIsCheckingSlug(false);
    }
  };

  // Handler for form submission
  const handleSubmit = form.handleSubmit(async (values) => {
    onSubmit(values);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Título de la página" 
                    onChange={(e) => {
                      field.onChange(e);
                      // Only auto-generate slug if it's empty or if we're creating a new page
                      if (!initialData && !form.getValues('slug')) {
                        form.setValue('slug', generateSlug(e.target.value));
                      }
                    }}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Slug field */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Slug 
                  {isCheckingSlug && (
                    <Loader2 className="inline ml-2 h-4 w-4 animate-spin" />
                  )}
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="slug-de-la-pagina" 
                    className="font-mono text-sm"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Meta Description */}
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
                  className="resize-none h-20"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content - for now just a textarea */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenido</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  value={typeof field.value === 'object' ? JSON.stringify(field.value, null, 2) : field.value}
                  onChange={(e) => {
                    try {
                      // Try to parse as JSON if it looks like JSON
                      if (e.target.value.trim().startsWith('{')) {
                        field.onChange(JSON.parse(e.target.value));
                      } else {
                        field.onChange(e.target.value);
                      }
                    } catch {
                      // If not valid JSON, just store as string
                      field.onChange(e.target.value);
                    }
                  }}
                  placeholder="Contenido de la página (JSON o texto)" 
                  className="resize-none h-32 font-mono text-sm"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status select */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={isLoading}
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
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Layout select - ensuring all options match the schema */}
          <FormField
            control={form.control}
            name="layout"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diseño</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={isLoading}
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
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit button */}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : initialData ? 'Actualizar Página' : 'Crear Página'}
        </Button>
      </form>
    </Form>
  );
};

export default PageForm;
