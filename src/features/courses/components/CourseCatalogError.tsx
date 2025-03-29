
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface CourseCatalogErrorProps {
  error: string;
  onRetry: () => void;
}

export const CourseCatalogError: React.FC<CourseCatalogErrorProps> = ({
  error,
  onRetry,
}) => {
  return (
    <Card className="mb-6 border-destructive bg-destructive/5">
      <CardContent className="flex items-center gap-3 py-4">
        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
        <p className="text-destructive">{error}</p>
      </CardContent>
      <CardFooter className="border-t pt-4 bg-background/50">
        <Button variant="outline" onClick={onRetry}>
          Intentar de nuevo
        </Button>
      </CardFooter>
    </Card>
  );
};
