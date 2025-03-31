
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getPageById, updatePage, isSlugUnique } from '@/features/admin/services/pagesService';
import { PageLayout, PageStatus, SitePage } from '@/types/pages';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface EditPageFormData {
  title: string;
  slug: string;
  meta_description: string;
  layout: PageLayout;
  status: PageStatus;
}

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<SitePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<EditPageFormData>({
    defaultValues: {
      title: '',
      slug: '',
      meta_description: '',
      layout: 'default',
      status: 'draft'
    }
  });

  useEffect(() => {
    if (!id) {
      navigate('/admin/settings/pages');
      return;
    }

    const fetchPage = async () => {
      try {
        setLoading(true);
        const pageData = await getPageById(id);
        if (!pageData) {
          toast.error('Página no encontrada');
          navigate('/admin/settings/pages');
          return;
        }
        
        setPage(pageData);
        form.reset({
          title: pageData.title,
          slug: pageData.slug,
          meta_description: pageData.meta_description || '',
          layout: pageData.layout,
          status: pageData.status,
        });
      } catch (error) {
        console.error('Error fetching page:', error);
        toast.error('Error al cargar la página');
        navigate('/admin/settings/pages');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [id, navigate, form]);

  const onSubmit = async (data: EditPageFormData) => {
    if (!id || !page) return;

    try {
      setIsSubmitting(true);
      
      // Check if slug is unique (only if it changed)
      if (data.slug !== page.slug) {
        const slugIsUnique = await isSlugUnique(data.slug, id);
        if (!slugIsUnique) {
          form.setError('slug', { 
            type: 'manual', 
            message: 'Esta URL ya está en uso, por favor elige otra diferente' 
          });
          setIsSubmitting(false);
          return;
        }
      }
      
      // Update page
      await updatePage(id, data);
      toast.success('Página actualizada con éxito');
      navigate('/admin/settings/pages');
    } catch (error) {
      console.error('Error updating page:', error);
      toast.error('Error al actualizar la página');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-32" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => navigate('/admin/settings/pages')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver a páginas
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Editar Página</CardTitle>
          <CardDescription>
            Actualiza los detalles de la página
            {page?.is_system_page && (
              <span className="ml-2 text-amber-500 font-medium">
                (Página del sistema)
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                rules={{ required: 'El título es obligatorio' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Título de la página"
                      />
                    </FormControl>
                    <FormDescription>
                      El título visible de la página
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="slug"
                rules={{ 
                  required: 'La URL es obligatoria',
                  pattern: {
                    value: /^[a-z0-9-]+$/,
                    message: 'Solo letras minúsculas, números y guiones'
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL / Slug</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <div className="flex-shrink-0 text-muted-foreground">/</div>
                        <Input 
                          {...field} 
                          placeholder="url-de-la-pagina"
                          disabled={page?.is_system_page}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      {page?.is_system_page 
                        ? 'Las URLs de páginas del sistema no se pueden modificar'
                        : 'URL amigable para acceder a la página'}
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
                    <FormLabel>Descripción para SEO</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Descripción breve para motores de búsqueda"
                      />
                    </FormControl>
                    <FormDescription>
                      Aparecerá en los resultados de búsqueda (máx. 160 caracteres)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="layout"
                  rules={{ required: 'El layout es obligatorio' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Layout</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un layout" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="default">Por defecto</SelectItem>
                          <SelectItem value="landing">Landing Page</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="documentation">Documentación</SelectItem>
                          <SelectItem value="course">Curso</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Estructura y diseño de la página
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  rules={{ required: 'El estado es obligatorio' }}
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
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/settings/pages')}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Guardar Cambios
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default EditPage;
