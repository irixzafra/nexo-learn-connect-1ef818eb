
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LandingNav from '@/components/LandingNav';
import LandingFooter from '@/components/landing/LandingFooter';

const CookiesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingNav />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Política de Cookies</h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p className="lead">
              Esta Política de Cookies explica cómo Nexo Ecosistema Creativo utiliza cookies y tecnologías similares 
              para reconocerlo cuando visita nuestra plataforma.
            </p>
            
            <h2>1. ¿Qué son las Cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. 
              Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente, así como para 
              proporcionar información a los propietarios del sitio.
            </p>
            
            <h2>2. Tipos de Cookies que Utilizamos</h2>
            <p>
              Utilizamos los siguientes tipos de cookies:
            </p>
            <ul>
              <li><strong>Cookies Esenciales:</strong> Necesarias para el funcionamiento básico de la plataforma.</li>
              <li><strong>Cookies de Preferencias:</strong> Permiten recordar información que cambia el comportamiento o aspecto de la plataforma.</li>
              <li><strong>Cookies Estadísticas:</strong> Nos ayudan a entender cómo los visitantes interactúan con la plataforma.</li>
              <li><strong>Cookies de Marketing:</strong> Utilizadas para rastrear a los visitantes en los sitios web con el objetivo de mostrar anuncios relevantes.</li>
            </ul>
            
            <h2>3. Cómo Gestionamos las Cookies</h2>
            <p>
              Al acceder por primera vez a nuestra plataforma, se le solicitará que acepte o rechace el uso de cookies no esenciales. 
              Puede cambiar sus preferencias en cualquier momento a través del banner de cookies en la parte inferior de la página.
            </p>
            
            <h2>4. Cómo Deshabilitar las Cookies</h2>
            <p>
              Puede configurar su navegador para que rechace todas o algunas cookies, o para que le alerte cuando los sitios web configuren 
              o accedan a cookies. Si deshabilita o rechaza las cookies, tenga en cuenta que algunas partes de nuestra plataforma pueden 
              volverse inaccesibles o no funcionar correctamente.
            </p>
            
            <h2>5. Cookies de Terceros</h2>
            <p>
              Algunos de nuestros socios comerciales pueden utilizar cookies en nuestra plataforma para diversos fines. No tenemos 
              acceso ni control sobre estas cookies. Esta política de cookies cubre solo el uso de cookies por parte de Nexo Ecosistema Creativo.
            </p>
            
            <h2>6. Cambios en la Política de Cookies</h2>
            <p>
              Podemos actualizar nuestra Política de Cookies ocasionalmente. La versión más reciente estará siempre disponible en nuestra plataforma.
            </p>
            
            <h2>7. Contacto</h2>
            <p>
              Si tiene alguna pregunta sobre nuestra Política de Cookies, por favor contáctenos a:
            </p>
            <p>
              Email: <a href="mailto:privacidad@nexo.com">privacidad@nexo.com</a><br />
              Teléfono: +34 91 123 45 67
            </p>
            
            <p className="text-sm text-muted-foreground mt-12">
              Última actualización: 15 de junio de 2023
            </p>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button asChild>
              <Link to="/">Volver a la página principal</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <LandingFooter />
    </div>
  );
};

export default CookiesPage;
