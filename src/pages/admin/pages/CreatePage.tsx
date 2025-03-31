
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
import { ArrowLeft, Loader2, Wand2, RefreshCw, PaintBucket, LayoutGrid } from 'lucide-react';
import AIPageCreator from '@/components/admin/pages/AIPageCreator';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface CreatePageFormData {
  title: string;
  slug: string;
  pageType: string;
  context: string;
  keepNexoStyles: boolean;
  meta_description?: string;
  layout: PageLayout;
  status: PageStatus;
}

const PAGE_TYPES = [
  { value: 'landing', label: 'Landing Page', icon: <LayoutGrid className="h-4 w-4" /> },
  { value: 'blog', label: 'Entrada de Blog', icon: <PaintBucket className="h-4 w-4" /> },
  { value: 'about', label: 'Página Acerca De', icon: <PaintBucket className="h-4 w-4" /> },
  { value: 'service', label: 'Página de Servicio', icon: <PaintBucket className="h-4 w-4" /> },
  { value: 'contact', label: 'Página de Contacto', icon: <PaintBucket className="h-4 w-4" /> },
  { value: 'faq', label: 'Preguntas Frecuentes', icon: <PaintBucket className="h-4 w-4" /> },
  { value: 'product', label: 'Página de Producto', icon: <PaintBucket className="h-4 w-4" /> },
  { value: 'custom', label: 'Personalizado', icon: <PaintBucket className="h-4 w-4" /> },
];

const CreatePage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const form = useForm<CreatePageFormData>({
    defaultValues: {
      title: '',
      slug: '',
      pageType: 'landing',
      context: '',
      keepNexoStyles: true,
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

  const handleRegenerateContent = async () => {
    // This would trigger the AI content generator to create new content
    toast.info('Regenerando contenido...');
    // Implementación de regeneración
  };

  const onSubmit = async (data: CreatePageFormData) => {
    if (!user?.id) {
      toast.error('Debes iniciar sesión para crear una página');
      return;
    }

    if (!data.title) {
      toast.error('El título es obligatorio');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // If slug is empty, generate from title
      if (!data.slug) {
        data.slug = generateSlugFromTitle(data.title);
      }
      
      // Check if slug is unique
      const slugIsUnique = await isSlugUnique(data.slug);
      if (!slugIsUnique) {
        form.setError('slug', { 
          type: 'manual', 
          message: 'Esta URL ya está en uso, por favor elige otra diferente' 
        });
        setIsSubmitting(false);
        return;
      }
      
      // Map form data to page structure
      const layoutValue = data.pageType === 'landing' ? 'landing' : 
                        data.pageType === 'blog' ? 'documentation' : 'default';
      
      // Create initial page structure with AI-generated content
      const newPage: Omit<SitePage, 'id' | 'created_at' | 'updated_at'> = {
        title: data.title,
        slug: data.slug,
        meta_description: data.meta_description || `Página ${data.title}`,
        content: generatedContent || { blocks: [] }, // Use AI-generated content
        layout: layoutValue as PageLayout,
        status: 'draft',
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

  const handleContentGenerated = (content: any) => {
    setGeneratedContent(content);
    // También podemos usar esto para establecer automáticamente la descripción meta
    if (content && content.description) {
      form.setValue('meta_description', content.description);
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
          <CardTitle className="text-2xl">Crear Nueva Página con IA</CardTitle>
          <CardDescription>
            Nuestro asistente de IA te ayudará a crear una página atractiva según tus necesidades
          </CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
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
              
              <FormField
                control={form.control}
                name="pageType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de página</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        {PAGE_TYPES.map((type) => (
                          <FormItem key={type.value} className="flex flex-col items-center space-y-3">
                            <FormControl>
                              <div>
                                <RadioGroupItem
                                  value={type.value}
                                  id={`pageType-${type.value}`}
                                  className="peer sr-only"
                                />
                                <label
                                  htmlFor={`pageType-${type.value}`}
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  {type.icon}
                                  <div className="mt-2 font-medium">{type.label}</div>
                                </label>
                              </div>
                            </FormControl>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      Selecciona el tipo de página que deseas crear
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
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
              
              {/* Vista previa del contenido generado */}
              <AIPageCreator 
                formData={form.getValues()} 
                onContentGenerated={handleContentGenerated}
              />
              
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/settings/pages')}
                >
                  Cancelar
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRegenerateContent}
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Regenerar
                </Button>
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                Crear Página
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreatePage;
