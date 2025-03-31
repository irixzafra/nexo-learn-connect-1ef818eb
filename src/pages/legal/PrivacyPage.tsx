
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LandingNav from '@/components/LandingNav';
import LandingFooter from '@/components/landing/LandingFooter';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingNav />
      
      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p className="lead">
              En Nexo Ecosistema Creativo, valoramos y respetamos su privacidad. Esta Política de Privacidad explica cómo recopilamos, 
              utilizamos y protegemos su información personal.
            </p>
            
            <h2>1. Información que Recopilamos</h2>
            <p>
              Podemos recopilar los siguientes tipos de información:
            </p>
            <ul>
              <li>Información personal (nombre, dirección de correo electrónico, número de teléfono)</li>
              <li>Información de pago (detalles de tarjeta de crédito, dirección de facturación)</li>
              <li>Información de uso (cómo interactúa con nuestra plataforma)</li>
              <li>Información técnica (dirección IP, tipo de navegador, dispositivo)</li>
            </ul>
            
            <h2>2. Cómo Utilizamos Su Información</h2>
            <p>
              Utilizamos su información para:
            </p>
            <ul>
              <li>Proporcionar y mejorar nuestros servicios</li>
              <li>Procesar pagos y gestionar su cuenta</li>
              <li>Comunicarnos con usted sobre actualizaciones o cambios en la plataforma</li>
              <li>Personalizar su experiencia y ofrecerle contenido relevante</li>
              <li>Analizar el uso de nuestra plataforma para mejorar nuestros servicios</li>
            </ul>
            
            <h2>3. Protección de Su Información</h2>
            <p>
              Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger su información personal 
              contra el acceso no autorizado, la divulgación, alteración o destrucción.
            </p>
            
            <h2>4. Compartir Su Información</h2>
            <p>
              No vendemos ni alquilamos su información personal a terceros. Podemos compartir su información con:
            </p>
            <ul>
              <li>Proveedores de servicios que nos ayudan a operar nuestra plataforma</li>
              <li>Socios comerciales con su consentimiento</li>
              <li>Autoridades legales cuando sea requerido por ley</li>
            </ul>
            
            <h2>5. Sus Derechos</h2>
            <p>
              Usted tiene derecho a:
            </p>
            <ul>
              <li>Acceder a su información personal</li>
              <li>Corregir información inexacta</li>
              <li>Solicitar la eliminación de su información</li>
              <li>Oponerse al procesamiento de su información</li>
              <li>Retirar su consentimiento en cualquier momento</li>
            </ul>
            
            <h2>6. Cookies y Tecnologías Similares</h2>
            <p>
              Utilizamos cookies y tecnologías similares para mejorar su experiencia, analizar el tráfico y personalizar 
              el contenido. Puede gestionar sus preferencias de cookies a través de la configuración de su navegador.
            </p>
            
            <h2>7. Cambios en la Política de Privacidad</h2>
            <p>
              Podemos actualizar esta Política de Privacidad ocasionalmente. La versión más reciente estará siempre 
              disponible en nuestra plataforma.
            </p>
            
            <h2>8. Contacto</h2>
            <p>
              Si tiene alguna pregunta sobre nuestra Política de Privacidad, por favor contáctenos a:
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

export default PrivacyPage;
