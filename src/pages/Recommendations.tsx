
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, BookOpen, ChevronRight, Sparkles, Filter, Trophy, ArrowUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/layouts/AppLayout';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const Recommendations = () => {
  const [activeTab, setActiveTab] = useState('personalized');
  
  // Simulated query for course recommendations
  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['recommendations', activeTab],
    queryFn: async () => {
      // This would typically fetch from your API
      // For now, we'll simulate by fetching some courses
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .limit(8);
      
      if (error) throw error;
      return data || [];
    }
  });

  // Animation settings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <AppLayout>
      <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            Recomendaciones
          </h1>
          <p className="text-muted-foreground mt-2">
            Cursos y contenido personalizado basado en tus intereses y actividad
          </p>
        </header>

        <Tabs 
          defaultValue="personalized" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid grid-cols-3 w-[400px]">
              <TabsTrigger value="personalized">Personalizadas</TabsTrigger>
              <TabsTrigger value="trending">Tendencias</TabsTrigger>
              <TabsTrigger value="paths">Rutas</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtrar
            </Button>
          </div>

          <TabsContent value="personalized">
            <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 border-muted/50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Para ti
                </CardTitle>
                <CardDescription>
                  Recomendaciones basadas en tu historial y preferencias
                </CardDescription>
              </CardHeader>
            </Card>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {recommendations?.map((course) => (
                  <RecommendationCard 
                    key={course.id} 
                    course={course} 
                    variants={itemVariants}
                  />
                ))}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="trending">
            <Card className="mb-8 bg-gradient-to-r from-orange-50 to-red-50 dark:from-slate-900 dark:to-red-950/40 border-muted/50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-orange-500" />
                  Tendencias
                </CardTitle>
                <CardDescription>
                  Los cursos más populares en este momento
                </CardDescription>
              </CardHeader>
            </Card>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardContent className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {recommendations?.map((course) => (
                  <RecommendationCard 
                    key={course.id} 
                    course={course} 
                    variants={itemVariants}
                  />
                ))}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="paths">
            <Card className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 dark:from-slate-900 dark:to-green-950/40 border-muted/50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  Rutas de Aprendizaje
                </CardTitle>
                <CardDescription>
                  Rutas completas para alcanzar tus objetivos profesionales
                </CardDescription>
              </CardHeader>
            </Card>
            
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(4)].map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader>
                      <Skeleton className="h-8 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4 overflow-x-auto pb-4">
                        {[...Array(4)].map((_, i) => (
                          <Skeleton key={i} className="h-24 w-48 flex-shrink-0" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Sample learning paths */}
                <LearningPathCard 
                  title="Desarrollo Web Full-Stack"
                  description="Domina el desarrollo web completo desde frontend hasta backend"
                  courses={recommendations?.slice(0, 4) || []}
                  variants={itemVariants}
                />
                <LearningPathCard 
                  title="Ciencia de Datos"
                  description="Aprende estadística, Python y machine learning"
                  courses={recommendations?.slice(2, 6) || []}
                  variants={itemVariants}
                />
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

const RecommendationCard = ({ course, variants }) => {
  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden h-full flex flex-col group hover:shadow-md transition-shadow">
        <div className="relative">
          <img 
            src={course.cover_image_url || 'https://placehold.co/400x200/f5f5f5/a3a3a3?text=Imagen+del+curso'} 
            alt={course.title} 
            className="w-full h-48 object-cover" 
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/70">
              {course.level || 'Todos los niveles'}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
            {course.description || 'Sin descripción disponible'}
          </p>
          <div className="flex items-center text-sm text-amber-600 dark:text-amber-400 gap-1">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-medium">{course.rating || '4.5'}</span>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t bg-muted/30">
          <Button variant="ghost" size="sm" className="w-full justify-between">
            Ver curso
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const LearningPathCard = ({ title, description, courses, variants }) => {
  return (
    <motion.div variants={variants}>
      <Card className="overflow-hidden group hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {courses.map((course) => (
              <div key={course.id} className="w-48 flex-shrink-0">
                <Card className="overflow-hidden h-full border-muted">
                  <img 
                    src={course.cover_image_url || 'https://placehold.co/200x100/f5f5f5/a3a3a3?text=Imagen+del+curso'} 
                    alt={course.title} 
                    className="w-full h-28 object-cover" 
                  />
                  <CardContent className="p-3">
                    <p className="font-medium text-sm line-clamp-2">{course.title}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t bg-muted/30">
          <Button variant="outline" size="sm" className="ml-auto gap-1">
            Ver ruta completa
            <ArrowUp className="h-3 w-3 rotate-45" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Recommendations;
