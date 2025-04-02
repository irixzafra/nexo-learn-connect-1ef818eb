
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { BookOpen, UserPlus, LogIn } from 'lucide-react';

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
          Bienvenido a Nexo Learning
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          La plataforma educativa que conecta conocimiento y personas para una experiencia de aprendizaje transformadora.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-primary" />
              Cursos
            </CardTitle>
            <CardDescription>
              Explora nuestro catálogo de cursos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Encuentra cursos diseñados por expertos en diversas áreas de conocimiento.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/courses">Ver cursos</Link>
            </Button>
          </CardContent>
        </Card>
        
        {!isAuthenticated ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="mr-2 h-5 w-5 text-primary" />
                  Registro
                </CardTitle>
                <CardDescription>
                  Únete a nuestra plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Crea una cuenta para acceder a todos nuestros recursos educativos.
                </p>
                <Button asChild className="w-full">
                  <Link to="/auth/register">Registrarse</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LogIn className="mr-2 h-5 w-5 text-primary" />
                  Inicio de Sesión
                </CardTitle>
                <CardDescription>
                  Accede a tu cuenta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  ¿Ya tienes una cuenta? Inicia sesión para continuar tu aprendizaje.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/auth/login">Iniciar sesión</Link>
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Mi Dashboard</CardTitle>
                <CardDescription>
                  Accede a tu espacio personal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Continúa tu aprendizaje y gestiona tu progreso.
                </p>
                <Button asChild className="w-full">
                  <Link to="/dashboard">Mi Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Mi Perfil</CardTitle>
                <CardDescription>
                  Gestiona tu información
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Actualiza tus datos y configura tus preferencias.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/profile">Ver perfil</Link>
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
