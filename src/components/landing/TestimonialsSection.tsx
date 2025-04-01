
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      content: "Gracias a los cursos de Nexo Learning he podido cambiar de carrera y entrar en el sector tech. Su plataforma es intuitiva y los contenidos de gran calidad.",
      author: "María García",
      position: "Frontend Developer",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      stars: 5
    },
    {
      content: "Lo que diferencia a esta plataforma es la calidad de los instructores y el enfoque práctico. He aplicado lo aprendido desde el primer día en mi trabajo.",
      author: "Carlos Rodríguez",
      position: "Project Manager",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: 5
    },
    {
      content: "El mejor dinero que he invertido en mi educación. Los cursos son completos y el soporte es excepcional cuando tienes dudas.",
      author: "Ana Martínez",
      position: "Data Analyst",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      stars: 5
    },
    {
      content: "Estudiar en Nexo Learning mientras trabajaba ha sido sencillo gracias a su formato flexible. Los contenidos son actuales y muy relevantes.",
      author: "David López",
      position: "UX Designer",
      image: "https://randomuser.me/api/portraits/men/86.jpg",
      stars: 4
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
            <Quote className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo que dicen nuestros estudiantes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nuestro mayor orgullo es el éxito de quienes confían en nosotros para su formación.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-2 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.stars ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <blockquote className="text-lg mb-6">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Video Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-background rounded-xl overflow-hidden shadow-lg border"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">La historia de Roberto</h3>
              <p className="text-lg text-muted-foreground mb-6">
                "De no tener experiencia en programación a conseguir un puesto como desarrollador en menos de 8 meses. Los cursos de Nexo Learning transformaron mi carrera profesional y mi vida."
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://randomuser.me/api/portraits/men/44.jpg"
                  alt="Roberto Fernández"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">Roberto Fernández</div>
                  <div className="text-sm text-muted-foreground">Full Stack Developer</div>
                </div>
              </div>
            </div>
            <div className="relative aspect-video bg-black">
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1806&q=80" 
                  alt="Roberto trabajando" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-primary bg-opacity-80 flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-colors">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -z-10 top-20 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -z-10 bottom-20 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default TestimonialsSection;
