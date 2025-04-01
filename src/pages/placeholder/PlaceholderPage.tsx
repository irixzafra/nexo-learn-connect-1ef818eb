
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  subtitle?: string;
  returnPath?: string;
  returnLabel?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  subtitle = 'Esta página está en desarrollo',
  returnPath = '/',
  returnLabel = 'Volver al inicio',
}) => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mx-auto max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-8 rounded-lg text-center">
            <p className="text-muted-foreground">{subtitle}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Estamos trabajando en esta funcionalidad y estará disponible próximamente.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button asChild variant="outline">
              <Link to={returnPath}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {returnLabel}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
