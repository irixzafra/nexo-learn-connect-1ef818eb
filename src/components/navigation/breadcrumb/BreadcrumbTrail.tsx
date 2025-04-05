
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';
import { useBreadcrumbs } from './useBreadcrumbs';

export interface BreadcrumbTrailProps {
  className?: string;
  homeLink?: string;
  separator?: React.ReactNode;
}

export const BreadcrumbTrail: React.FC<BreadcrumbTrailProps> = ({
  className,
  homeLink = '/',
  separator,
}) => {
  const location = useLocation();
  const { breadcrumbs, isLoading } = useBreadcrumbs(location.pathname);

  // No renderizar breadcrumbs en la página de inicio o mientras se cargan
  if (location.pathname === homeLink || isLoading || breadcrumbs.length === 0) {
    return null;
  }

  // Determinar cuántos items mostrar basado en espacio disponible
  // En mobile mostramos menos items
  const isMobile = window.innerWidth < 768;
  const maxVisibleItems = isMobile ? 2 : 4;
  const needsEllipsis = breadcrumbs.length > maxVisibleItems;
  
  // Calcular qué items mostrar
  let visibleItems = [...breadcrumbs];
  if (needsEllipsis) {
    // Siempre mostrar el primero y los últimos según maxVisibleItems-1
    visibleItems = [
      breadcrumbs[0],
      ...breadcrumbs.slice(-(maxVisibleItems - 1))
    ];
  }

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {/* Inicio */}
        <BreadcrumbItem>
          <BreadcrumbLink href={homeLink}>
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Inicio</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
        
        {/* Ellipsis si hay muchos items */}
        {needsEllipsis && (
          <>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
          </>
        )}
        
        {/* Items visibles */}
        {visibleItems.map((crumb, index) => {
          const isLastItem = index === visibleItems.length - 1;
          
          return (
            <React.Fragment key={crumb.path || index}>
              <BreadcrumbItem>
                {isLastItem ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.path || '#'}>
                    {crumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLastItem && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbTrail;
