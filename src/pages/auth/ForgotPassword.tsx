
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/hooks/useLocalization';

const ForgotPassword: React.FC = () => {
  const { t } = useLocalization();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('auth.forgot_password')}</CardTitle>
        <CardDescription>{t('auth.forgot_password.description', { default: 'Enter your email to reset your password' })}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Password reset request form will be implemented here</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">{t('auth.send_reset_link', { default: 'Send Reset Link' })}</Button>
      </CardFooter>
    </Card>
  );
};

export default ForgotPassword;
