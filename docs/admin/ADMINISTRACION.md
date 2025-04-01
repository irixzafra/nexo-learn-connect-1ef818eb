
# Guía de Administración de Nexo Learning

## Introducción

Este documento describe la estructura y funcionalidades del sistema de administración de Nexo Learning. El sistema de administración permite gestionar todos los aspectos de la plataforma, desde usuarios y cursos hasta configuraciones técnicas y analíticas.

## Estructura de Navegación

El sistema de administración utiliza una estructura de navegación simplificada con un máximo de dos niveles de profundidad para mejorar la usabilidad y el SEO.

### Estructura General

```
/admin/[funcionalidad]
```

Donde `[funcionalidad]` corresponde a una de las áreas específicas de administración.

### Áreas Principales

1. **Dashboard** (`/admin/dashboard`)
   - Resumen general del sistema
   - Estadísticas clave
   - Alertas y notificaciones importantes

2. **Usuarios** (`/admin/users`)
   - Gestión de usuarios
   - Gestión de roles
   - Analíticas de usuarios

3. **Cursos** (`/admin/courses`)
   - Catálogo de cursos
   - Categorías
   - Rutas de aprendizaje
   - Certificados

4. **Finanzas** (`/admin/finance`)
   - Dashboard financiero
   - Facturas
   - Suscripciones
   - Alertas financieras

5. **Analíticas** (`/admin/analytics`)
   - Métricas de uso
   - Comportamiento de usuarios
   - Rendimiento de cursos
   - Reportes personalizados

6. **Configuración** (`/admin/settings`)
   - Configuración general
   - Características y flags
   - Diseño y personalización
   - Integración con servicios externos

7. **Roles** (`/admin/roles`)
   - Gestión de roles del sistema
   - Asignación de permisos

## Transición desde el Sistema Anterior

El sistema de administración ha sido rediseñado para utilizar una estructura de navegación simplificada con un máximo de dos niveles. Todas las rutas anteriores que tenían más de dos niveles han sido rediseñadas para ajustarse a este nuevo patrón.

### Mapeo de Rutas Antiguas a Nuevas

| Ruta Antigua | Ruta Nueva |
|--------------|------------|
| `/admin/settings/features` | `/admin/features` |
| `/admin/users/roles/permissions` | `/admin/roles` |
| `/admin/courses/categories` | `/admin/categories` |
| `/admin/finance/reports/annual` | `/admin/finance` |

## Guía de Implementación

Para implementar nuevas funcionalidades en el sistema de administración, siga estos lineamientos:

1. **Estructura de Archivos**:
   - Cree componentes en `/components/admin/[funcionalidad]/`
   - Implemente páginas en `/pages/admin/[funcionalidad].tsx`
   - Use hooks específicos en `/hooks/use[Funcionalidad].ts`

2. **Patrones de Diseño**:
   - Utilice el componente `AdminPageLayout` para todas las páginas de administración
   - Implemente tabs con `AdminNavTabs` para organizar contenido relacionado
   - Use componentes de shadcn/ui para la interfaz

3. **Control de Acceso**:
   - Todas las rutas de administración deben estar protegidas con el componente `ProtectedRoute`
   - Especifique los roles permitidos (admin, sistemas) en cada ruta

## Ejemplo de Implementación

```tsx
// pages/admin/example.tsx
import React from 'react';
import AdminPageLayout from '@/layouts/AdminPageLayout';
import { AdminTabItem } from '@/components/shared/AdminNavTabs';
import { ExampleTab } from '@/features/admin/components/example/ExampleTab';
import { Settings } from 'lucide-react';

const ExamplePage: React.FC = () => {
  const tabs: AdminTabItem[] = [
    {
      value: 'main',
      label: 'Principal',
      icon: <Settings className="h-4 w-4" />,
      content: <ExampleTab />
    }
  ];

  return (
    <AdminPageLayout
      title="Ejemplo"
      subtitle="Esta es una página de ejemplo"
      tabs={tabs}
      defaultTabValue="main"
    />
  );
};

export default ExamplePage;
```

## Referencias

- [Documentación de Arquitectura del Sistema](../NEXO_SYSTEM_ARCHITECTURE.md)
- [Estructura de Navegación Actualizada](../ESTRUCTURA_NAVEGACION_ACTUALIZADA.md)

---

Documento actualizado: 2023-08-15
