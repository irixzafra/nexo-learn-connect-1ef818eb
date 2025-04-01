
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Bienvenido{user ? `, ${user.email}` : ' a nuestra plataforma'}
        </h1>
        <p className="text-xl text-gray-600">
          Estamos felices de tenerte aquí
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Cursos</h2>
            <p className="text-gray-600 mb-4">
              Explora nuestra amplia biblioteca de cursos
            </p>
            <Button asChild className="w-full">
              <Link to="/courses">Ver cursos</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Mi aprendizaje</h2>
            <p className="text-gray-600 mb-4">
              Continúa donde lo dejaste
            </p>
            <Button asChild className="w-full">
              <Link to="/dashboard">Mi dashboard</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Comunidad</h2>
            <p className="text-gray-600 mb-4">
              Conéctate con otros estudiantes
            </p>
            <Button asChild className="w-full">
              <Link to="/community">Ir a comunidad</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">¿Nuevo en la plataforma?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Descubre todo lo que nuestra plataforma tiene para ofrecer
        </p>
        <Button asChild size="lg">
          <Link to="/explore">Comenzar exploración</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
