
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getPageBySlug } from '@/services/pagesService';
import { SitePage } from '@/types/pages';
import { Loader2 } from 'lucide-react';
import PublicLayout from '@/layouts/PublicLayout';
import NotFound from '@/pages/NotFound';

const DynamicPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<SitePage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      try {
        const pageData = await getPageBySlug(slug);
        
        if (!pageData || pageData.status !== 'published') {
          setNotFound(true);
          return;
        }
        
        setPage(pageData);
      } catch (error) {
        console.error('Error fetching page:', error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (notFound) {
    return <NotFound />;
  }

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PublicLayout>
    );
  }

  if (!page) {
    return <NotFound />;
  }

  // Redirect system pages to their proper route
  if (page.is_system_page && page.slug !== slug) {
    return <Navigate to={`/${page.slug}`} replace />;
  }

  // Choose layout based on page.layout
  let content = (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
      <div className="prose max-w-none">
        {/* Render content based on its structure */}
        {page.content && page.content.blocks && page.content.blocks.map((block: any, index: number) => (
          <div key={index} className="mb-6">
            {block.type === 'text' && <p>{block.content}</p>}
            {block.type === 'hero' && (
              <div className="bg-primary/10 p-8 rounded-lg text-center mb-8">
                <h2 className="text-2xl font-bold">{block.content}</h2>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Siempre usamos el PublicLayout para páginas dinámicas
  return (
    <PublicLayout>
      {content}
    </PublicLayout>
  );
};

export default DynamicPage;
