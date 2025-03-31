
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SitePage } from '@/types/pages';
import { Loader2 } from 'lucide-react';

// Import the page service
const getPageBySlug = async (slug: string): Promise<SitePage | null> => {
  // This is a placeholder - in a real app, this would fetch from an API
  // For now, we'll just simulate a delay and return some dummy data
  return new Promise((resolve) => {
    setTimeout(() => {
      if (slug === 'home') {
        resolve({
          id: '1',
          title: 'Home Page',
          slug: 'home',
          content: { blocks: [] },
          status: 'published',
          layout: 'default',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_system_page: true
        });
      } else {
        resolve(null);
      }
    }, 500);
  });
};

const PageRenderer: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<SitePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const pageSlug = slug || 'home'; // Default to home if no slug
        const pageData = await getPageBySlug(pageSlug);
        
        if (pageData) {
          setPage(pageData);
          setError(null);
        } else {
          setError(`Página '${pageSlug}' no encontrada`);
          setPage(null);
        }
      } catch (err) {
        console.error('Error fetching page:', err);
        setError('Error al cargar la página');
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Cargando página...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">{error}</h1>
        <p className="text-muted-foreground">
          La página que estás buscando no existe o no está disponible.
        </p>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Página no encontrada</h1>
        <p className="text-muted-foreground">
          No se pudo encontrar la página solicitada.
        </p>
      </div>
    );
  }

  // Basic layout renderer based on page layout type
  const renderPageContent = () => {
    const content = page.content?.blocks || [];
    
    return (
      <div className="page-content py-8">
        {content.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <p>Esta página no tiene contenido.</p>
          </div>
        ) : (
          <div className="blocks-container space-y-8">
            {content.map((block, index) => (
              <div key={block.id || index} className="block">
                {/* We would render different block types differently */}
                <pre className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
                  {JSON.stringify(block, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`page-container page-layout-${page.layout}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
        {renderPageContent()}
      </div>
    </div>
  );
};

export default PageRenderer;
