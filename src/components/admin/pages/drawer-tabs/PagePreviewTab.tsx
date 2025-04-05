
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

  return (
    <div className="p-4 border rounded-md min-h-[60vh]">
      <div className="flex flex-col space-y-6">
        <div className="bg-white p-6 rounded-md border shadow-sm min-h-[400px]">
          <h1 className="text-2xl font-bold mb-4">{page.title}</h1>
          {page.content?.blocks && page.content.blocks.length > 0 ? (
            <DraggableBlocksContainer 
              blocks={ensureBlockIds(page.content.blocks)}
              onBlocksChange={() => {}} // Read-only in preview mode
              renderBlockContent={(block) => (
                <div className="p-4 border rounded mb-2">
                  <div className="font-medium text-sm text-muted-foreground mb-1">{block.type}</div>
                  <div>
                    {typeof block.content === 'string' 
                      ? block.content 
                      : JSON.stringify(block.content, null, 2)
                    }
                  </div>
                </div>
              )}
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
