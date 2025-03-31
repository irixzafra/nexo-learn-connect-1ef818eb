
import { PageBlock } from '@/types/pages';

// Función que simula la generación de contenido con IA
// En una implementación real, esta sería una llamada a una API de IA
export const generateContentWithAI = async (prompt: string, template: string): Promise<PageBlock[]> => {
  // Simulamos un tiempo de espera para la respuesta de la IA
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generamos bloques diferentes según la plantilla seleccionada
  let blocks: PageBlock[] = [];
  
  if (template === 'landing') {
    blocks = [
      {
        id: `block-${Date.now()}-1`,
        type: 'hero',
        content: '¡Bienvenido a nuestra plataforma innovadora!'
      },
      {
        id: `block-${Date.now()}-2`,
        type: 'text',
        content: 'Descubre todas las posibilidades que tenemos para ofrecerte con nuestra solución única y adaptada a tus necesidades.'
      },
      {
        id: `block-${Date.now()}-3`,
        type: 'cta',
        content: 'Empieza ahora'
      }
    ];
  } else if (template === 'about') {
    blocks = [
      {
        id: `block-${Date.now()}-1`,
        type: 'hero',
        content: 'Conoce nuestro equipo y misión'
      },
      {
        id: `block-${Date.now()}-2`,
        type: 'text',
        content: 'Somos una empresa comprometida con la excelencia y la innovación, trabajando día a día para ofrecer las mejores soluciones a nuestros clientes.'
      }
    ];
  } else {
    // Para el resto de plantillas o personalizado, usamos el prompt para generar contenido
    blocks = [
      {
        id: `block-${Date.now()}-1`,
        type: 'hero',
        content: `${prompt.split(' ').slice(0, 7).join(' ')}...`
      },
      {
        id: `block-${Date.now()}-2`,
        type: 'text',
        content: prompt
      }
    ];
  }
  
  return blocks;
};
