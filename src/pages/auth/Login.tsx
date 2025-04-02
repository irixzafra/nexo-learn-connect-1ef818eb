
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/hooks/useLocalization';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const { t, localizeUrl } = useLocalization();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('auth.login')}</CardTitle>
        <CardDescription>{t('auth.login.description', { default: 'Enter your credentials to access your account' })}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Login form will be implemented here</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full">{t('auth.login')}</Button>
        <div className="text-sm text-center text-muted-foreground">
          {t('auth.no_account', { default: "Don't have an account?" })}{' '}
          <Link to={localizeUrl('/auth/register')} className="text-primary hover:underline">
            {t('auth.register')}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Login;
