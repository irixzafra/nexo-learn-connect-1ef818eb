
import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Laptop } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Estudiantes activos"
  },
  {
    icon: BookOpen,
    value: "200+",
    label: "Cursos disponibles"
  },
  {
    icon: Award,
    value: "95%",
    label: "Tasa de satisfacción"
  },
  {
    icon: Laptop,
    value: "24/7",
    label: "Soporte personalizado"
  }
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-muted/30 rounded-lg p-6 text-center flex flex-col items-center"
            >
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
