
import React from 'react';
import { SitePage } from '@/types/pages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText } from 'lucide-react';

interface PageEditorProps {
  page: SitePage;
  onSave: (page: SitePage) => Promise<void>;
  onPublish?: (page: SitePage) => Promise<void>;
  className?: string;
}

const PageEditor: React.FC<PageEditorProps> = ({
  page,
  className
}) => {
  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Page Editor Disabled
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              The inline page editor functionality has been removed as requested.
              Page title: {page.title}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageEditor;
