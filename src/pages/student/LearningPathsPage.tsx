
import React from 'react';
import { motion } from 'framer-motion';
import { Route, BookOpen, GraduationCap, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/AppLayout';

const LearningPathsPage: React.FC = () => {
  const paths = [
    {
      id: '1',
      title: 'Desarrollo Web Full-Stack',
      description: 'Aprende a construir aplicaciones web completas desde frontend hasta backend',
      courses: 5,
      duration: '6 meses',
      level: 'Intermedio',
      categories: ['web', 'programming'],
      image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Desarrollo+Web'
    },
    {
      id: '2',
      title: 'Ciencia de Datos',
      description: 'Domina herramientas y técnicas para análisis avanzado de datos',
      courses: 4,
      duration: '5 meses',
      level: 'Avanzado',
      categories: ['data', 'programming'],
      image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Ciencia+de+Datos'
    },
    {
      id: '3',
      title: 'Marketing Digital',
      description: 'Estrategias modernas para alcanzar audiencias en digital',
      courses: 3,
      duration: '3 meses',
      level: 'Principiante',
      categories: ['marketing', 'business'],
      image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Marketing+Digital'
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <Route className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Rutas de Aprendizaje</h1>
          </div>
          <Button variant="outline" size="sm">
            Filtrar
          </Button>
        </div>
        <p className="text-muted-foreground">
          Completa una ruta estructurada de cursos para dominar un área específica de conocimiento
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paths.map((path, index) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
          >
            <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300">
              <div className="aspect-video relative">
                <img src={path.image} alt={path.title} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{path.description}</p>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-4">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span>{path.courses} cursos</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span>{path.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{path.level}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    {path.categories.map(cat => (
                      <Badge key={cat} variant="outline" className="capitalize">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm">Ver ruta</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LearningPathsPage;
