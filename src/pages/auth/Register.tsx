
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/hooks/useLocalization';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const { t, localizeUrl } = useLocalization();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('auth.register')}</CardTitle>
        <CardDescription>{t('auth.register.description', { default: 'Create a new account' })}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Registration form will be implemented here</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full">{t('auth.register')}</Button>
        <div className="text-sm text-center text-muted-foreground">
          {t('auth.have_account', { default: 'Already have an account?' })}{' '}
          <Link to={localizeUrl('/auth/login')} className="text-primary hover:underline">
            {t('auth.login')}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Register;
