
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export interface FeaturedCourse {
  id: number;
  title: string;
  description: string;
  instructor: string;
  price: number;
  rating: number;
  students: number;
  hours: number;
  level: string;
  category: string;
  image: string;
}

interface FeaturedCourseCardProps {
  course: FeaturedCourse;
  index: number;
}

export const FeaturedCourseCard: React.FC<FeaturedCourseCardProps> = ({ course, index }) => {
  return (
    <motion.div
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
  );
};
