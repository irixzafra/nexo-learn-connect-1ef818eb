
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PublicLayout from '@/layouts/PublicLayout';
import { Link } from 'react-router-dom';

const courseCategories = [
  "Todos", "Diseño", "Desarrollo", "Marketing", "Negocios", "Fotografía", "Música"
];

const featuredCourses = [
  {
    id: 1,
    title: "Diseño de Interfaces Modernas",
    description: "Aprende a crear interfaces atractivas y funcionales con principios de UX/UI modernos.",
    instructor: "Ana García",
    price: 129,
    rating: 4.8,
    students: 1240,
    hours: 24,
    level: "Intermedio",
    category: "Diseño",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  },
  {
    id: 2,
    title: "Desarrollo Web Fullstack",
    description: "Domina HTML, CSS, JavaScript, React, Node.js y más en este curso completo.",
    instructor: "Carlos Mendez",
    price: 199,
    rating: 4.9,
    students: 3150,
    hours: 42,
    level: "Todos los niveles",
    category: "Desarrollo",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    id: 3,
    title: "Marketing Digital Estratégico",
    description: "Estrategias efectivas de marketing digital para hacer crecer tu negocio.",
    instructor: "Laura Torres",
    price: 149,
    rating: 4.7,
    students: 1870,
    hours: 18,
    level: "Principiante",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978"
  },
  {
    id: 4,
    title: "Fotografía Profesional",
    description: "Técnicas avanzadas de fotografía para capturar momentos perfectos.",
    instructor: "Miguel Ángel",
    price: 159,
    rating: 4.6,
    students: 920,
    hours: 22,
    level: "Intermedio",
    category: "Fotografía",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
  },
  {
    id: 5,
    title: "Emprendimiento Digital",
    description: "Cómo crear y escalar negocios digitales desde cero.",
    instructor: "Elena Jiménez",
    price: 179,
    rating: 4.8,
    students: 2450,
    hours: 28,
    level: "Todos los niveles",
    category: "Negocios",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
  },
  {
    id: 6,
    title: "Desarrollo de Apps Móviles",
    description: "Crea aplicaciones nativas para iOS y Android con React Native.",
    instructor: "Roberto Sánchez",
    price: 189,
    rating: 4.9,
    students: 1650,
    hours: 36,
    level: "Avanzado",
    category: "Desarrollo",
    image: "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521"
  }
];

const Courses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("Todos");
  
  const filteredCourses = selectedCategory === "Todos" 
    ? featuredCourses 
    : featuredCourses.filter(course => course.category === selectedCategory);

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <motion.h1 
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Explora Nuestros Cursos
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Descubre contenido educativo de alta calidad creado por expertos en la industria
          </motion.p>
        </div>

        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {courseCategories.map((category, index) => (
            <Button
              key={index}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                        {course.title}
                      </CardTitle>
                      <CardDescription className="text-sm mt-1">
                        Por {course.instructor}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3 mb-4">
                    {course.description}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{course.students} estudiantes</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{course.hours} horas</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between items-center">
                  <div className="font-bold text-lg">€{course.price}</div>
                  <Button asChild>
                    <Link to={`/courses/${course.id}`}>Ver Detalles</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg">Cargar Más Cursos</Button>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Courses;
