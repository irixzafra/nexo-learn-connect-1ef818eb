
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarIcon, Users, Clock, ArrowRight } from 'lucide-react';

interface FeaturedCourseCardProps {
  course: {
    id: string;
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
  };
  index: number;
}

export const FeaturedCourseCard: React.FC<FeaturedCourseCardProps> = ({ course, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden h-full hover:shadow-md transition-all group">
        <div className="relative overflow-hidden bg-muted">
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-primary rounded-full px-2.5 py-1 text-xs font-medium text-primary-foreground">
              {course.level}
            </div>
          </div>
          <Link to={`/courses/${course.id}`}>
            <div className="aspect-video overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </Link>
        </div>
        
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <Link to={`/courses/${course.id}`} className="hover:text-primary transition-colors">
              <h3 className="font-bold text-xl line-clamp-2">{course.title}</h3>
            </Link>
            
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {course.description}
            </p>
            
            <div className="flex items-center text-sm">
              <div className="flex items-center space-x-1 text-amber-500">
                <StarIcon className="h-4 w-4 fill-current" />
                <span className="font-medium">{course.rating}</span>
              </div>
              
              <span className="mx-2 text-muted-foreground">•</span>
              
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{course.students} estudiantes</span>
              </div>
              
              <span className="mx-2 text-muted-foreground">•</span>
              
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{course.hours} horas</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
              <div className="text-lg font-bold">
                {course.price === 0 ? 'Gratis' : `${course.price.toFixed(2).replace('.', ',')} €`}
              </div>
              
              <Button variant="ghost" size="sm" className="group" asChild>
                <Link to={`/courses/${course.id}`}>
                  Ver curso
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
