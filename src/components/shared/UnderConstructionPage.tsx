
import React from 'react';
import { Construction, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface UnderConstructionPageProps {
  title: string;
  description?: string;
  backPath?: string;
  comingSoon?: boolean;
}

const UnderConstructionPage: React.FC<UnderConstructionPageProps> = ({
  title,
  description = "Estamos trabajando para mejorar tu experiencia. Esta página estará disponible próximamente.",
  backPath,
  comingSoon = true
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <Card className="w-full max-w-2xl text-center border-dashed">
        <CardContent className="pt-10 pb-10 px-6">
          <div className="rounded-full bg-primary/10 p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Construction className="h-8 w-8 text-primary" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {description}
          </p>
          
          {comingSoon && (
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-6">
              ¡Próximamente!
            </div>
          )}
          
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnderConstructionPage;
