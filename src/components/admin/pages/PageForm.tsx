
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SitePage, PageStatus, PageLayout } from '@/types/pages';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isSlugUnique } from '@/services/pagesService';
import { toast } from 'sonner';

const pageSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  slug: z.string().min(1, 'El slug es obligatorio').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  meta_description: z.string().optional(),
  layout: z.enum(['default', 'landing', 'sidebar', 'full-width']),
  status: z.enum(['draft', 'published', 'archived']),
  content: z.any().optional(),
});

type PageFormData = z.infer<typeof pageSchema>;

interface PageFormProps {
  initialData?: SitePage;
  onSubmit: (data: PageFormData) => Promise<void>;
  isLoading?: boolean;
}

const PageForm: React.FC<PageFormProps> = ({ initialData, onSubmit, isLoading = false }) => {
  const { user } = useAuth();
  const [isSlugValid, setIsSlugValid] = useState(true);
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  
  const defaultValues: PageFormData = {
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    meta_description: initialData?.meta_description || '',
    layout: initialData?.layout || 'default',
    status: initialData?.status || 'draft',
    content: initialData?.content || { blocks: [] },
  };

  const { register, handleSubmit, watch, setValue, formState: { errors, isDirty } } = useForm<PageFormData>({
    resolver: zodResolver(pageSchema),
    defaultValues,
  });

  const watchTitle = watch('title');
  const watchSlug = watch('slug');

  // Generate slug from title
  useEffect(() => {
    if (!initialData && watchTitle && !watchSlug) {
      const generatedSlug = watchTitle
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      setValue('slug', generatedSlug);
    }
  }, [watchTitle, watchSlug, initialData, setValue]);

  // Check slug uniqueness
  useEffect(() => {
    const checkSlug = async () => {
      if (watchSlug) {
        setIsCheckingSlug(true);
        try {
          const isUnique = await isSlugUnique(watchSlug, initialData?.id);
          setIsSlugValid(isUnique);
        } catch (error) {
          console.error('Error checking slug uniqueness:', error);
          toast.error('Error al verificar disponibilidad del slug');
        } finally {
          setIsCheckingSlug(false);
        }
      }
    };

    const debounceTimer = setTimeout(checkSlug, 500);
    return () => clearTimeout(debounceTimer);
  }, [watchSlug, initialData?.id]);

  const handleFormSubmit = async (data: PageFormData) => {
    if (!isSlugValid) {
      toast.error('El slug ya está en uso. Por favor, elige otro.');
      return;
    }

    try {
      // Add the current user as creator if it's a new page
      if (!initialData && user) {
        data.created_by = user.id;
      }
      
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error al guardar la página');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input 
                  id="title" 
                  placeholder="Título de la página" 
                  {...register('title')} 
                  error={errors.title?.message}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">
                  Slug
                  {isCheckingSlug && <span className="ml-2 text-xs text-muted-foreground">(Verificando...)</span>}
                  {!isSlugValid && !isCheckingSlug && (
                    <span className="ml-2 text-xs text-red-500">(Ya en uso)</span>
                  )}
                </Label>
                <Input 
                  id="slug" 
                  placeholder="url-amigable" 
                  {...register('slug')} 
                  error={errors.slug?.message}
                  className={!isSlugValid ? 'border-red-500' : ''}
                />
                {errors.slug && (
                  <p className="text-sm text-red-500">{errors.slug.message}</p>
                )}
                {!isSlugValid && !isCheckingSlug && (
                  <p className="text-sm text-red-500">Este slug ya está en uso</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta descripción</Label>
              <Textarea 
                id="meta_description" 
                placeholder="Breve descripción para SEO" 
                {...register('meta_description')} 
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="layout">Layout</Label>
                <Select 
                  onValueChange={(value: PageLayout) => setValue('layout', value)} 
                  defaultValue={defaultValues.layout}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Por defecto</SelectItem>
                    <SelectItem value="landing">Landing</SelectItem>
                    <SelectItem value="sidebar">Con sidebar</SelectItem>
                    <SelectItem value="full-width">Ancho completo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select 
                  onValueChange={(value: PageStatus) => setValue('status', value)} 
                  defaultValue={defaultValues.status}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Borrador</SelectItem>
                    <SelectItem value="published">Publicada</SelectItem>
                    <SelectItem value="archived">Archivada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                disabled={isLoading || !isDirty || !isSlugValid || isCheckingSlug}
                className="mr-2"
              >
                {isLoading ? 'Guardando...' : 'Guardar página'}
              </Button>
              <Button type="button" variant="outline" onClick={() => window.history.back()}>
                Cancelar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default PageForm;
