
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

  // Apply different layouts
  switch (page.layout) {
    case 'landing':
      content = (
        <div className="w-full">
          {/* Render landing layout */}
          {content}
        </div>
      );
      break;
    case 'sidebar':
      content = (
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              {/* Sidebar */}
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">Navegación</h3>
                <ul className="space-y-1">
                  <li><a href="/" className="text-primary hover:underline">Inicio</a></li>
                  <li><a href="/courses" className="text-primary hover:underline">Cursos</a></li>
                </ul>
              </div>
            </div>
            <div className="md:col-span-3">
              {/* Main content */}
              <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
              <div className="prose max-w-none">
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
          </div>
        </div>
      );
      break;
    case 'full-width':
      content = (
        <div className="w-full">
          <div className="bg-primary text-white py-16 mb-8">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold">{page.title}</h1>
            </div>
          </div>
          <div className="container mx-auto px-4 py-10">
            <div className="prose max-w-none">
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
        </div>
      );
      break;
    default:
      // Default layout is already set
      break;
  }

  return (
    <PublicLayout>
      {content}
    </PublicLayout>
  );
};

export default DynamicPage;
