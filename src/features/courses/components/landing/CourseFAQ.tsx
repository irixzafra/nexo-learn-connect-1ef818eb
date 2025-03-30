
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CourseFAQProps {
  expandedFAQs: string[];
  setExpandedFAQs: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CourseFAQ: React.FC<CourseFAQProps> = ({
  expandedFAQs,
  setExpandedFAQs,
}) => {
  return (
    <Accordion 
      type="multiple" 
      value={expandedFAQs}
      onValueChange={setExpandedFAQs}
      className="w-full mb-12"
    >
      <AccordionItem value="faq-1">
        <AccordionTrigger className="hover:no-underline py-4">
          ¿Cómo accedo al contenido del curso?
        </AccordionTrigger>
        <AccordionContent>
          Una vez inscrito, podrás acceder a todo el contenido del curso desde tu panel de aprendizaje. 
          Puedes ver las lecciones a tu propio ritmo y desde cualquier dispositivo.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="faq-2">
        <AccordionTrigger className="hover:no-underline py-4">
          ¿Por cuánto tiempo tendré acceso al curso?
        </AccordionTrigger>
        <AccordionContent>
          Una vez inscrito, tendrás acceso ilimitado al curso. Puedes revisitar el contenido tantas veces como necesites.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="faq-3">
        <AccordionTrigger className="hover:no-underline py-4">
          ¿Recibiré algún certificado al completar el curso?
        </AccordionTrigger>
        <AccordionContent>
          Sí, al completar todas las lecciones y aprobar las evaluaciones correspondientes, 
          podrás descargar un certificado de finalización que valida tus conocimientos adquiridos.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="faq-4">
        <AccordionTrigger className="hover:no-underline py-4">
          ¿Cómo puedo obtener ayuda si tengo problemas?
        </AccordionTrigger>
        <AccordionContent>
          Cada lección tiene una sección de comentarios donde puedes realizar consultas. 
          También puedes contactar directamente al equipo de soporte a través de la plataforma.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
