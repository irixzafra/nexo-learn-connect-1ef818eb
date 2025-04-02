
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/hooks/useLocalization';

const VerifyEmail: React.FC = () => {
  const { t } = useLocalization();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('auth.verify_email')}</CardTitle>
        <CardDescription>{t('auth.verify_email.description', { default: 'Verify your email address to continue' })}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Email verification status will be displayed here</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">{t('auth.resend_verification', { default: 'Resend Verification Email' })}</Button>
      </CardFooter>
    </Card>
  );
};

export default VerifyEmail;
