
# Componentes de Navegación

Esta sección documenta los componentes de navegación reutilizables en Nexo Learning.

## NavItem

Componente para enlaces de navegación individuales.

### Props

| Nombre      | Tipo           | Por defecto | Descripción                                    |
|-------------|----------------|-------------|------------------------------------------------|
| to          | string         | Requerido   | URL de destino                                 |
| icon        | LucideIcon     | Requerido   | Componente de icono                            |
| label       | string         | Requerido   | Texto del enlace                               |
| badge       | number/string  | -           | Número o texto para badge                      |
| isCollapsed | boolean        | false       | Si está en modo colapsado                      |
| disabled    | boolean        | false       | Si el enlace está deshabilitado                |
| className   | string         | -           | Clases adicionales                             |
| external    | boolean        | false       | Si el enlace es externo                        |
| description | string         | -           | Descripción para tooltip                       |

### Ejemplo

```tsx
import { Home } from 'lucide-react';
import NavItem from '@/components/navigation/NavItem';

<NavItem 
  to="/dashboard" 
  icon={Home} 
  label="Dashboard" 
  badge={3} 
/>
```

## NavGroup

Componente para agrupar enlaces de navegación.

### Props

| Nombre         | Tipo           | Por defecto | Descripción                                    |
|----------------|----------------|-------------|------------------------------------------------|
| title          | string         | Requerido   | Título del grupo                               |
| icon           | LucideIcon     | -           | Icono opcional para el grupo                   |
| children       | ReactNode      | Requerido   | Elementos hijos (NavItems)                     |
| defaultExpanded| boolean        | true        | Si el grupo debe estar expandido por defecto   |
| isCollapsed    | boolean        | false       | Si está en modo colapsado                      |
| className      | string         | -           | Clases adicionales                             |

### Ejemplo

```tsx
import { LayoutDashboard, Users } from 'lucide-react';
import { NavGroup, NavItem } from '@/components/navigation';

<NavGroup title="Administración" icon={LayoutDashboard}>
  <NavItem to="/users" icon={Users} label="Usuarios" />
  {/* Más NavItems */}
</NavGroup>
```

## NavContainer

Contenedor principal para la navegación.

### Props

| Nombre    | Tipo           | Por defecto | Descripción                                    |
|-----------|----------------|-------------|------------------------------------------------|
| children  | ReactNode      | Requerido   | Contenido principal                            |
| className | string         | -           | Clases adicionales                             |
| footer    | ReactNode      | -           | Contenido para el pie                          |
| header    | ReactNode      | -           | Contenido para la cabecera                     |

### Ejemplo

```tsx
import { NavContainer } from '@/components/navigation';

<NavContainer 
  header={<LogoContainer />}
  footer={<UserSection />}
>
  {/* NavGroups y NavItems */}
</NavContainer>
```

## LogoContainer

Componente para mostrar el logo y título de la aplicación.

### Props

| Nombre      | Tipo           | Por defecto        | Descripción                               |
|-------------|----------------|--------------------|-------------------------------------------|
| logoElement | ReactNode      | -                  | Elemento de logo personalizado            |
| homePath    | string         | "/"                | Ruta al hacer clic en el logo             |
| title       | string         | "Nexo"             | Título principal                          |
| subtitle    | string         | "ecosistema creativo" | Subtítulo                             |
| className   | string         | -                  | Clases adicionales                        |

### Ejemplo

```tsx
import { LogoContainer } from '@/components/navigation';

<LogoContainer 
  title="Mi Aplicación" 
  subtitle="Versión 1.0" 
/>
```

## NavDivider

Divisor visual para separar grupos de navegación.

### Props

| Nombre    | Tipo           | Por defecto | Descripción                               |
|-----------|----------------|-------------|-------------------------------------------|
| className | string         | -           | Clases adicionales                        |
| label     | string         | -           | Texto opcional para el divisor            |

### Ejemplo

```tsx
import { NavDivider } from '@/components/navigation';

<NavDivider label="Enlaces importantes" />
```

## Uso Recomendado

Estos componentes están diseñados para trabajar juntos, pero también pueden usarse de forma individual. El patrón recomendado es:

```tsx
<NavContainer
  header={<LogoContainer />}
  footer={<UserSection />}
>
  <NavItem to="/home" icon={Home} label="Inicio" />
  
  <NavDivider />
  
  <NavGroup title="Administración" icon={Shield}>
    <NavItem to="/admin/users" icon={Users} label="Usuarios" />
    <NavItem to="/admin/settings" icon={Settings} label="Configuración" />
  </NavGroup>
  
  <NavGroup title="Contenido" icon={FileText}>
    <NavItem to="/content/articles" icon={BookOpen} label="Artículos" />
    <NavItem to="/content/media" icon={Image} label="Multimedia" />
  </NavGroup>
</NavContainer>
```

Los componentes se adaptan automáticamente a la vista colapsada o expandida según el estado de `useSidebar()`.
