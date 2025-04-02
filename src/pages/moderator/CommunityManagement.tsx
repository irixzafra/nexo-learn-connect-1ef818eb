
import React from 'react';
import { useLocalization } from '@/hooks/useLocalization';

const CommunityManagement: React.FC = () => {
  const { t } = useLocalization();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{t('moderator.community', { default: 'Community Management' })}</h1>
      <p>Community management interface will be implemented here</p>
    </div>
  );
};

export default CommunityManagement;
