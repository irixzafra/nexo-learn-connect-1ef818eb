
# Estándares de Codificación - Nexo Learning Platform

## Principios Generales

Los principios fundamentales que guían nuestro desarrollo:

1. **Legibilidad**: El código debe ser fácil de leer y entender.
2. **Mantenibilidad**: El código debe ser fácil de modificar y extender.
3. **Escalabilidad**: La arquitectura debe soportar el crecimiento continuo.
4. **Seguridad**: Seguridad por diseño en todos los componentes.
5. **Rendimiento**: Optimización adecuada sin sacrificar legibilidad.

## Estructura del Proyecto

La organización del proyecto sigue un patrón de arquitectura basada en características:

```
project-root/
├── docs/                  # Documentación técnica
├── public/                # Archivos estáticos públicos
├── src/
│   ├── components/        # Componentes compartidos
│   │   ├── ui/            # Componentes base de interfaz
│   │   └── shared/        # Componentes reutilizables
│   ├── contexts/          # Contextos de React
│   ├── features/          # Módulos organizados por dominio
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── services/
│   │   ├── courses/
│   │   └── admin/
│   ├── hooks/             # Hooks personalizados
│   ├── layouts/           # Plantillas de diseño
│   ├── lib/               # Utilidades y configuraciones
│   ├── pages/             # Componentes de página
│   ├── routes/            # Configuración de rutas
│   ├── types/             # Definiciones de tipos
│   ├── App.tsx            # Componente raíz
│   └── main.tsx           # Punto de entrada
├── .eslintrc.js           # Configuración de ESLint
├── .prettierrc            # Configuración de Prettier
├── package.json           # Dependencias
├── tailwind.config.js     # Configuración de Tailwind
├── tsconfig.json          # Configuración de TypeScript
└── vite.config.ts         # Configuración de Vite
```

## Convenciones de Nomenclatura

### Archivos y Directorios

- **Componentes React**: `PascalCase.tsx`
- **Hooks**: `useNombreHook.ts`
- **Contextos**: `NombreContext.tsx`
- **Utilidades**: `nombreUtil.ts`
- **Tipos**: `nombre.types.ts`
- **Archivos de Test**: `Nombre.test.tsx`

### Componentes

- **Componentes**: Usar PascalCase
  ```tsx
  // UserProfile.tsx
  const UserProfile: React.FC<UserProfileProps> = () => {
    return <div>...</div>;
  };
  ```

- **Hooks Personalizados**: Usar camelCase con prefijo "use"
  ```tsx
  // useAuth.ts
  export const useAuth = () => {
    // ...
    return { user, login, logout };
  };
  ```

- **Props**: Usar interfaces con sufijo "Props"
  ```tsx
  interface ButtonProps {
    variant: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
  }
  ```

### Variables y Funciones

- **Variables**: camelCase, nombres descriptivos
  ```ts
  const userProfile = { ... };
  ```

- **Constantes**: UPPER_SNAKE_CASE para constantes globales
  ```ts
  const API_BASE_URL = "https://api.example.com";
  ```

- **Funciones**: camelCase, verbos que describan la acción
  ```ts
  function getUserData() { ... }
  const updateUserProfile = () => { ... };
  ```

- **Tipos y Enums**: PascalCase
  ```ts
  type UserRole = 'admin' | 'instructor' | 'student';
  enum PaymentStatus { Pending, Completed, Failed }
  ```

## Estándares JavaScript/TypeScript

### TypeScript

- **Tipado estricto**: Usar el modo strict de TypeScript
- **No any**: Evitar el tipo `any` siempre que sea posible
- **Interfaces vs Types**: Preferir interfaces para objetos y types para uniones/alias
- **Type Guards**: Utilizar para narrowing de tipos
  ```ts
  function isAdmin(user: User): user is AdminUser {
    return user.role === 'admin';
  }
  ```

### React

- **Componentes Funcionales**: Usar componentes funcionales con hooks
- **Props Destructuring**: Destructurar props para claridad
  ```tsx
  const Button = ({ variant, size = 'md', children }: ButtonProps) => {
    // ...
  };
  ```

- **Memoización**: Usar React.memo, useMemo y useCallback para optimizar renderizado
  ```tsx
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
  ```

- **Consultas y Mutaciones**: Usar React Query para operaciones de datos
  ```tsx
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId)
  });
  ```

### Gestión de Estado

- **Estado Local**: useState para estado simple de componente
- **Estado Complejo**: useReducer para lógica de estado compleja
- **Estado Global**:
  - Context API para estado compartido de UI
  - React Query para estado del servidor
  - Zustand/Jotai para casos específicos que requieran más

## Estilos y CSS

### Tailwind CSS

- **Utility-First**: Utilizar clases de utilidad de Tailwind
- **Componentes**: Extraer patrones comunes a componentes
- **Personalización**: Extender el tema en tailwind.config.js
- **Responsivo**: Diseñar mobile-first con modificadores de breakpoint

### Convenciones de clases

- **Naming**: Para clases personalizadas, usar kebab-case
- **BEM**: Si se necesitan clases personalizadas, seguir metodología BEM
  ```html
  <div class="card">
    <div class="card__header">
      <h2 class="card__title card__title--large">Título</h2>
    </div>
  </div>
  ```

## Buenas Prácticas

### Componentes

- **Componentes Pequeños**: Mantener componentes enfocados en una responsabilidad
- **Prop Drilling**: Evitar mediante Context API o composición
- **Composición**: Favorecer composición sobre herencia
  ```tsx
  // Preferir esto:
  <Card>
    <CardHeader>Título</CardHeader>
    <CardBody>Contenido</CardBody>
  </Card>
  
  // Sobre esto:
  <Card title="Título" content="Contenido" />
  ```

### Performance

- **Virtualización**: Usar virtualización para listas largas
- **Lazy Loading**: Cargar componentes y rutas bajo demanda
  ```tsx
  const LazyComponent = React.lazy(() => import('./HeavyComponent'));
  ```
- **useCallback/useMemo**: Usar para prevenir cálculos o renders innecesarios
- **Batch Updates**: Agrupar actualizaciones de estado relacionadas

### Seguridad

- **XSS**: Evitar `dangerouslySetInnerHTML` cuando sea posible
- **Inputs**: Validar siempre entradas de usuario
- **Dependencias**: Mantener dependencias actualizadas y verificar vulnerabilidades
- **API**: No exponer información sensible en el cliente

## Herramientas de Calidad de Código

### ESLint

Configuración base en `.eslintrc.js`:

```js
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // Reglas personalizadas
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

### Prettier

Configuración base en `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "avoid"
}
```

### Scripts de Calidad

```json
"scripts": {
  "lint": "eslint 'src/**/*.{ts,tsx}'",
  "lint:fix": "eslint 'src/**/*.{ts,tsx}' --fix",
  "format": "prettier --write 'src/**/*.{ts,tsx,css,json}'"
}
```

## Flujo de Trabajo Git

### Convenciones de Commits

Seguimos Conventional Commits para mensajes de commit:

```
<tipo>(<alcance>): <descripción>

[cuerpo opcional]

[footer opcional]
```

Tipos comunes:
- **feat**: Nueva característica
- **fix**: Corrección de bug
- **docs**: Cambios en documentación
- **style**: Cambios de formato (no afectan código)
- **refactor**: Refactorización de código existente
- **test**: Añadir o modificar tests
- **chore**: Tareas de mantenimiento

### Branching Strategy

Utilizamos una variante de GitFlow:

- **main**: Código en producción
- **develop**: Código en desarrollo
- **feature/nombre**: Nuevas características
- **fix/nombre**: Correcciones de bugs
- **release/x.y.z**: Preparación para lanzamiento
- **hotfix/nombre**: Fixes urgentes para producción

## Testing

### Estructura de Tests

```
src/
└── components/
    └── Button/
        ├── Button.tsx
        ├── Button.test.tsx
        └── Button.stories.tsx
```

### Buenas Prácticas de Testing

- Usar Testing Library para tests de componentes
- Enfocar tests en comportamiento, no implementación
- Simular comportamiento de usuario real
- Usar mocks para servicios externos
- Organizar tests con describe/it para mejor legibilidad

```tsx
describe('Button component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Documentación de Código

### JSDoc

Usamos JSDoc para documentar funciones, componentes y tipos:

```tsx
/**
 * Componente botón con diferentes variantes y tamaños.
 * 
 * @param {object} props - Propiedades del componente
 * @param {('primary'|'secondary'|'ghost')} [props.variant='primary'] - Variante visual del botón
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Tamaño del botón
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {() => void} [props.onClick] - Función de callback al hacer clic
 * 
 * @returns {React.ReactElement} Componente Button
 */
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick 
}: ButtonProps) => {
  // ...
};
```

### Storybook

Documentamos componentes con Storybook:

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'UI/Button',
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'ghost'],
      control: { type: 'radio' }
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
};
```

## Manejo de Errores

### Estrategia de Errores

1. **Prevención**: Validación proactiva (Zod, TypeScript)
2. **Captura**: Try/catch para operaciones propensas a errores
3. **Reporte**: Logging centralizado de errores
4. **Recuperación**: Fallbacks y estados de error amigables
5. **Monitoreo**: Integración con herramientas de observabilidad

### Error Boundaries

```tsx
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Algo salió mal:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Reintentar</button>
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <MyComponent />
    </ErrorBoundary>
  );
};
```

## Accesibilidad (A11y)

Seguimos estos principios:

1. **Semántica HTML**: Usar elementos HTML apropiados para su propósito
2. **ARIA**: Añadir atributos ARIA cuando sea necesario
3. **Teclado**: Asegurar navegabilidad completa por teclado
4. **Contraste**: Mantener ratio de contraste adecuado (WCAG AA mínimo)
5. **Focus**: Estilos de focus visibles y lógicos
6. **Texto Alt**: Proporcionar alternativas textuales para elementos visuales
7. **Testing**: Incluir pruebas de accesibilidad automatizadas
