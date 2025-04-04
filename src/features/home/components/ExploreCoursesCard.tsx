
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExploreCoursesCardProps {
  onClick?: () => void;
}

const ExploreCoursesCard: React.FC<ExploreCoursesCardProps> = ({ onClick }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          Explorar cursos
        </CardTitle>
        <CardDescription>Descubre nuevos cursos para ampliar tus conocimientos</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-40">
        <div className="text-center">
          <div className="flex justify-center">
            <BookOpen className="h-12 w-12 text-primary/50" />
          </div>
          <p className="mt-2 text-muted-foreground">
            Explora nuestro catálogo completo de cursos
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onClick} className="w-full">
          Ir al catálogo
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExploreCoursesCard;
