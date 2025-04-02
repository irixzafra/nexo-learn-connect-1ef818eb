
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/hooks/useLocalization';

const ResetPassword: React.FC = () => {
  const { t } = useLocalization();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('auth.reset_password')}</CardTitle>
        <CardDescription>{t('auth.reset_password.description', { default: 'Create a new password for your account' })}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>New password form will be implemented here</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">{t('auth.reset_password', { default: 'Reset Password' })}</Button>
      </CardFooter>
    </Card>
  );
};

export default ResetPassword;
