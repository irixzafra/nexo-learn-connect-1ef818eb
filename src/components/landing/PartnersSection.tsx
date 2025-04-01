
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Star } from 'lucide-react';

const PartnersSection: React.FC = () => {
  const partners = [
    { name: 'TechCorp', logo: 'https://logos-world.net/wp-content/uploads/2020/11/IBM-Logo-700x394.png' },
    { name: 'GlobalLearn', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-microsoft-26-722716.png' },
    { name: 'EduTech', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png' },
    { name: 'FutureLabs', logo: 'https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png' },
    { name: 'LearnWave', logo: 'https://cdn-icons-png.flaticon.com/512/882/882704.png' },
    { name: 'InnovateU', logo: 'https://cdn-icons-png.flaticon.com/512/5969/5969113.png' },
  ];

  const testimonials = [
    {
      quote: "La colaboración con Nexo Learning ha permitido a nuestros empleados adquirir habilidades digitales críticas en tiempo récord.",
      author: "Elena Ramírez",
      position: "Directora de Talento, TechCorp",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "Los programas formativos desarrollados conjuntamente han elevado significativamente la calidad de nuestros servicios educativos.",
      author: "Alejandro Torres",
      position: "CEO, EduTech Solutions",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  ];

  const features = [
    { icon: <Shield className="h-5 w-5" />, title: "Certificación oficial", description: "Todos nuestros cursos están acreditados por instituciones reconocidas" },
    { icon: <Star className="h-5 w-5" />, title: "Profesores de élite", description: "Contamos con los mejores profesionales de la industria" },
    { icon: <CheckCircle className="h-5 w-5" />, title: "Contenido actualizado", description: "Materiales revisados y actualizados constantemente" },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Respaldados por líderes de la industria</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Colaboramos con empresas de referencia para ofrecer la formación más relevante y actualizada del mercado.
          </p>
        </motion.div>
        
        {/* Partners Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center mb-20">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center p-4 h-24 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`}
                className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
        
        {/* Trust Features */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-background border border-border p-6 rounded-xl shadow-sm mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-background border border-border p-6 rounded-xl shadow-sm"
            >
              <p className="text-lg italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -z-10 bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default PartnersSection;
