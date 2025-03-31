
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useAuth } from '@/contexts/AuthContext';
import { createPage, isSlugUnique } from '@/features/admin/services/pagesService';
import { PageLayout, PageStatus, SitePage } from '@/types/pages'; 
import { ArrowLeft, Loader2, Wand2 } from 'lucide-react';
import PageAIContentGenerator from '@/components/admin/pages/PageAIContentGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CreatePageFormData {
  title: string;
  slug: string;
  meta_description: string;
  layout: PageLayout;
  status: PageStatus;
}

const CreatePage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const form = useForm<CreatePageFormData>({
    defaultValues: {
      title: '',
      slug: '',
      meta_description: '',
      layout: 'default',
      status: 'draft'
    }
  });

  const generateSlugFromTitle = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue('title', title);
    
    // Only auto-generate slug if user hasn't manually edited it
    if (!form.getValues('slug') || form.getValues('slug') === generateSlugFromTitle(form.getValues('title'))) {
      form.setValue('slug', generateSlugFromTitle(title));
    }
  };

  const onSubmit = async (data: CreatePageFormData) => {
    if (!user?.id) {
      toast.error('Debes iniciar sesión para crear una página');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Check if slug is unique
      const slugIsUnique = await isSlugUnique(data.slug);
      if (!slugIsUnique) {
        form.setError('slug', { 
          type: 'manual', 
          message: 'Esta URL ya está en uso, por favor elige otra diferente' 
        });
        return;
      }
      
      // Create initial empty content structure
      const newPage: Omit<SitePage, 'id' | 'created_at' | 'updated_at'> = {
        ...data,
        content: {
          blocks: []
        },
        created_by: user.id,
        is_system_page: false
      };
      
      await createPage(newPage);
      toast.success('Página creada con éxito');
      navigate('/admin/settings/pages');
    } catch (error) {
      console.error('Error creating page:', error);
      toast.error('Error al crear la página');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <CardTitle className="text-2xl">Crear Nueva Página</CardTitle>
          <CardDescription>
            Crea una nueva página para tu sitio web
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mx-6">
            <TabsTrigger value="basic">Información básica</TabsTrigger>
            <TabsTrigger value="ai-assist" className="flex items-center gap-2">
              <Wand2 className="h-4 w-4" />
              Asistente IA
            </TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <TabsContent value="basic">
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
                            onChange={handleTitleChange}
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
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          URL amigable para acceder a la página
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
              </TabsContent>
              
              <TabsContent value="ai-assist">
                <CardContent>
                  <PageAIContentGenerator form={form} />
                </CardContent>
              </TabsContent>
              
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
                  Crear Página
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Tabs>
      </Card>
    </div>
  );
};

export default CreatePage;
