
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PublicLayout from '@/layouts/PublicLayout';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

// Import data
import { LEADERBOARD_USERS } from '@/data/leaderboard';
import { CHALLENGES } from '@/data/challenges';

// Import components
import { TopStudents } from '@/components/leaderboard/TopStudents';
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable';
import { ChallengesGrid } from '@/components/leaderboard/ChallengesGrid';
import { AchievementsGrid } from '@/components/leaderboard/AchievementsGrid';
import { CallToAction } from '@/components/leaderboard/CallToAction';

const LeaderBoard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [timeFilter, setTimeFilter] = useState('all-time');
  
  return (
    <PublicLayout>
      <Helmet>
        <title>Tablero de Líderes | Nexo Learning</title>
        <meta name="description" content="Explora el tablero de líderes y desafíos en Nexo Learning. Compite con otros estudiantes y gana puntos." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tablero de Líderes</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compite con otros estudiantes, gana puntos y desbloquea logros en tu camino de aprendizaje.
          </p>
        </div>
        
        <TopStudents users={LEADERBOARD_USERS} />
        
        <Tabs defaultValue="leaderboard" value={activeTab} onValueChange={setActiveTab} className="mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="leaderboard">Clasificación</TabsTrigger>
              <TabsTrigger value="challenges">Desafíos</TabsTrigger>
              <TabsTrigger value="achievements">Logros</TabsTrigger>
            </TabsList>
            
            <div className="mt-4 sm:mt-0 flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setTimeFilter('all-time')} 
                className={timeFilter === 'all-time' ? 'bg-secondary' : ''}
              >
                Todos los tiempos
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setTimeFilter('monthly')} 
                className={timeFilter === 'monthly' ? 'bg-secondary' : ''}
              >
                Mensual
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setTimeFilter('weekly')} 
                className={timeFilter === 'weekly' ? 'bg-secondary' : ''}
              >
                Semanal
              </Button>
            </div>
          </div>
          
          <TabsContent value="leaderboard">
            <LeaderboardTable 
              users={LEADERBOARD_USERS} 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              timeFilter={timeFilter} 
            />
          </TabsContent>
          
          <TabsContent value="challenges">
            <ChallengesGrid challenges={CHALLENGES} />
          </TabsContent>
          
          <TabsContent value="achievements">
            <AchievementsGrid />
          </TabsContent>
        </Tabs>
        
        <CallToAction />
      </div>
    </PublicLayout>
  );
};

export default LeaderBoard;
