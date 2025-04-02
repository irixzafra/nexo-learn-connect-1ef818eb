
import React from 'react';
import { useLocalization } from '@/hooks/useLocalization';

const ReportedContent: React.FC = () => {
  const { t } = useLocalization();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{t('moderator.reported_content', { default: 'Reported Content' })}</h1>
      <p>Reported content interface will be implemented here</p>
    </div>
  );
};

export default ReportedContent;
