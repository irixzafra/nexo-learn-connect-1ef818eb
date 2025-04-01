
import React, { useState } from 'react';
import { UserMenu } from './UserMenu';
import { useTheme } from 'next-themes';
import { NotificationIndicator } from '@/components/notifications/NotificationIndicator';
import { Button } from '@/components/ui/button';
import { SunIcon, MoonIcon, PlusCircle } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';
import { OnboardingTrigger } from '@/components/onboarding/OnboardingTrigger';
import { useFeature } from '@/hooks/useFeature';

export const HeaderActions: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { isCompleted } = useOnboarding();
  const { isEnabled: enableThemeSwitcher } = useFeature('enableThemeSwitcher');
  const { isEnabled: enableNotifications } = useFeature('enableNotifications');
  const { isEnabled: showOnboardingTrigger } = useFeature('showOnboardingTrigger');
  
  // Create new content modal
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center gap-3">
      {/* Only show theme toggle if theme switcher is enabled */}
      {enableThemeSwitcher && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full bg-background border-muted border hover:bg-muted"
        >
          {theme === 'dark' ? (
            <SunIcon className="h-4 w-4" />
          ) : (
            <MoonIcon className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      )}

      {/* Show create content button for instructors and admins */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCreateModalOpen(true)}
        className="rounded-full bg-background border-muted border hover:bg-muted"
      >
        <PlusCircle className="h-4 w-4" />
        <span className="sr-only">Create content</span>
      </Button>

      {/* Show notifications if enabled */}
      {enableNotifications && <NotificationIndicator />}

      {/* Show onboarding trigger if enabled and not completed */}
      {!isCompleted && showOnboardingTrigger && <OnboardingTrigger onActivate={() => {}} />}

      {/* User menu is always shown */}
      <UserMenu />
    </div>
  );
};
