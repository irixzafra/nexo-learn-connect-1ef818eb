
import React from 'react';
import { useLocalization } from '@/hooks/useLocalization';

const ContentReview: React.FC = () => {
  const { t } = useLocalization();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{t('moderator.content_review', { default: 'Content Review' })}</h1>
      <p>Content review interface will be implemented here</p>
    </div>
  );
};

export default ContentReview;
