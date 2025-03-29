
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PublicLayout from '@/layouts/PublicLayout';

const Login: React.FC = () => {
  // Esta es una implementación básica sin validación real
  // La implementación completa con AuthContext y RHF/Zod se hará en funcionalidades futuras
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted');
  };
  
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">
              Ingresa tus credenciales para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="usuario@ejemplo.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input id="password" type="password" placeholder="••••••••" required />
              </div>
              <Button type="submit" className="w-full">
                Iniciar Sesión
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              ¿No tienes una cuenta?{' '}
              <Link to="/auth/register" className="text-primary hover:underline">
                Regístrate
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </PublicLayout>
  );
};

export default Login;
