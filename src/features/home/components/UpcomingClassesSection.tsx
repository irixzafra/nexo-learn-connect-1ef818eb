
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MessageSquare } from 'lucide-react';
import { PageSection } from '@/layouts/SectionPageLayout';

const UpcomingClassesSection: React.FC = () => {
  return (
    <PageSection
      title="Próximas clases"
      description="Eventos programados"
      variant="card"
    >
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg hover-lift">
          <div className="h-10 w-10 rounded-md bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">Clase de React Avanzado</p>
            <p className="text-sm text-muted-foreground">Hoy, 18:00 - 19:30</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg hover-lift">
          <div className="h-10 w-10 rounded-md bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-500">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">Sesión Q&A con tutor</p>
            <p className="text-sm text-muted-foreground">Mañana, 10:00 - 11:00</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Button variant="outline" asChild className="w-full">
          <Link to="/calendar" className="flex items-center justify-center gap-2">
            <Calendar className="h-4 w-4" />
            Ver calendario
          </Link>
        </Button>
      </div>
    </PageSection>
  );
};

export default UpcomingClassesSection;
