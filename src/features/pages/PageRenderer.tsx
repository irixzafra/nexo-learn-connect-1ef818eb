
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SitePage, PageBlock, PageBlockType } from '@/types/pages';
import { Loader2 } from 'lucide-react';
import { useEditMode } from '@/contexts/EditModeContext';
import InlineEdit from '@/components/admin/InlineEdit';
import DraggableContent from '@/components/admin/DraggableContent';
import SectionInsert from '@/components/admin/SectionInsert';

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
          content: { 
            blocks: [
              { id: 'block-1', type: 'text', content: 'Welcome to our platform!' },
              { id: 'block-2', type: 'hero', content: 'Learn and Grow With Us' }
            ] 
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
  const { isEditMode } = useEditMode();

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

  // Transform content blocks to draggable items
  const contentBlocks = page?.content?.blocks || [];
  const draggableItems = contentBlocks.map((block: PageBlock, index: number) => ({
    id: block.id || `block-${index}`,
    order: index + 1,
    content: (
      <div className="mb-6">
        {block.type === 'text' && (
          <InlineEdit
            table="page_blocks"
            id={block.id || `block-${index}`}
            field="content"
            value={block.content}
            multiline={true}
            className="prose max-w-none"
          />
        )}
        {block.type === 'hero' && (
          <div className="bg-primary/10 p-8 rounded-lg text-center mb-8">
            <InlineEdit
              table="page_blocks"
              id={block.id || `block-${index}`}
              field="content"
              value={block.content}
              className="text-2xl font-bold"
            />
          </div>
        )}
      </div>
    ),
    text: block.content
  }));

  // Updated to accept position as number to fix type errors
  const handleAddBlock = (content: string, position?: number) => {
    if (!page || !page.content) return;
    
    const newBlock: PageBlock = {
      id: `block-${Date.now()}`,
      type: 'text' as PageBlockType,
      content: content
    };
    
    const blocks = [...(page.content.blocks || [])];
    
    if (position !== undefined) {
      blocks.splice(position, 0, newBlock);
    } else {
      blocks.push(newBlock);
    }
    
    setPage({
      ...page,
      content: {
        ...page.content,
        blocks
      }
    });
    
    // Here you would typically save the new content to the backend
    console.log("Added new block:", newBlock);
  };

  const handleReorderBlocks = (items: any[]) => {
    if (!page || !page.content) return;
    
    // Map the reordered items back to content blocks
    const reorderedBlocks = items.map((item, index) => {
      const originalBlock = page.content?.blocks.find((b: any) => b.id === item.id);
      if (!originalBlock) return null;
      
      return {
        ...originalBlock,
        order: index + 1
      };
    }).filter(Boolean);
    
    setPage({
      ...page,
      content: {
        ...page.content,
        blocks: reorderedBlocks
      }
    });
    
    // Here you would typically save the reordered content to the backend
    console.log("Reordered blocks:", reorderedBlocks);
  };

  // Basic layout renderer based on page layout type
  const renderPageContent = () => {
    if (isEditMode) {
      return (
        <div className="page-content py-8">
          {contentBlocks.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-primary/20 rounded-lg">
              <p className="text-muted-foreground mb-4">Esta página no tiene contenido.</p>
              <SectionInsert onAddSection={handleAddBlock} />
            </div>
          ) : (
            <DraggableContent
              items={draggableItems}
              table="page_blocks"
              className="space-y-8"
              onReorder={handleReorderBlocks}
              onAddItem={handleAddBlock}
            />
          )}
        </div>
      );
    }
    
    return (
      <div className="page-content py-8">
        {contentBlocks.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <p>Esta página no tiene contenido.</p>
          </div>
        ) : (
          <div className="blocks-container space-y-8">
            {contentBlocks.map((block: any, index: number) => (
              <div key={block.id || index} className="block">
                {block.type === 'text' && <p>{block.content}</p>}
                {block.type === 'hero' && (
                  <div className="bg-primary/10 p-8 rounded-lg text-center mb-8">
                    <h2 className="text-2xl font-bold">{block.content}</h2>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`page-container page-layout-${page?.layout}`}>
      <div className="container mx-auto px-4">
        {isEditMode ? (
          <InlineEdit
            table="pages"
            id={page?.id || ''}
            field="title"
            value={page?.title || ''}
            className="text-3xl font-bold mb-6"
            placeholder="Título de la página"
          />
        ) : (
          <h1 className="text-3xl font-bold mb-6">{page?.title}</h1>
        )}
        {renderPageContent()}
      </div>
    </div>
  );
};

export default PageRenderer;
