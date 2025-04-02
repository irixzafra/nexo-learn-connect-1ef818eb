
import React from 'react';
import { useLocalization } from '@/hooks/useLocalization';

const ProfileSecurity: React.FC = () => {
  const { t } = useLocalization();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{t('profile.security', { default: 'Security Settings' })}</h1>
      <p>Security settings will be implemented here</p>
    </div>
  );
};

export default ProfileSecurity;
