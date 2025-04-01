
import { PageBlock } from '@/types/pages';

// This function would call an actual API in a real implementation
export const generateContentWithAI = async (prompt: string, template: string): Promise<PageBlock[]> => {
  console.log('Generating content with AI', { prompt, template });
  
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock content based on template
      let blocks: PageBlock[] = [];
      
      if (template === 'landing') {
        blocks = [
          {
            id: `block-${Date.now()}-1`,
            type: 'hero',
            content: 'Bienvenido a nuestra plataforma innovadora',
            order: 1
          },
          {
            id: `block-${Date.now()}-2`,
            type: 'text',
            content: 'Ofrecemos soluciones avanzadas para impulsar tu negocio al siguiente nivel.',
            order: 2
          },
          {
            id: `block-${Date.now()}-3`,
            type: 'cta',
            content: {
              title: 'Comienza hoy',
              buttonText: 'Registrarse',
              link: '/register'
            },
            order: 3
          }
        ];
      } else if (template === 'about') {
        blocks = [
          {
            id: `block-${Date.now()}-1`,
            type: 'text',
            content: 'Somos una empresa comprometida con la innovación y la excelencia.',
            order: 1
          },
          {
            id: `block-${Date.now()}-2`,
            type: 'text',
            content: 'Nuestra misión es proporcionar soluciones de alta calidad que transformen la manera en que trabajas.',
            order: 2
          }
        ];
      } else {
        // Default content for other templates
        blocks = [
          {
            id: `block-${Date.now()}-1`,
            type: 'text',
            content: `Contenido generado automáticamente para plantilla "${template}". ${prompt}`,
            order: 1
          }
        ];
      }
      
      resolve(blocks);
    }, 1500);
  });
};
