
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Award, GraduationCap, Sparkles } from 'lucide-react';
import { PageSection } from '@/layouts/SectionPageLayout';

const AchievementsSection: React.FC = () => {
  return (
    <PageSection
      title="Logros"
      description="Tus estadísticas de aprendizaje"
      variant="card"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg hover-lift">
          <div className="h-10 w-10 rounded-md bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-500">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">Estudiante consistente</p>
            <p className="text-sm text-muted-foreground">Completaste 5 lecciones esta semana</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg hover-lift">
          <div className="h-10 w-10 rounded-md bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-500">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">Masterización de contenido</p>
            <p className="text-sm text-muted-foreground">90% de aciertos en el último quiz</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Button variant="outline" asChild className="w-full">
          <Link to="/profile" className="flex items-center justify-center gap-2">
            <Award className="h-4 w-4" />
            Ver mi perfil
          </Link>
        </Button>
      </div>
    </PageSection>
  );
};

export default AchievementsSection;
