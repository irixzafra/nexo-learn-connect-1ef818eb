
import React, { useState, useEffect } from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { getAllPages } from '@/services/pagesService';
import PageList from '@/components/admin/pages/PageList';
import { SitePage } from '@/types/pages';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const PageManagement: React.FC = () => {
  const [pages, setPages] = useState<SitePage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPages = async () => {
    setIsLoading(true);
    try {
      const data = await getAllPages();
      setPages(data);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast.error('Error al cargar las páginas');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleCreatePage = () => {
    navigate('/admin/settings/pages/create');
  };

  return (
    <AdminPageLayout
      title="Gestión de Páginas"
      subtitle="Administra las páginas del sitio"
      actions={
        <Button onClick={handleCreatePage}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Página
        </Button>
      }
    >
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <PageList pages={pages} onPageUpdated={fetchPages} />
      )}
    </AdminPageLayout>
  );
};

export default PageManagement;
