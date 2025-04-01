
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Code, Search, FileText, Eye } from 'lucide-react';
import { SitePage, PageLayout } from '@/types/pages';
import { getPageById, updatePage, isSlugUnique } from '@/features/admin/services/pagesService';
import PageContentEditor from './PageContentEditor';
import PageSeoEditor from './PageSeoEditor';
import PagePreview from './PagePreview';

interface PageEditorProps {
  pageId?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onPageUpdated: () => void;
}

const formSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  slug: z.string().min(2, 'El slug debe tener al menos 2 caracteres')
    .regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  meta_description: z.string().max(160, 'La meta descripción no debe exceder los 160 caracteres').optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'archived', 'scheduled'] as const),
  layout: z.enum([
    'default', 
    'landing', 
    'marketing', 
    'documentation', 
    'course', 
    'sidebar', 
    'full-width',
    'column',
    'row',
    'grid-2',
    'grid-3',
    'grid-4'
  ] as const),
  content: z.any(),
});

type FormValues = z.infer<typeof formSchema>;

const PageEditorDialog: React.FC<PageEditorProps> = ({ 
  pageId, 
  isOpen, 
  onOpenChange,
  onPageUpdated
}) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState<SitePage | null>(null);
  const [activeTab, setActiveTab] = useState('content');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      meta_description: '',
      status: 'draft',
      layout: 'default' as PageLayout,
      content: { blocks: [] },
    }
  });

  useEffect(() => {
    if (isOpen && pageId) {
      setLoading(true);
      getPageById(pageId)
        .then(data => {
          if (data) {
            setPage(data);
            form.reset({
              title: data.title,
              slug: data.slug,
              meta_description: data.meta_description || '',
              status: data.status,
              layout: data.layout as PageLayout,
              content: data.content || { blocks: [] },
            });
          }
        })
        .catch(error => {
          console.error('Error fetching page:', error);
          toast.error('Error al cargar la página');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [pageId, isOpen, form]);

  const handleSubmit = async (data: FormValues) => {
    if (!pageId || !page) return;

    try {
      setSaving(true);
      
      // Check if slug is unique (only if changed)
      if (data.slug !== page.slug) {
        const slugIsUnique = await isSlugUnique(data.slug, pageId);
        if (!slugIsUnique) {
          form.setError('slug', { 
            type: 'manual', 
            message: 'Esta URL ya está en uso' 
          });
          setSaving(false);
          return;
        }
      }
      
      await updatePage(pageId, data);
      toast.success('Página actualizada con éxito');
      onPageUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating page:', error);
      toast.error('Error al actualizar la página');
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[900px] h-screen overflow-y-auto" side="right">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Cargando página...</span>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <SheetHeader className="pb-6">
              <SheetTitle className="text-2xl">
                Editar: {page?.title || 'Página'}
              </SheetTitle>
              <SheetDescription>
                Realiza cambios rápidos sin salir de la vista principal
              </SheetDescription>
            </SheetHeader>

            <Tabs 
              defaultValue="content" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full mb-6">
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Contenido</span>
                </TabsTrigger>
                <TabsTrigger value="seo" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <span>SEO</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  <span>Código</span>
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>Vista previa</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="mt-0">
                <PageContentEditor form={form} />
              </TabsContent>

              <TabsContent value="seo" className="mt-0">
                <PageSeoEditor form={form} />
              </TabsContent>

              <TabsContent value="code" className="mt-0">
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <pre className="p-4 text-sm overflow-auto bg-muted h-96">
                      {JSON.stringify(form.watch(), null, 2)}
                    </pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="mt-0">
                <PagePreview page={{
                  title: form.watch('title') || '',
                  content: form.watch('content'),
                  meta_description: form.watch('meta_description'),
                  layout: form.watch('layout')
                }} />
              </TabsContent>
            </Tabs>

            <SheetFooter className="pt-6 mt-6 border-t flex justify-between">
              <Button variant="outline" onClick={handleClose} type="button">
                Cancelar
              </Button>
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Guardar cambios
              </Button>
            </SheetFooter>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default PageEditorDialog;
