
import React from 'react';
import { useLocalization } from '@/hooks/useLocalization';

const ProfileEdit: React.FC = () => {
  const { t } = useLocalization();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{t('profile.edit', { default: 'Edit Profile' })}</h1>
      <p>Profile edit form will be implemented here</p>
    </div>
  );
};

export default ProfileEdit;
