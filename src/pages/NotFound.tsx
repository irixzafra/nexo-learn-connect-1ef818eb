
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import { useAccessibility } from '@/hooks/useAccessibility';
import { useLocalization } from '@/hooks/useLocalization';
import NotFoundLayout from '@/layouts/NotFoundLayout';

const NotFound: React.FC = () => {
  const { t } = useLocalization();
  const { isHighContrastEnabled } = useAccessibility();
  
  return (
    <AppLayout>
      <NotFoundLayout>
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
          <div className={`space-y-6 max-w-md ${isHighContrastEnabled ? 'border border-primary p-8 rounded-lg' : ''}`}>
            <div className="bg-primary/10 p-4 rounded-full inline-block mx-auto">
              <FileQuestion className="h-12 w-12 text-primary" aria-hidden="true" />
            </div>
            
            <h1 className="text-3xl font-bold" id="not-found-title">
              {t('notFound.title', { default: 'Página no encontrada' })}
            </h1>
            
            <p className="text-muted-foreground" id="not-found-description">
              {t('notFound.description', { default: 'Lo sentimos, la página que estás buscando no existe o ha sido movida.' })}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                aria-label={t('notFound.goBack', { default: 'Volver atrás' })}
              >
                {t('notFound.goBack', { default: 'Volver atrás' })}
              </Button>
              
              <Button asChild>
                <Link 
                  to="/"
                  aria-label={t('notFound.goHome', { default: 'Ir al inicio' })}
                >
                  {t('notFound.goHome', { default: 'Ir al inicio' })}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </NotFoundLayout>
    </AppLayout>
  );
};

export default NotFound;
