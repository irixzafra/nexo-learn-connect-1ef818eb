
import React from 'react';
import { useLocalization } from '@/hooks/useLocalization';

const ProfileSubscriptions: React.FC = () => {
  const { t } = useLocalization();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{t('profile.subscriptions', { default: 'Subscription Management' })}</h1>
      <p>Subscription management will be implemented here</p>
    </div>
  );
};

export default ProfileSubscriptions;
