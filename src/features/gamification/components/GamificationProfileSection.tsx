
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPointsDisplay } from './UserPointsDisplay';
import { BadgesList } from './BadgesList';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GamificationProfileSectionProps {
  userId: string;
}

export const GamificationProfileSection: React.FC<GamificationProfileSectionProps> = ({
  userId
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Progreso y Nivel
          </CardTitle>
          <CardDescription>
            Tu progreso y nivel de experiencia en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserPointsDisplay userId={userId} />
        </CardContent>
      </Card>

      <BadgesList 
        userId={userId} 
        limit={4} 
        title="Tus Insignias" 
        description="Logros desbloqueados en tu camino de aprendizaje"
      />

      <div className="flex justify-center">
        <Button asChild variant="outline">
          <Link to="/profile/achievements">
            Ver todas mis insignias y logros
          </Link>
        </Button>
      </div>
    </div>
  );
};
