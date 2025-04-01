
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { OnboardingTrigger } from '@/components/onboarding/OnboardingTrigger';
import { useFeatures } from '@/contexts/features/FeaturesContext';
import { UserMenu } from '@/components/layout/header/UserMenu';
import { NotificationPanel } from '@/components/notifications/NotificationPanel';
import { NotificationIndicator } from '@/components/notifications/NotificationIndicator';

const HeaderActions: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, userRole } = useAuth();
  const { openOnboarding, isOnboardingComplete } = useOnboarding();
  const { featuresConfig } = useFeatures();

  return (
    <div className="flex items-center gap-2">
      {/* Theme Toggle */}
      <ModeToggle />

      {/* Notifications */}
      {isAuthenticated && featuresConfig.enableNotifications && (
        <>
          <NotificationIndicator />
          <NotificationPanel />
        </>
      )}

      {/* Onboarding trigger */}
      {isAuthenticated && 
       featuresConfig.enableOnboarding && 
       (featuresConfig.showOnboardingTrigger || false) && 
       !isOnboardingComplete && (
        <OnboardingTrigger 
          onClick={() => openOnboarding()}
        />
      )}

      {/* User menu */}
      {isAuthenticated && <UserMenu />}
    </div>
  );
};

export default HeaderActions;
