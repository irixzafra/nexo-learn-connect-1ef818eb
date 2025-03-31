
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
import { BookOpen, Bell, User, Settings, Info, Phone } from 'lucide-react';

export const HeaderActions: React.FC = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const { featuresConfig } = useOnboarding();

  return (
    <div className="ml-auto flex items-center space-x-2">
      {/* Notification indicator - only if enabled */}
      {featuresConfig.enableNotifications && (
        <NotificationIndicator />
      )}
      
      {/* Theme Selector - only if enabled */}
      {featuresConfig.enableThemeSwitcher && (
        <ThemeSelector />
      )}
      
      {/* Connection Status - more compact version */}
      <div className="scale-90">
        <ConnectionStatus />
      </div>
      
      {/* Info Button */}
      <Button 
        variant="ghost" 
        size="icon"
        className="h-9 w-9"
        title="Información"
        onClick={() => navigate('/about-us')}
      >
        <Info className="h-5 w-5" />
      </Button>
      
      {/* Contact Button */}
      <Button 
        variant="ghost" 
        size="icon"
        className="h-9 w-9"
        title="Contacto"
        onClick={() => navigate('/help')}
      >
        <Phone className="h-5 w-5" />
      </Button>
      
      {/* Onboarding Trigger - only if enabled */}
      {featuresConfig.enableOnboardingSystem && featuresConfig.showOnboardingTrigger && (
        <div className="hidden md:block">
          <OnboardingTrigger />
        </div>
      )}
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => navigate('/courses')}
        className="h-9 w-9 hidden md:flex"
        title="Explorar cursos"
      >
        <BookOpen className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => navigate('/profile')}
        className="h-9 w-9 hidden md:flex"
        title="Mi perfil"
      >
        <User className="h-5 w-5" />
      </Button>
    </div>
  );
};
