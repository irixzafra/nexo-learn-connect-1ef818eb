
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { createPage, isSlugUnique } from '@/features/admin/services/pagesService';
import { PageLayout, PageStatus, SitePage } from '@/types/pages';

export interface CreatePageFormData {
  title: string;
  slug: string;
  pageType: string;
  context: string;
  keepNexoStyles: boolean;
  meta_description?: string;
  layout: PageLayout;
  status: PageStatus;
}

export const useCreatePageForm = () => {
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
    toast.info('Regenerando contenido...');
    // Implementation of regeneration would go here
  };

  const handleContentGenerated = (content: any) => {
    setGeneratedContent(content);
    // Also set meta description if available
    if (content && content.description) {
      form.setValue('meta_description', content.description);
    }
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

  return {
    form,
    isSubmitting,
    generatedContent,
    handleTitleChange,
    handleRegenerateContent,
    handleContentGenerated,
    onSubmit,
    navigate
  };
};
