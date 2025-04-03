
import React from 'react';
import PublicNavigation from '@/components/navigation/PublicNavigation';

interface PublicLayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ 
  children,
  hideNavigation = false
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
      
      <footer className="border-t py-6 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium text-base mb-2">Acerca de</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><a href="/about-us" className="hover:underline">Nuestra Misión</a></li>
                <li><a href="/about-us" className="hover:underline">Equipo</a></li>
                <li><a href="/contact" className="hover:underline">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-base mb-2">Aprendizaje</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><a href="/courses" className="hover:underline">Cursos</a></li>
                <li><a href="/learning-paths" className="hover:underline">Rutas de Aprendizaje</a></li>
                <li><a href="/certificates/verification-portal" className="hover:underline">Verificar Certificados</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-base mb-2">Legal</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><a href="/terms" className="hover:underline">Términos de Uso</a></li>
                <li><a href="/privacy" className="hover:underline">Política de Privacidad</a></li>
                <li><a href="/cookies" className="hover:underline">Política de Cookies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-base mb-2">Ayuda</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li><a href="/help" className="hover:underline">Centro de Ayuda</a></li>
                <li><a href="/scholarships" className="hover:underline">Becas</a></li>
                <li><a href="/accessibility" className="hover:underline">Accesibilidad</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Nexo Learning. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
