
import React from 'react';
import { useLocalization } from '@/hooks/useLocalization';

const UserWarnings: React.FC = () => {
  const { t } = useLocalization();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{t('moderator.user_warnings', { default: 'User Warnings' })}</h1>
      <p>User warnings management interface will be implemented here</p>
    </div>
  );
};

export default UserWarnings;
