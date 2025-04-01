
import React from 'react';
import { PageData } from '../types';

interface PageCodeTabProps {
  page: PageData;
}

const PageCodeTab: React.FC<PageCodeTabProps> = ({ page }) => {
  return (
    <div className="min-h-[60vh]">
      <div className="bg-muted rounded-md p-4 overflow-auto h-[60vh]">
        <pre className="text-xs">
          <code>
{`// Componente: ${page.component}
// Ruta: ${page.path}

import React from 'react';

const ${page.component} = () => {
  return (
    <div>
      <h1>${page.title}</h1>
      <p>${page.description}</p>
    </div>
  );
};

export default ${page.component};`}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default PageCodeTab;
