
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Compass } from 'lucide-react';

const ExploreCoursesCard: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-primary/10 to-accent/20 dark:from-primary/20 dark:to-accent/30 shadow-md border-none animate-scale-in hover-lift">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Descubre nuevos cursos</h2>
            <p className="text-muted-foreground max-w-lg">
              Explora nuestra biblioteca de cursos y amplía tus conocimientos con las últimas tecnologías y metodologías.
            </p>
          </div>
          <Button size="lg" asChild className="gap-2 bg-primary text-white hover:bg-primary/90 shadow-md">
            <Link to="/courses">
              <Compass className="h-5 w-5" />
              Explorar cursos
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExploreCoursesCard;
