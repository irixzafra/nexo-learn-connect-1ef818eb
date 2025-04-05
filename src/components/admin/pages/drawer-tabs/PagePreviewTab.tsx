
import React from 'react';
import { PageData } from '../types';
import { PageBlock as AdminPageBlock } from '../types';
import { PageBlock as GlobalPageBlock } from '@/types/pages';
import DraggableBlocksContainer from '@/components/admin/DraggableBlocksContainer';

interface PagePreviewTabProps {
  page: PageData;
}

const PagePreviewTab: React.FC<PagePreviewTabProps> = ({ page }) => {
  // Generate IDs for any blocks that don't have them to satisfy the type requirements
  const ensureBlockIds = (blocks: AdminPageBlock[]): GlobalPageBlock[] => {
    return blocks.map(block => ({
      ...block,
      id: block.id || `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    })) as GlobalPageBlock[];
  };

  // Helper function to render block content based on type
  const renderBlockContent = (block: GlobalPageBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <div className="prose max-w-none">
            <p>{typeof block.content === 'string' ? block.content : JSON.stringify(block.content)}</p>
          </div>
        );
      case 'hero':
        return (
          <div className="bg-primary/10 p-8 rounded-lg text-center mb-4">
            <h2 className="text-2xl font-bold">
              {typeof block.content === 'string' ? block.content : JSON.stringify(block.content)}
            </h2>
          </div>
        );
      case 'image':
        if (typeof block.content === 'object' && block.content && 'url' in block.content) {
          return (
            <div className="my-4">
              <img 
                src={block.content.url as string} 
                alt={block.content.alt as string || 'Imagen'} 
                className="rounded-md max-w-full"
              />
            </div>
          );
        }
        return <div className="text-muted-foreground">Imagen sin URL válida</div>;
      case 'cta':
        return (
          <div className="my-4 p-6 bg-muted/30 rounded-lg text-center">
            <h3 className="text-xl font-medium mb-2">
              {typeof block.content === 'object' && 'title' in block.content ? block.content.title : 'Llamada a la acción'}
            </h3>
            <p className="mb-4 text-muted-foreground">
              {typeof block.content === 'object' && 'description' in block.content ? block.content.description : ''}
            </p>
            <div className="inline-block bg-primary text-white px-4 py-2 rounded-md">
              {typeof block.content === 'object' && 'buttonText' in block.content ? block.content.buttonText : 'Acción'}
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 border rounded-md">
            <div className="font-medium text-sm text-muted-foreground mb-1">Bloque tipo: {block.type}</div>
            <pre className="bg-muted p-2 rounded text-xs overflow-auto">
              {JSON.stringify(block.content, null, 2)}
            </pre>
          </div>
        );
    }
  };

  return (
    <div className="p-4 border rounded-md min-h-[60vh]">
      <div className="flex flex-col space-y-6">
        <div className="bg-white p-6 rounded-md border shadow-sm min-h-[400px]">
          <h1 className="text-2xl font-bold mb-4">{page.title}</h1>
          {page.content?.blocks && page.content.blocks.length > 0 ? (
            <DraggableBlocksContainer 
              blocks={ensureBlockIds(page.content.blocks)}
              onBlocksChange={() => {}} // Read-only in preview mode
              renderBlockContent={renderBlockContent}
            />
          ) : (
            <div className="text-center p-8 bg-muted/20 rounded-md border border-dashed">
              <p className="text-muted-foreground">No content blocks available</p>
            </div>
          )}
        </div>

        <div className="w-full border rounded">
          <iframe 
            src={`/pages/${page.path}`} 
            className="w-full h-[400px]" 
            title={`Vista previa de ${page.title}`}
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      </div>
    </div>
  );
};

export default PagePreviewTab;
