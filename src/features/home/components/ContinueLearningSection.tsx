
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Layers } from 'lucide-react';
import { PageSection } from '@/layouts/SectionPageLayout';

const ContinueLearningSection: React.FC = () => {
  return (
    <PageSection 
      title="Continuar aprendiendo" 
      description="Retoma donde lo dejaste"
      className="mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col bg-secondary/30 dark:bg-secondary/30 rounded-lg p-4 hover-lift">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 rounded-md bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Desarrollo Web Full Stack</p>
              <p className="text-sm text-muted-foreground">Módulo 3: React avanzado</p>
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Progreso: 68%</span>
              <span className="text-primary">12/18 lecciones</span>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col bg-secondary/30 dark:bg-secondary/30 rounded-lg p-4 hover-lift">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 rounded-md bg-blue-500/10 flex items-center justify-center">
              <Layers className="h-7 w-7 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Diseño UX/UI para desarrolladores</p>
              <p className="text-sm text-muted-foreground">Módulo 1: Fundamentos</p>
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Progreso: 24%</span>
              <span className="text-blue-500">4/16 lecciones</span>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '24%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-center">
        <Button asChild>
          <Link to="/my-courses" className="flex items-center justify-center gap-2">
            <BookOpen className="h-4 w-4" />
            Continuar aprendiendo
          </Link>
        </Button>
      </div>
    </PageSection>
  );
};

export default ContinueLearningSection;
