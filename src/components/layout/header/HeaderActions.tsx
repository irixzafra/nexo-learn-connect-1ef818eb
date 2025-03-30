
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

export const HeaderActions: React.FC = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  return (
    <div className="ml-auto flex items-center space-x-4">
      {/* Notification indicator */}
      <NotificationIndicator />
      
      {/* Theme Selector */}
      <ThemeSelector />
      
      <ConnectionStatus />
      <Separator orientation="vertical" className="h-6" />
      <RoleIndicator viewingAs={userRole} />
      <Separator orientation="vertical" className="h-6" />
      
      {/* Onboarding Trigger */}
      <div className="hidden md:block">
        <OnboardingTrigger />
      </div>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => navigate('/courses')}
        className="hidden md:flex"
      >
        Explorar cursos
      </Button>
    </div>
  );
};
