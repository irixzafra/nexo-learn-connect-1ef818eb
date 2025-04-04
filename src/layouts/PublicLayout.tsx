
import React from 'react';
import PublicNavigation from '@/components/navigation/PublicNavigation';
import PublicFooter from '@/components/layout/PublicFooter';
import { routeMap } from '@/utils/routeUtils';

interface PublicLayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
  hideFooter?: boolean;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ 
  children,
  hideNavigation = false,
  hideFooter = false
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavigation && (
        <header className="border-b bg-white">
          <PublicNavigation />
        </header>
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      {!hideFooter && (
        <footer className="border-t py-6 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-medium text-base mb-2">Acerca de</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><a href={routeMap.aboutUs} className="hover:underline">Nuestra Misión</a></li>
                  <li><a href={routeMap.aboutUs} className="hover:underline">Equipo</a></li>
                  <li><a href={routeMap.contact} className="hover:underline">Contacto</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-base mb-2">Aprendizaje</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><a href={routeMap.courses} className="hover:underline">Cursos</a></li>
                  <li><a href={routeMap.learningPaths} className="hover:underline">Rutas de Aprendizaje</a></li>
                  <li><a href={routeMap.certificateVerificationPortal} className="hover:underline">Verificar Certificados</a></li>
                  <li><a href={routeMap.scholarships} className="hover:underline">Becas</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-base mb-2">Legal</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><a href={routeMap.terms} className="hover:underline">Términos de Uso</a></li>
                  <li><a href={routeMap.privacy} className="hover:underline">Política de Privacidad</a></li>
                  <li><a href={routeMap.cookies} className="hover:underline">Política de Cookies</a></li>
                  <li><a href={routeMap.accessibility} className="hover:underline">Accesibilidad</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-base mb-2">Ayuda</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><a href={routeMap.help} className="hover:underline">Centro de Ayuda</a></li>
                  <li><a href={routeMap.scholarships} className="hover:underline">Becas</a></li>
                  <li><a href={routeMap.accessibility} className="hover:underline">Accesibilidad</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Nexo Learning. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PublicLayout;
