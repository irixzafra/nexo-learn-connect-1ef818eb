
import { useState } from 'react';
import { PageBlockType } from '@/types/pages';
import { toast } from 'sonner';

interface UseAIContentGenerationOptions {
  apiEndpoint?: string;
}

export function useAIContentGeneration(options?: UseAIContentGenerationOptions) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiEndpoint = options?.apiEndpoint || '/api/content-generation';

  const generateContent = async (prompt: string, blockType: PageBlockType): Promise<string | Record<string, any> | null> => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Aquí simularemos la generación de contenido con IA
      // En producción, aquí harías una llamada a tu API (OpenAI, etc.)
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulamos respuesta de API
      
      let generatedContent: string | Record<string, any>;
      
      // Generamos contenido basado en el tipo de bloque
      switch (blockType) {
        case 'text':
          generatedContent = `Este es un texto generado automáticamente basado en tu petición: "${prompt}". La IA ha procesado tu solicitud y ha creado este párrafo informativo que puedes personalizar según tus necesidades.`;
          break;
          
        case 'hero':
          generatedContent = `${prompt} - Título generado por IA`;
          break;
          
        case 'features':
          generatedContent = {
            title: `${prompt} - Título generado por IA`,
            items: [
              { 
                title: 'Característica 1', 
                description: 'Descripción generada automáticamente para la primera característica.' 
              },
              { 
                title: 'Característica 2', 
                description: 'Descripción generada automáticamente para la segunda característica.' 
              },
              { 
                title: 'Característica 3', 
                description: 'Descripción generada automáticamente para la tercera característica.' 
              }
            ]
          };
          break;
          
        case 'cta':
          generatedContent = {
            title: `${prompt} - Título CTA`,
            subtitle: 'Subtítulo generado automáticamente para tu llamada a la acción',
            buttonText: '¡Comenzar ahora!',
            buttonUrl: '#'
          };
          break;
          
        case 'testimonials':
          generatedContent = {
            title: 'Testimonios de clientes satisfechos',
            items: [
              { 
                name: 'Ana García', 
                position: 'CEO', 
                company: 'Empresa ABC', 
                comment: `Comentario generado basado en: "${prompt}"` 
              },
              { 
                name: 'Carlos López', 
                position: 'Director de Marketing', 
                company: 'Empresa XYZ', 
                comment: 'Otro comentario positivo generado automáticamente.' 
              }
            ]
          };
          break;
          
        case 'faq':
          generatedContent = {
            title: 'Preguntas frecuentes',
            items: [
              { 
                question: '¿Primera pregunta relacionada con tu solicitud?', 
                answer: `Respuesta generada automáticamente sobre: "${prompt}"` 
              },
              { 
                question: '¿Segunda pregunta común en este contexto?', 
                answer: 'Segunda respuesta generada automáticamente.' 
              },
              { 
                question: '¿Tercera pregunta relevante?', 
                answer: 'Tercera respuesta generada automáticamente.' 
              }
            ]
          };
          break;
          
        default:
          generatedContent = `Contenido generado para bloque tipo ${blockType}: ${prompt}`;
      }
      
      return generatedContent;
    } catch (err) {
      console.error('Error generando contenido:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      toast.error(`Error al generar contenido: ${errorMessage}`);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateContent,
    isGenerating,
    error
  };
}
