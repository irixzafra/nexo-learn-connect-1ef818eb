
import React from 'react';
import SectionPageLayout from '@/layouts/SectionPageLayout';
import { DashboardWidgetArea } from '@/components/dashboard/DashboardWidgetArea';
import { StatsSection } from '@/components/dashboard/StatsSection';
import { CoursesWidget } from '@/components/dashboard/CoursesWidget';
import { WelcomeSection } from '@/components/dashboard/WelcomeSection';
import { HelpSection } from '@/components/dashboard/HelpSection';
import { useAuth } from '@/contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  // These are examples of stats that might be shown to a student
  const studentStats = [
    { label: "Cursos Inscritos", value: "4", icon: <div>📚</div>, color: "blue-500" },
    { label: "Progreso Total", value: "63%", change: { value: 12, positive: true }, icon: <div>📈</div>, color: "emerald-500" },
    { label: "Horas Estudiadas", value: "18", icon: <div>⏱️</div>, color: "amber-500" },
    { label: "Certificados", value: "1", icon: <div>🏆</div>, color: "purple-500" }
  ];

  return (
    <SectionPageLayout className="container px-4 py-8">
      <WelcomeSection 
        title="Panel de Control"
        description={`Bienvenido a tu espacio personal de aprendizaje${user?.full_name ? `, ${user.full_name}` : ''}`}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-2">
          <StatsSection stats={studentStats} />
          <DashboardWidgetArea />
        </div>
        
        <div className="flex flex-col gap-6">
          <CoursesWidget />
          <HelpSection
            title="¿Necesitas ayuda?"
            description="Nuestro equipo está listo para ayudarte con cualquier duda."
            links={[
              { text: "Centro de ayuda", href: "/help" },
              { text: "Tutoriales", href: "/tutorials" },
              { text: "Contactar soporte", href: "/contact" }
            ]}
          />
        </div>
      </div>
    </SectionPageLayout>
  );
};

export default Home;
