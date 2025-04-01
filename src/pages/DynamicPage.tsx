
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getPageBySlug } from '@/services/pagesService';
import { SitePage, PageBlock, PageBlockType, contentToString } from '@/types/pages';
import { Loader2 } from 'lucide-react';
import PublicLayout from '@/layouts/PublicLayout';
import NotFound from '@/pages/NotFound';
import { useEditMode } from '@/contexts/EditModeContext';
import DraggableContent from '@/components/admin/DraggableContent';
import SectionInsert from '@/components/admin/SectionInsert';
import InlineEdit from '@/components/admin/InlineEdit';

const DynamicPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<SitePage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { isEditMode } = useEditMode();

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

  // Transform content blocks to draggable items
  const contentBlocks = page.content?.blocks || [];
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
            value={contentToString(block.content)}
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
              value={contentToString(block.content)}
              className="text-2xl font-bold"
            />
          </div>
        )}
      </div>
    ),
    text: contentToString(block.content)
  }));

  const handleAddBlock = (content: string, type?: string) => {
    if (!page || !page.content) return;
    
    const newBlock: PageBlock = {
      id: `block-${Date.now()}`,
      type: (type || 'text') as PageBlockType,
      content: content
    };
    
    const blocks = [...(page.content.blocks || [])];
    const position = blocks.length;
    blocks.push(newBlock);
    
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
              onAddItem={(content, position) => handleAddBlock(content, position ? 'text' : 'text')}
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
                {block.type === 'text' && <p>{contentToString(block.content)}</p>}
                {block.type === 'hero' && (
                  <div className="bg-primary/10 p-8 rounded-lg text-center mb-8">
                    <h2 className="text-2xl font-bold">{contentToString(block.content)}</h2>
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
    <PublicLayout>
      <div className="container mx-auto px-4">
        {isEditMode ? (
          <InlineEdit
            table="pages"
            id={page.id}
            field="title"
            value={page.title}
            className="text-3xl font-bold mb-6"
            placeholder="Título de la página"
          />
        ) : (
          <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
        )}
        {renderPageContent()}
      </div>
    </PublicLayout>
  );
};

export default DynamicPage;
