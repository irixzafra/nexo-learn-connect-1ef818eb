
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { useNavigate } from 'react-router-dom';

interface WelcomeSectionProps {
  title: string;
  description: string;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ title, description }) => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  
  // Obtener la hora actual para personalizar el saludo
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const userName = profile?.full_name?.split(' ')[0] || 'estudiante';
  
  return (
    <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-none">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold">
              {getGreeting()}, {userName}
            </h2>
            <p className="text-muted-foreground mt-1">
              Continúa tu aprendizaje donde lo dejaste.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => navigate('/app/my-courses')}>
              Mis Cursos
            </Button>
            <Button onClick={() => navigate('/app/course')}>
              Explorar Cursos
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
