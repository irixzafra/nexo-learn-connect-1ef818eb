
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LandingNav from '@/components/LandingNav';
import LandingFooter from '@/components/landing/LandingFooter';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingNav />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Términos y Condiciones</h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p className="lead">
              Los siguientes términos y condiciones ("Términos") rigen el uso de la plataforma educativa Nexo 
              ("Plataforma"), operada por Nexo Ecosistema Creativo.
            </p>
            
            <h2>1. Aceptación de los Términos</h2>
            <p>
              Al acceder o utilizar nuestra Plataforma, usted acepta estar legalmente vinculado por estos Términos. 
              Si no está de acuerdo con alguno de los términos, no debe utilizar nuestra Plataforma.
            </p>
            
            <h2>2. Cambios en los Términos</h2>
            <p>
              Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los cambios entrarán en vigor 
              inmediatamente después de su publicación en la Plataforma. Su uso continuado de la Plataforma después de 
              cualquier cambio constituye su aceptación de los nuevos Términos.
            </p>
            
            <h2>3. Uso de la Plataforma</h2>
            <p>
              Al utilizar nuestra Plataforma, usted acepta:
            </p>
            <ul>
              <li>Proporcionar información precisa y completa durante el proceso de registro</li>
              <li>Mantener la confidencialidad de su contraseña</li>
              <li>Ser responsable de todas las actividades realizadas bajo su cuenta</li>
              <li>No utilizar la Plataforma para fines ilegales o no autorizados</li>
              <li>No intentar interferir con el funcionamiento adecuado de la Plataforma</li>
            </ul>
            
            <h2>4. Contenido del Usuario</h2>
            <p>
              Al enviar contenido a nuestra Plataforma, usted:
            </p>
            <ul>
              <li>Garantiza que tiene derecho a compartir dicho contenido</li>
              <li>Otorga a Nexo una licencia mundial, no exclusiva, libre de regalías para usar, reproducir, modificar, adaptar, publicar, traducir y distribuir dicho contenido</li>
              <li>Acepta que Nexo puede eliminar cualquier contenido que viole estos Términos o que consideremos inapropiado</li>
            </ul>
            
            <h2>5. Derechos de Propiedad Intelectual</h2>
            <p>
              Todo el contenido, características y funcionalidad de la Plataforma son propiedad de Nexo y están 
              protegidos por leyes de propiedad intelectual. No está permitido reproducir, distribuir, modificar, 
              crear obras derivadas, mostrar públicamente o utilizar de cualquier otra manera el contenido de la 
              Plataforma sin nuestro consentimiento previo por escrito.
            </p>
            
            <h2>6. Enlaces a Terceros</h2>
            <p>
              Nuestra Plataforma puede contener enlaces a sitios web de terceros. No somos responsables del contenido 
              o las prácticas de privacidad de estos sitios. Le recomendamos revisar los términos y políticas de 
              privacidad de cualquier sitio web de terceros que visite.
            </p>
            
            <h2>7. Limitación de Responsabilidad</h2>
            <p>
              En ningún caso Nexo será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, 
              incluyendo, entre otros, la pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles.
            </p>
            
            <h2>8. Ley Aplicable</h2>
            <p>
              Estos Términos se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta sus 
              conflictos de disposiciones legales.
            </p>
            
            <h2>9. Contacto</h2>
            <p>
              Si tiene alguna pregunta sobre estos Términos, por favor contáctenos a:
            </p>
            <p>
              Email: <a href="mailto:legal@nexo.com">legal@nexo.com</a><br />
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

export default TermsPage;
