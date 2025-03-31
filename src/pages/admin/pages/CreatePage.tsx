
import React, { useState } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import PageForm from '@/components/admin/pages/PageForm';
import { createPage } from '@/services/pagesService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CreatePage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const newPage = await createPage({
        ...formData,
        is_system_page: false,
      });
      
      toast.success(`Página "${newPage.title}" creada correctamente`);
      navigate('/admin/settings/pages');
    } catch (error) {
      console.error('Error creating page:', error);
      toast.error('Error al crear la página');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminPageLayout
      title="Crear Página"
      subtitle="Añade una nueva página al sitio"
      backLink="/admin/settings/pages"
    >
      <PageForm onSubmit={handleSubmit} isLoading={isSubmitting} />
    </AdminPageLayout>
  );
};

export default CreatePage;
