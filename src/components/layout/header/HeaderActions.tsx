
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserMenu } from './UserMenu';
import { ContactButtons } from './ContactButtons';
import { NotificationIndicator } from '@/components/notifications/NotificationIndicator';

export const HeaderActions = () => {
  return (
    <div className="flex items-center gap-2">
      <ContactButtons />
      <NotificationIndicator />
      <UserMenu />
    </div>
  );
};
