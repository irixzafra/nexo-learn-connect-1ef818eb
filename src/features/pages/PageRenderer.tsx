
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SitePage, PageBlock, PageBlockType } from '@/types/pages';
import { Loader2 } from 'lucide-react';
import { useEditMode } from '@/contexts/EditModeContext';

const getPageBySlug = async (slug: string): Promise<SitePage | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (slug === 'home') {
        resolve({
          id: '1',
          title: 'Home Page',
          slug: 'home',
          content: { 
            blocks: [
              { id: 'block-1', type: 'text', content: 'Welcome to our platform!' },
              { id: 'block-2', type: 'hero', content: 'Learn and Grow With Us' }
            ],
            layout: 'default' 
          },
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
        const pageSlug = slug || 'home';
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
      <section className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          {error}
        </h1>
        <p className="text-muted-foreground">
          La página que estás buscando no existe o no está disponible.
        </p>
      </section>
    );
  }

  if (!page) {
    return (
      <section className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Página no encontrada
        </h1>
        <p className="text-muted-foreground">
          No se pudo encontrar la página solicitada.
        </p>
      </section>
    );
  }

  return (
    <div className={`page-container page-layout-${page.layout}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
        
        <div className="page-content py-8">
          {page.content.blocks.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              <p>Esta página no tiene contenido.</p>
            </div>
          ) : (
            <div className="blocks-container space-y-8">
              {page.content.blocks.map((block: PageBlock, index: number) => (
                <div key={block.id || index} className="block">
                  {block.type === 'text' && (
                    <div className="prose max-w-none">
                      <p>{typeof block.content === 'string' ? block.content : JSON.stringify(block.content)}</p>
                    </div>
                  )}
                  {block.type === 'hero' && (
                    <div className="bg-primary/10 p-8 rounded-lg text-center mb-8">
                      <h2 className="text-2xl font-bold">
                        {typeof block.content === 'string' ? block.content : JSON.stringify(block.content)}
                      </h2>
                    </div>
                  )}
                  {block.type === 'features' && (
                    <div className="space-y-6">
                      {typeof block.content === 'object' && 'title' in block.content && (
                        <h3 className="text-xl font-bold text-center">{block.content.title}</h3>
                      )}
                      {typeof block.content === 'object' && 'items' in block.content && Array.isArray(block.content.items) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                          {block.content.items.map((item: any, i: number) => (
                            <div key={i} className="p-4 border rounded-md">
                              <h4 className="font-medium mb-2">{item.title}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageRenderer;
