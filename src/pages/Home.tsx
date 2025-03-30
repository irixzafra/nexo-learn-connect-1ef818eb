
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import SectionPageLayout from '@/layouts/SectionPageLayout';
import ContinueLearningSection from '@/features/home/components/ContinueLearningSection';
import UpcomingClassesSection from '@/features/home/components/UpcomingClassesSection';
import AchievementsSection from '@/features/home/components/AchievementsSection';
import ExploreCoursesCard from '@/features/home/components/ExploreCoursesCard';
import { getGreeting } from '@/features/home/utils/getWelcomeMessage';
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const { user, profile, userRole } = useAuth();

  return (
    <SectionPageLayout
      header={{
        title: `${getGreeting()}, ${profile?.full_name?.split(' ')[0] || 'Usuario'}`,
        description: 'Bienvenido a la plataforma de aprendizaje. Aquí tienes un resumen de tu actividad.',
      }}
      stats={{
        stats: [
          {
            label: "Cursos activos",
            value: "3",
            icon: <BookOpen className="h-5 w-5" />,
            color: "primary"
          },
          {
            label: "Horas esta semana",
            value: "12",
            icon: <Clock className="h-5 w-5" />,
            color: "success"
          },
          {
            label: "Certificados",
            value: "8",
            icon: <Award className="h-5 w-5" />,
            color: "warning"
          },
          {
            label: "Días consecutivos",
            value: "23",
            change: { value: 15, type: "increase" },
            icon: <TrendingUp className="h-5 w-5" />,
            color: "success"
          }
        ]
      }}
      help={{
        title: "Tu progreso",
        description: "Recursos para ayudarte a continuar tu aprendizaje.",
        links: [
          {
            title: "Completar perfil",
            description: "Actualiza tu información personal y preferencias",
            href: "/profile"
          },
          {
            title: "Centro de ayuda",
            description: "Consulta la documentación y tutoriales",
            href: "/help",
            external: true
          }
        ]
      }}
    >
      {/* Sección principal - Continuar aprendiendo */}
      <ContinueLearningSection />

      {/* Segunda fila - Próximas clases y Logros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Columna próximas clases */}
        <UpcomingClassesSection />

        {/* Columna logros */}
        <AchievementsSection />
      </div>

      {/* Banner de exploración */}
      <ExploreCoursesCard />
    </SectionPageLayout>
  );
};

export default Home;
