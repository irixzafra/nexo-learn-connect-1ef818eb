
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Datos de testimonios
const testimonials = [
  {
    id: 1,
    content: "Los cursos de Nexo transformaron mi carrera creativa. La calidad del contenido y el apoyo de la comunidad son excepcionales.",
    author: "Marina López",
    role: "Diseñadora UX/UI",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5
  },
  {
    id: 2,
    content: "Como profesional del marketing digital, encontré en Nexo los recursos exactos que necesitaba para actualizar mis conocimientos.",
    author: "Carlos Martínez",
    role: "Marketing Manager",
    avatar: "https://i.pravatar.cc/150?img=52",
    rating: 5
  },
  {
    id: 3,
    content: "La combinación de teoría y práctica en los cursos de desarrollo web me permitió aplicar lo aprendido inmediatamente en mi trabajo.",
    author: "Laura Sánchez",
    role: "Desarrolladora Frontend",
    avatar: "https://i.pravatar.cc/150?img=29",
    rating: 4
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros alumnos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Miles de profesionales han mejorado sus habilidades con nuestros cursos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-sm border border-border/50 flex flex-col"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-foreground mb-6 flex-grow">"{testimonial.content}"</p>
              
              <div className="flex items-center mt-auto">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                  <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
