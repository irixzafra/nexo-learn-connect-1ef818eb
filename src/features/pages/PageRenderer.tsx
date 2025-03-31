
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPageBySlug } from '@/features/admin/services/pagesService';
import { SitePage } from '@/types/pages';
import { Skeleton } from '@/components/ui/skeleton';

const PageRenderer: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<SitePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        const pageData = await getPageBySlug(slug);
        
        if (!pageData) {
          setError('Página no encontrada');
          return;
        }
        
        // Don't show non-published pages
        if (pageData.status !== 'published') {
          setError('Esta página no está disponible actualmente');
          return;
        }
        
        setPage(pageData);
      } catch (error) {
        console.error('Error fetching page:', error);
        setError('Error al cargar la página');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Skeleton className="h-12 w-3/4 mb-6" />
        <Skeleton className="h-6 w-full mb-4" />
        <Skeleton className="h-6 w-full mb-4" />
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-64 w-full mb-8" />
        <Skeleton className="h-6 w-full mb-4" />
        <Skeleton className="h-6 w-full mb-4" />
        <Skeleton className="h-6 w-2/3" />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">
          {error || 'Página no encontrada'}
        </h1>
        <p className="mb-6 text-muted-foreground">
          Lo sentimos, la página que buscas no está disponible.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="text-primary hover:underline"
        >
          Volver a la página principal
        </button>
      </div>
    );
  }

  // Simple layout renderer - in a production app you'd want to make this more sophisticated
  return (
    <div className={`page-layout layout-${page.layout}`}>
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Page header with title */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold">{page.title}</h1>
          {page.meta_description && (
            <p className="mt-4 text-muted-foreground">{page.meta_description}</p>
          )}
        </header>
        
        {/* Page content blocks */}
        <div className="page-content">
          {page.content?.blocks && page.content.blocks.length > 0 ? (
            <div>
              {page.content.blocks.map((block, index) => (
                <div key={block.id || index} className={`block block-${block.type} mb-10`}>
                  {/* Default text block rendering */}
                  {block.type === 'text' && (
                    <div className="prose max-w-none">
                      {typeof block.content === 'string' ? (
                        <p>{block.content}</p>
                      ) : (
                        <p>Contenido de texto</p>
                      )}
                    </div>
                  )}
                  
                  {/* Hero block rendering */}
                  {block.type === 'hero' && (
                    <div className="bg-primary/10 p-12 rounded-lg text-center">
                      <h2 className="text-3xl font-bold mb-4">
                        {typeof block.content === 'string' ? block.content : 'Título del Hero'}
                      </h2>
                      <p className="text-muted-foreground">
                        Este es un bloque hero. En una implementación completa,
                        podrías tener imágenes, botones y más contenido.
                      </p>
                    </div>
                  )}
                  
                  {/* CTA block rendering */}
                  {block.type === 'cta' && (
                    <div className="bg-secondary/20 p-8 rounded-lg text-center">
                      <h3 className="text-2xl font-semibold mb-4">
                        {typeof block.content === 'string' ? block.content : 'Llamada a la acción'}
                      </h3>
                      <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md">
                        Botón de acción
                      </button>
                    </div>
                  )}
                  
                  {/* Placeholder for other block types */}
                  {!['text', 'hero', 'cta'].includes(block.type) && (
                    <div className="border border-dashed border-muted p-8 rounded-lg text-center">
                      <p className="text-muted-foreground">
                        Bloque tipo "{block.type}" - Este tipo de bloque no tiene visualización definida aún
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
              <p>Esta página aún no tiene contenido</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageRenderer;
