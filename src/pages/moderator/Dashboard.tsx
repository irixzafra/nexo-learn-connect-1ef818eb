
import React from 'react';
import { useLocalization } from '@/hooks/useLocalization';

const ModeratorDashboard: React.FC = () => {
  const { t } = useLocalization();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{t('moderator.dashboard', { default: 'Moderator Dashboard' })}</h1>
      <p>Moderator dashboard will be implemented here</p>
    </div>
  );
};

export default ModeratorDashboard;
