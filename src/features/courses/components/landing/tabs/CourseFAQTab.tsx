
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CourseFAQ } from "../CourseFAQ";

interface CourseFAQTabProps {
  expandedFAQs: string[];
  setExpandedFAQs: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CourseFAQTab: React.FC<CourseFAQTabProps> = ({
  expandedFAQs,
  setExpandedFAQs
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-primary" />
        Preguntas frecuentes
      </h3>
      
      <CourseFAQ 
        expandedFAQs={expandedFAQs} 
        setExpandedFAQs={setExpandedFAQs} 
      />
      
      <div className="mt-10 bg-muted/30 rounded-xl p-6 border text-center">
        <h4 className="text-lg font-semibold mb-2">¿Tienes alguna otra pregunta?</h4>
        <p className="text-muted-foreground mb-4">
          Estamos aquí para ayudarte. No dudes en contactar con nuestro equipo de soporte.
        </p>
        <Button variant="outline">Contactar soporte</Button>
      </div>
    </motion.div>
  );
};

// Icon component
const HelpCircle = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);
