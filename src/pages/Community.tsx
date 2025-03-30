
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import { CommunityFeed } from '@/features/feed/components/CommunityFeed';
import { Leaderboard } from '@/features/feed/components/Leaderboard';
import { UserLevelChart } from '@/features/feed/components/UserLevelChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquareText, 
  Trophy, 
  Users,
  Bell,
  Rss,
  FlaskConical
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Community: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'feed');
  
  // This would come from the user's data in a real app
  const userPoints = Math.floor(Math.random() * 2000) + 50;
  
  // Update URL when tab changes
  useEffect(() => {
    if (activeTab === 'feed') {
      navigate('/community', { replace: true });
    } else {
      navigate(`/community?tab=${activeTab}`, { replace: true });
    }
  }, [activeTab, navigate]);
  
  return (
    <AppLayout>
      <div className="container py-6 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Comunidad</h1>
            <p className="text-muted-foreground">Conecta y aprende con otros miembros</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main content area */}
          <div className="flex-1">
            <Tabs 
              defaultValue="feed" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-6 grid grid-cols-3 md:grid-cols-5 md:w-auto">
                <TabsTrigger value="feed" className="flex items-center gap-1">
                  <Rss className="h-4 w-4" />
                  <span className="hidden md:inline">Feed</span>
                </TabsTrigger>
                <TabsTrigger value="popular" className="flex items-center gap-1">
                  <MessageSquareText className="h-4 w-4" />
                  <span className="hidden md:inline">Popular</span>
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  <span className="hidden md:inline">Leaderboard</span>
                </TabsTrigger>
                <TabsTrigger value="groups" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="hidden md:inline">Grupos</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-1">
                  <Bell className="h-4 w-4" />
                  <span className="hidden md:inline">Notificaciones</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="feed">
                <CommunityFeed />
              </TabsContent>
              
              <TabsContent value="popular">
                <div className="text-center py-12 border rounded-md bg-muted/30">
                  <FlaskConical className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium mb-2">Proximamente</h3>
                  <p className="text-muted-foreground">
                    Estamos trabajando en esta sección. ¡Vuelve pronto!
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="leaderboard">
                <div className="grid gap-6">
                  {isAuthenticated && (
                    <UserLevelChart currentPoints={userPoints} />
                  )}
                  <Leaderboard limit={20} />
                </div>
              </TabsContent>
              
              <TabsContent value="groups">
                <div className="text-center py-12 border rounded-md bg-muted/30">
                  <FlaskConical className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium mb-2">Proximamente</h3>
                  <p className="text-muted-foreground">
                    Los grupos estarán disponibles muy pronto.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications">
                <div className="text-center py-12 border rounded-md bg-muted/30">
                  <FlaskConical className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium mb-2">Proximamente</h3>
                  <p className="text-muted-foreground">
                    Las notificaciones personalizadas estarán disponibles pronto.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar - only show on feed tab */}
          {activeTab === 'feed' && (
            <div className="w-full md:w-80 space-y-6">
              <Leaderboard limit={5} />
              
              {isAuthenticated && (
                <UserLevelChart currentPoints={userPoints} />
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Community;
