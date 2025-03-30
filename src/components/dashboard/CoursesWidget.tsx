
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CoursesWidget: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Mis Cursos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center text-primary font-medium">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">Curso de ejemplo {i + 1}</p>
                <p className="text-xs text-muted-foreground">Progreso: {(i + 1) * 20}%</p>
              </div>
            </div>
          ))}

          <Button variant="outline" asChild className="w-full mt-2">
            <Link to="/my-courses" className="flex items-center justify-center gap-2">
              <span>Ver todos mis cursos</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
