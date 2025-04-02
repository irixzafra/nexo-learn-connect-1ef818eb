
import React from 'react';
import { useLocalization } from '@/hooks/useLocalization';

const ProfileNotifications: React.FC = () => {
  const { t } = useLocalization();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{t('profile.notifications', { default: 'Notification Settings' })}</h1>
      <p>Notification settings will be implemented here</p>
    </div>
  );
};

export default ProfileNotifications;
