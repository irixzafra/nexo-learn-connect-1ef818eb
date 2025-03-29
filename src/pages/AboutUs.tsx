
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { motion } from 'framer-motion';

const AboutUs: React.FC = () => {
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
            Sobre Nosotros
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Somos un ecosistema educativo de creatividad digital. Más que una plataforma, somos una comunidad.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="rounded-lg overflow-hidden mb-6">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Personas trabajando" 
                className="w-full h-auto object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold mb-4">Nuestra Misión</h2>
            <p className="text-muted-foreground">
              En Nexo, nos dedicamos a proporcionar educación de alta calidad accesible para todos.
              Creemos que el conocimiento debe ser compartido y que el aprendizaje es un proceso continuo.
              Nuestra misión es empoderar a los estudiantes con las habilidades necesarias para destacar
              en el mundo digital actual.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="rounded-lg overflow-hidden mb-6">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
                alt="Nuestro espacio" 
                className="w-full h-auto object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold mb-4">Nuestra Visión</h2>
            <p className="text-muted-foreground">
              Aspiramos a ser la plataforma educativa líder en creatividad y tecnología.
              Visualizamos un futuro donde el aprendizaje no tiene fronteras y donde cada estudiante
              puede alcanzar su máximo potencial a través de educación personalizada y de calidad.
              En Nexo, el futuro de la educación está aquí.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="bg-accent rounded-lg p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Innovación</h3>
              <p className="text-muted-foreground">Constantemente buscamos nuevas formas de enseñar y aprender, adaptándonos a las necesidades cambiantes del mundo digital.</p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Comunidad</h3>
              <p className="text-muted-foreground">Creemos en el poder de la colaboración y el aprendizaje conjunto. En Nexo, eres parte de una comunidad global.</p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Excelencia</h3>
              <p className="text-muted-foreground">Nos comprometemos a ofrecer contenido de la más alta calidad y experiencias educativas excepcionales.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <h2 className="text-2xl font-bold mb-6">Nuestro Equipo</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
            Somos un equipo diverso de educadores, diseñadores, desarrolladores y apasionados
            por la educación y la tecnología. Juntos, trabajamos para crear la mejor experiencia
            de aprendizaje posible.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'María Rodríguez', role: 'CEO & Fundadora', avatar: 'https://i.pravatar.cc/150?img=1' },
              { name: 'Carlos Gutiérrez', role: 'Director Académico', avatar: 'https://i.pravatar.cc/150?img=3' },
              { name: 'Ana López', role: 'Directora de Tecnología', avatar: 'https://i.pravatar.cc/150?img=5' },
              { name: 'Juan Martínez', role: 'Director Creativo', avatar: 'https://i.pravatar.cc/150?img=7' }
            ].map((member, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-accent">
                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PublicLayout>
  );
};

export default AboutUs;
