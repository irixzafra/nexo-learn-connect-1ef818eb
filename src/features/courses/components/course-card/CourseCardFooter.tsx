
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CourseCardFooterProps {
  courseUrl: string;
}

export const CourseCardFooter: React.FC<CourseCardFooterProps> = ({ courseUrl }) => {
  return (
    <CardFooter className="border-t pt-4 flex justify-between items-center">
      <Link to={courseUrl} className="text-sm text-primary hover:underline flex items-center">
        Ver detalles
        <ChevronRight className="h-3.5 w-3.5 ml-1" />
      </Link>
      <Button size="sm" className="shadow-sm" asChild>
        <Link to={courseUrl}>Inscribirme</Link>
      </Button>
    </CardFooter>
  );
};
