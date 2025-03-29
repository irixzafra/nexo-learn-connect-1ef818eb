
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PublicLayout from '@/layouts/PublicLayout';

const Register: React.FC = () => {
  // Esta es una implementación básica sin validación real
  // La implementación completa con AuthContext y RHF/Zod se hará en funcionalidades futuras
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register form submitted');
  };
  
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Crear Cuenta</CardTitle>
            <CardDescription className="text-center">
              Crea tu cuenta para empezar a aprender con Nexo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input id="fullName" placeholder="Juan Pérez" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="usuario@ejemplo.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" placeholder="••••••••" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passwordConfirm">Confirmar Contraseña</Label>
                <Input id="passwordConfirm" type="password" placeholder="••••••••" required />
              </div>
              <Button type="submit" className="w-full">
                Registrarse
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/auth/login" className="text-primary hover:underline">
                Inicia Sesión
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </PublicLayout>
  );
};

export default Register;
