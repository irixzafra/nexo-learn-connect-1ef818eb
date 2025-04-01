
import React from 'react';
import { PageData } from '../types';

interface PagePreviewTabProps {
  page: PageData;
}

const PagePreviewTab: React.FC<PagePreviewTabProps> = ({ page }) => {
  return (
    <div className="p-4 border rounded-md min-h-[60vh]">
      <div className="flex flex-col items-center justify-center h-full">
        <iframe 
          src={page.path} 
          className="w-full h-[60vh] border rounded" 
          title={`Vista previa de ${page.title}`}
        />
      </div>
    </div>
  );
};

export default PagePreviewTab;
