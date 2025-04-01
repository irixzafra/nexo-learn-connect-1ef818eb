
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, BookOpen, Award, Clock } from 'lucide-react';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import StatsSection from '@/components/dashboard/StatsSection';
import UpcomingClassesSection from '@/features/home/components/UpcomingClassesSection';
import ContinueLearningSection from '@/features/home/components/ContinueLearningSection';
import OnboardingTrigger from '@/components/onboarding/OnboardingTrigger';
import { useOnboarding } from '@/hooks/useOnboarding';
import AchievementsSection from '@/features/home/components/AchievementsSection';
import ExploreCoursesCard from '@/features/home/components/ExploreCoursesCard';

const Dashboard = () => {
  const { startOnboarding } = useOnboarding();

  return (
    <div className="space-y-4 p-8 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Panel de control</h1>
          <p className="text-muted-foreground">
            Bienvenido a tu panel de control. Aquí puedes ver tus cursos, progreso y actividades.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex justify-end">
          <OnboardingTrigger onActivate={startOnboarding} />
        </div>
      </div>

      <WelcomeSection />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>Próximamente</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center">
            <Award className="mr-2 h-4 w-4" />
            <span>Logros</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <StatsSection />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <ContinueLearningSection />
            <ExploreCoursesCard />
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4">
          <UpcomingClassesSection />
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          <AchievementsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
