
import React from 'react';
import { motion } from 'framer-motion';

export const WelcomeStep: React.FC = () => {
  return (
    <div className="space-y-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M5 22h14"></path>
          <path d="M5 2h14"></path>
          <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
          <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
        </svg>
      </motion.div>
      
      <motion.h2 
        className="text-xl font-bold"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        ¡Bienvenido a Nexo!
      </motion.h2>
      
      <motion.p
        className="text-muted-foreground"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Estamos emocionados de tenerte con nosotros. Vamos a guiarte a través de los primeros pasos para que puedas aprovechar al máximo nuestra plataforma.
      </motion.p>
      
      <motion.div
        className="grid grid-cols-2 gap-4 mt-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-accent/50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Aprende a tu ritmo</h3>
          <p className="text-sm text-muted-foreground">Accede a cursos de alta calidad y aprende cuando y donde quieras.</p>
        </div>
        
        <div className="bg-accent/50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Comunidad activa</h3>
          <p className="text-sm text-muted-foreground">Conecta con otros estudiantes y expertos en tu área de interés.</p>
        </div>
      </motion.div>
    </div>
  );
};
