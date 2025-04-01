
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Challenge } from '@/data/challenges';

interface ChallengesGridProps {
  challenges: Challenge[];
}

export const ChallengesGrid: React.FC<ChallengesGridProps> = ({ challenges }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map(challenge => (
          <Card key={challenge.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                      <img src={challenge.badgeUrl} alt={challenge.title} className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{challenge.title}</CardTitle>
                      <CardDescription>{challenge.description}</CardDescription>
                    </div>
                  </div>
                </div>
                <Badge variant={
                  challenge.difficulty === 'easy' ? 'outline' : 
                  challenge.difficulty === 'medium' ? 'secondary' : 
                  'destructive'
                }>
                  {challenge.difficulty === 'easy' ? 'Fácil' : 
                   challenge.difficulty === 'medium' ? 'Medio' : 'Difícil'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{challenge.points}</div>
                  <p className="text-xs text-muted-foreground">Puntos</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{challenge.participants}</div>
                  <p className="text-xs text-muted-foreground">Participantes</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">
                    {new Date(challenge.endDate).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground">Finaliza</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    {Math.ceil((new Date(challenge.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} días restantes
                  </span>
                </div>
                <Button>Participar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button variant="outline" size="lg">
          Ver todos los desafíos
        </Button>
      </div>
    </div>
  );
};
