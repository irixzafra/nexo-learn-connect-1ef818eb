
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getPageBySlug } from '@/services/pagesService';
import { SitePage, PageBlock, PageBlockType, contentToString, ContainerLayout, getLayoutClass } from '@/types/pages';
import { Loader2 } from 'lucide-react';
import PublicLayout from '@/layouts/PublicLayout';
import NotFound from '@/pages/NotFound';
import { useEditMode } from '@/contexts/EditModeContext';
import DraggableContent from '@/components/admin/DraggableContent';
import SectionInsert from '@/components/admin/SectionInsert';
import InlineEdit from '@/components/admin/InlineEdit';
import ResizableBlockContainer from '@/components/admin/ResizableBlockContainer';
import { toast } from 'sonner';

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

  // Handle tag changes for a block
  const handleBlockTagsChange = (blockId: string, tags: string[]) => {
    if (!page || !page.content) return;
    
    const updatedBlocks = page.content.blocks.map(block => {
      if (block.id === blockId) {
        return { ...block, tags };
      }
      return block;
    });
    
    setPage({
      ...page,
      content: {
        ...page.content,
        blocks: updatedBlocks
      }
    });
    
    console.log(`Updated tags for block ${blockId}:`, tags);
  };

  // Handle container resizing
  const handleContainerResize = (blockId: string, newSize: { width?: string; height?: string }) => {
    if (!page || !page.content) return;
    
    const updatedBlocks = page.content.blocks.map(block => {
      if (block.id === blockId) {
        return { 
          ...block, 
          width: newSize.width || block.width, 
          height: newSize.height || block.height 
        };
      }
      return block;
    });
    
    setPage({
      ...page,
      content: {
        ...page.content,
        blocks: updatedBlocks
      }
    });
    
    toast.success("Tamaño del contenedor actualizado");
    console.log(`Resized block ${blockId}:`, newSize);
  };

  // Handle container layout change
  const handleLayoutChange = (blockId: string, newLayout: ContainerLayout) => {
    if (!page || !page.content) return;
    
    const updatedBlocks = page.content.blocks.map(block => {
      if (block.id === blockId) {
        return { ...block, layout: newLayout };
      }
      return block;
    });
    
    setPage({
      ...page,
      content: {
        ...page.content,
        blocks: updatedBlocks
      }
    });
    
    toast.success("Disposición del contenedor actualizada");
    console.log(`Changed layout for block ${blockId} to ${newLayout}`);
  };

  // Handle moving blocks in the layout
  const handleMoveBlock = (blockId: string, direction: 'up' | 'down' | 'left' | 'right') => {
    if (!page || !page.content) return;
    
    const blocks = [...page.content.blocks];
    const currentIndex = blocks.findIndex(block => block.id === blockId);
    
    if (currentIndex === -1) return;
    
    // Simple reordering for up/down (more complex grid rearrangement would be needed for left/right)
    if (direction === 'up' && currentIndex > 0) {
      const temp = blocks[currentIndex];
      blocks[currentIndex] = blocks[currentIndex - 1];
      blocks[currentIndex - 1] = temp;
    } else if (direction === 'down' && currentIndex < blocks.length - 1) {
      const temp = blocks[currentIndex];
      blocks[currentIndex] = blocks[currentIndex + 1];
      blocks[currentIndex + 1] = temp;
    } else if (direction === 'left' || direction === 'right') {
      // Para movimiento horizontal necesitaríamos más información sobre la estructura de la grid
      toast.info("Movimiento horizontal no disponible en esta vista");
      return;
    }
    
    // Update the order properties
    const updatedBlocks = blocks.map((block, index) => ({
      ...block,
      order: index + 1
    }));
    
    setPage({
      ...page,
      content: {
        ...page.content,
        blocks: updatedBlocks
      }
    });
    
    toast.success(`Bloque movido ${direction === 'up' ? 'arriba' : 'abajo'}`);
  };

  // Transform content blocks to draggable items
  const contentBlocks = page.content?.blocks || [];
  const draggableItems = contentBlocks.map((block: PageBlock, index: number) => ({
    id: block.id || `block-${index}`,
    order: index + 1,
    content: (
      <ResizableBlockContainer
        block={block}
        onResize={(selectedBlock, newSize) => handleContainerResize(selectedBlock.id, newSize)}
        onLayoutChange={(selectedBlock, newLayout) => handleLayoutChange(selectedBlock.id, newLayout)}
        onMoveBlock={(selectedBlock, direction) => handleMoveBlock(selectedBlock.id, direction)}
      >
        {block.type === 'text' && (
          <InlineEdit
            table="page_blocks"
            id={block.id || `block-${index}`}
            field="content"
            value={contentToString(block.content)}
            multiline={true}
            className="prose max-w-none"
            tags={block.tags}
            onTagsChange={(tags) => handleBlockTagsChange(block.id || `block-${index}`, tags)}
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
              tags={block.tags}
              onTagsChange={(tags) => handleBlockTagsChange(block.id || `block-${index}`, tags)}
            />
          </div>
        )}
        {/* Aquí puedes agregar más tipos de bloques según sea necesario */}
      </ResizableBlockContainer>
    ),
    width: block.width,
    text: contentToString(block.content)
  }));

  const handleAddBlock = (content: string, type?: string) => {
    if (!page || !page.content) return;
    
    const newBlock: PageBlock = {
      id: `block-${Date.now()}`,
      type: (type || 'text') as PageBlockType,
      content: content,
      tags: [],
      layout: 'column', // Layout por defecto para nuevos bloques
      isContainer: true  // Por defecto todos los nuevos bloques son contenedores
    };
    
    const blocks = [...(page.content.blocks || [])];
    blocks.push(newBlock);
    
    setPage({
      ...page,
      content: {
        ...page.content,
        blocks
      }
    });
    
    toast.success("Nuevo bloque añadido");
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
    }).filter(Boolean) as PageBlock[];
    
    setPage({
      ...page,
      content: {
        ...page.content,
        blocks: reorderedBlocks
      }
    });
    
    toast.success("Bloques reordenados");
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
              onAddItem={(content, position) => handleAddBlock(content, position)}
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
            {contentBlocks.map((block: PageBlock, index: number) => (
              <div 
                key={block.id || index} 
                className={cn(
                  "block",
                  getLayoutClass(block.layout)
                )}
                style={{ 
                  width: block.width || '100%', 
                  height: block.height || 'auto' 
                }}
              >
                {block.type === 'text' && <p>{contentToString(block.content)}</p>}
                {block.type === 'hero' && (
                  <div className="bg-primary/10 p-8 rounded-lg text-center mb-8">
                    <h2 className="text-2xl font-bold">{contentToString(block.content)}</h2>
                  </div>
                )}
                {/* Aquí puedes agregar más tipos de bloques según sea necesario */}
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
            tags={[]}
          />
        ) : (
          <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
        )}
        {renderPageContent()}
      </div>
    </PublicLayout>
  );
};

// Necesario porque usamos cn() en el componente
import { cn } from '@/lib/utils';

export default DynamicPage;
