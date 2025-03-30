
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { RoleIndicator } from './RoleIndicator';
import { ConnectionStatus } from '@/components/ConnectionStatus';
import { useAuth } from '@/contexts/AuthContext';
import { NotificationIndicator } from '@/components/notifications/NotificationIndicator';
import { ThemeSelector } from '@/components/ThemeSelector';
import { OnboardingTrigger } from '@/components/onboarding/OnboardingTrigger';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { BookOpen } from 'lucide-react';

export const HeaderActions: React.FC = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const { featuresConfig } = useOnboarding();

  return (
    <div className="ml-auto flex items-center space-x-4">
      {/* Notification indicator - solo si está habilitado */}
      {featuresConfig.enableNotifications && <NotificationIndicator />}
      
      {/* Theme Selector */}
      <ThemeSelector />
      
      <ConnectionStatus />
      <Separator orientation="vertical" className="h-6" />
      <RoleIndicator viewingAs={userRole} />
      <Separator orientation="vertical" className="h-6" />
      
      {/* Onboarding Trigger - solo si está habilitado */}
      {featuresConfig.showOnboardingTrigger && (
        <div className="hidden md:block">
          <OnboardingTrigger />
        </div>
      )}
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => navigate('/courses')}
        className="hidden md:flex"
        title="Explorar cursos"
      >
        <BookOpen className="h-4 w-4" />
      </Button>
    </div>
  );
};
