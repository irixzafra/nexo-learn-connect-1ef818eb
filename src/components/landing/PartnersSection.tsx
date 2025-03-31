
import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  { 
    name: "TechCorp", 
    logo: "https://via.placeholder.com/150x60?text=TechCorp" 
  },
  { 
    name: "DesignStudio", 
    logo: "https://via.placeholder.com/150x60?text=DesignStudio" 
  },
  { 
    name: "WebMasters", 
    logo: "https://via.placeholder.com/150x60?text=WebMasters" 
  },
  { 
    name: "CreativeAgency", 
    logo: "https://via.placeholder.com/150x60?text=CreativeAgency" 
  },
  { 
    name: "ArtCollective", 
    logo: "https://via.placeholder.com/150x60?text=ArtCollective" 
  }
];

const PartnersSection: React.FC = () => {
  return (
    <section className="py-16 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-2">Confían en nosotros</h2>
          <p className="text-muted-foreground">
            Colaboramos con empresas líderes del sector creativo
          </p>
        </div>

        <motion.div 
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {partners.map((partner, index) => (
            <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
              <img 
                src={partner.logo} 
                alt={`${partner.name} - Partner de Nexo`} 
                className="h-12 md:h-16 w-auto" 
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
