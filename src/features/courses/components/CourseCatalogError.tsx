
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, RefreshCw } from 'lucide-react';

export interface CourseCatalogErrorProps {
  message: string;
  onRetry: () => void;
}

export const CourseCatalogError: React.FC<CourseCatalogErrorProps> = ({
  message,
  onRetry
}) => {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <AlertCircle className="h-16 w-16 text-destructive mb-4" />
        <div className="text-center mb-6">
          <h3 className="text-xl font-medium mb-2">Ha ocurrido un error</h3>
          <p className="text-muted-foreground">{message}</p>
        </div>
        <Button onClick={onRetry} className="flex items-center">
          <RefreshCw className="mr-2 h-4 w-4" />
          Intentar nuevamente
        </Button>
      </CardContent>
    </Card>
  );
};
