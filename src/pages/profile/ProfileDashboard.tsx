
import React from 'react';
import { useLocalization } from '@/hooks/useLocalization';

const ProfileDashboard: React.FC = () => {
  const { t } = useLocalization();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{t('profile.dashboard', { default: 'Profile Dashboard' })}</h1>
      <p>Profile dashboard will be implemented here</p>
    </div>
  );
};

export default ProfileDashboard;
