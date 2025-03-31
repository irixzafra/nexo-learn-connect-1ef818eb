
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import PageForm from '@/components/admin/pages/PageForm';
import { getPageBySlug, updatePage } from '@/services/pagesService';
import { SitePage } from '@/types/pages';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<SitePage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPage = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        // For the edit page, we get the page by ID rather than slug
        const { data, error } = await supabase
          .from('site_pages')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setPage(data);
      } catch (error) {
        console.error('Error fetching page:', error);
        toast.error('Error al cargar la página');
        navigate('/admin/settings/pages');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage();
  }, [id, navigate]);

  const handleSubmit = async (formData: any) => {
    if (!id || !page) return;
    
    setIsSubmitting(true);
    try {
      const updatedPage = await updatePage(id, formData);
      toast.success(`Página "${updatedPage.title}" actualizada correctamente`);
      navigate('/admin/settings/pages');
    } catch (error) {
      console.error('Error updating page:', error);
      toast.error('Error al actualizar la página');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <AdminPageLayout
        title="Editar Página"
        subtitle="Cargando información de la página..."
        backLink="/admin/settings/pages"
      >
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminPageLayout>
    );
  }

  if (!page) {
    return (
      <AdminPageLayout
        title="Error"
        subtitle="La página no fue encontrada"
        backLink="/admin/settings/pages"
      >
        <div className="p-4 text-center">
          No se encontró la página solicitada.
        </div>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title={`Editar Página: ${page.title}`}
      subtitle="Modifica los detalles de la página"
      backLink="/admin/settings/pages"
    >
      <PageForm 
        initialData={page} 
        onSubmit={handleSubmit} 
        isLoading={isSubmitting} 
      />
    </AdminPageLayout>
  );
};

export default EditPage;
